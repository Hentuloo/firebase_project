import { firestore } from 'firebase-admin';
import { https, Response } from 'firebase-functions';
import { fireFunction } from '../decorators/fireFunctions';
import { useAuth, useBearerAuth } from '../middlewares/useAuth';
import { useRequiredFields } from '../middlewares/useRequiredFields';
import { use } from '../decorators/use';
import {
  GameScoresDoc,
  UpdateGameScoresDoc,
  UpdateGameSettingsDoc,
  GameSettingsDoc,
  UpdateGameScore,
  ScoreWithUid,
} from '../data';
import {
  callFunctionByCloudTask,
  deleteCloudTask,
} from '../utils/cloudTask.utils';
import { sortUsersScores } from '../utils/utils';

interface StartGameProps {
  roomId: string;
}

interface StopGameBody {
  roomId: string;
}
interface CallPointReachedProps {
  roomId: string;
  accuracy: number;
}
export class GameController {
  @use(useRequiredFields('roomId'))
  @use(useAuth)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
  async startGame(
    data: StartGameProps,
    context: https.CallableContext,
  ) {
    const { uid } = context.auth;
    const { roomId } = data;
    const gameRef = firestore().doc(`games/${roomId}`);
    const gameScoresRef = firestore().doc(`gamesScores/${roomId}`);

    const gameSnap = await gameRef.get();
    if (!gameSnap.exists)
      throw new https.HttpsError(
        'unavailable',
        "this room does'n exist",
      );
    const {
      creator,
      startTimestamp,
      registeredUsers,
    } = gameSnap.data() as GameSettingsDoc;
    if (startTimestamp)
      throw new https.HttpsError(
        'unavailable',
        'game already is runned',
      );
    if (Object.keys(registeredUsers).length < 2)
      throw new https.HttpsError(
        'unavailable',
        'Minimum two players can start game',
      );
    if (creator !== uid)
      throw new https.HttpsError('unavailable', 'permision denied');

    // text and cursors get from db
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu diam, mollis eu lectus et, dignissim egestas odio.';

    const cursorPoints = [20, 40, 60, 80, 100, 118];
    const writtenWordsByCursorsPoints = [6, 10, 14, 20, 25, 33];
    const start = Date.now() / 1000 + 15;
    const end = Date.now() / 1000 + 55;

    const [cloudFunction] = await callFunctionByCloudTask({
      functionName: 'stopGame',
      payload: { roomId },
      time: end,
      headers: {
        Authorization: context.rawRequest.headers.authorization,
      },
    });

    gameRef.update({
      startTimestamp: start,
      endTimestamp: end,
      text,
      cursorPoints,
    } as UpdateGameSettingsDoc);
    gameScoresRef.update({
      stopGameFunction: cloudFunction.name,
      startTimestamp: start,
      cursorPoints,
      writtenWordsByCursorsPoints,
    } as UpdateGameScoresDoc);

    return {
      ok: true,
    };
  }
  @use(useRequiredFields('roomId', 'accuracy'))
  @use(useAuth)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
  async callGamePointReached(
    data: CallPointReachedProps,
    context: https.CallableContext,
  ) {
    const { uid } = context.auth;
    const { roomId, accuracy } = data;

    const gameScoresRef = firestore().doc(`gamesScores/${roomId}`);
    const gameRef = firestore().doc(`games/${roomId}`);

    const scoreSnap = await gameScoresRef.get();
    if (!scoreSnap.exists)
      throw new https.HttpsError(
        'unavailable',
        "this room does'n exist",
      );
    const score = scoreSnap.data() as GameScoresDoc;
    const {
      cursorPoints,
      startTimestamp,
      writtenWordsByCursorsPoints,
      stopGameFunction,
      scores: { [uid]: userScores },
    } = score;
    if (!userScores)
      throw new https.HttpsError(
        'unavailable',
        "You don't have permisions to this room",
      );
    if (startTimestamp > Date.now())
      throw new https.HttpsError(
        'unavailable',
        'the game is not yet available',
      );

    const activeCursorPoint = cursorPoints[userScores.changes];
    const writtenWords =
      writtenWordsByCursorsPoints[userScores.changes];
    const wpmSpeed = Number(
      (
        writtenWords /
        ((Date.now() / 1000 - startTimestamp) / 60)
      ).toFixed(2),
    );
    if (userScores.lastChangesDate && wpmSpeed > 500)
      throw new https.HttpsError('unavailable', 'too fast!!');
    if (accuracy < 75)
      throw new https.HttpsError('unavailable', 'Bad accuracy!');

    const progress =
      ((userScores.changes + 1) / cursorPoints.length) * 100;
    const points = Number(
      (progress + (accuracy - 85) * 1.5).toFixed(2),
    );

    const userNewScore = {
      changes: userScores.changes + 1,
      cursor: activeCursorPoint,
      lastChangesDate: Date.now(),
      wpmSpeed,
      accuracy,
      points,
      progress,
    } as UpdateGameScore;

    await gameScoresRef.update({ [`scores.${uid}`]: userNewScore });

    if (progress === 100) {
      deleteCloudTask({ taskName: stopGameFunction });
      const usersByScores = sortUsersScores(score);
      gameRef.update({ usersByScores } as UpdateGameSettingsDoc);
    }

    return {
      ...score,
      scores: {
        ...score.scores,
        [uid]: userNewScore,
      },
    };
  }

  @use(useBearerAuth)
  @fireFunction({ region: 'europe-west1', type: 'onRequest' })
  async stopGame(req, res: Response) {
    const { roomId } = req.body as StopGameBody;
    const gameScoresRef = firestore().doc(`gamesScores/${roomId}`);
    const gameRef = firestore().doc(`games/${roomId}`);

    const scoreSnap = await gameScoresRef.get();
    const scores = scoreSnap.data() as GameScoresDoc;
    const usersByScores = sortUsersScores(scores);

    gameRef.update({ usersByScores } as UpdateGameSettingsDoc);

    res.send({ ok: true });
  }
}
