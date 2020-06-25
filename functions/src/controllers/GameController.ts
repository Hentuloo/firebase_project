import { firestore } from 'firebase-admin';
import { https, Response } from 'firebase-functions';
import { fireFunction } from '../decorators/fireFunctions';
import { useAuth, useBearerAuth } from '../middlewares/useAuth';
import { useValidator } from '../middlewares/useValidator';
import { use } from '../decorators/use';
import {
  GameScoresDoc,
  UpdateGameScoresDoc,
  UpdateGameSettingsDoc,
  GameSettingsDoc,
  UpdateGameScore,
  UpdateUserDocument,
} from '../data';
import {
  callFunctionByCloudTask,
  deleteCloudTask,
} from '../utils/cloudTask.utils';
import { sortUsersScores } from '../utils/utils';
import { firestoreIncrementValue } from '../utils/firebaseFieldValue';

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
  @use(
    useValidator({
      roomId: 'required|alpha_num|min:10|max:35',
    }),
  )
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
      endTimestamp,
      registeredUsers,
    } = gameSnap.data() as GameSettingsDoc;

    const usersUids = Object.keys(registeredUsers);

    if (
      startTimestamp &&
      endTimestamp &&
      startTimestamp < Date.now() / 1000 &&
      endTimestamp > Date.now() / 1000
    )
      throw new https.HttpsError(
        'unavailable',
        'game already is runned',
      );
    if (usersUids.length < 2)
      throw new https.HttpsError(
        'unavailable',
        'Minimum two players can start game',
      );
    if (creator !== uid)
      throw new https.HttpsError('unavailable', 'permision denied');

    const usersScoresWithStartScore = usersUids.reduce((acc, uid) => {
      acc[uid] = {
        changes: 0,
        cursor: 0,
        lastChangesDate: 0,
        wpmSpeed: 0,
        accuracy: 0,
        points: 0,
        progress: 0,
      };
      return acc;
    }, {});
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
      usersByScores: null,
    } as UpdateGameSettingsDoc);
    gameScoresRef.set({
      scores: { ...usersScoresWithStartScore },
      stopGameFunction: cloudFunction.name,
      startTimestamp: start,
      cursorPoints,
      writtenWordsByCursorsPoints,
    } as UpdateGameScoresDoc);

    return {
      ok: true,
    };
  }
  @use(
    useValidator({
      roomId: 'required|alpha_num|min:10|max:35',
      accuracy: 'required|numeric|min:0|max:100',
    }),
  )
  @use(useAuth)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
  async callGamePointReached(
    data: CallPointReachedProps,
    context: https.CallableContext,
  ) {
    const { roomId, accuracy } = data;
    const { uid } = context.auth;

    const gameScoresRef = firestore().doc(`gamesScores/${roomId}`);
    const gameRef = firestore().doc(`games/${roomId}`);
    const usersRef = firestore().collection(`users`);

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
    if (!startTimestamp || startTimestamp > Date.now() / 1000)
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
    if (userScores.lastChangesDate !== undefined && wpmSpeed > 500)
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
      const winner = usersByScores[0];
      usersRef.doc(winner.uid).update({
        wins: firestoreIncrementValue(),
      } as UpdateUserDocument);
      gameRef.update({
        usersByScores,
        [`registeredUsers.${winner.uid}.wins`]: firestoreIncrementValue(),
      } as UpdateGameSettingsDoc);
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
    const usersRef = firestore().collection(`users`);

    const scoreSnap = await gameScoresRef.get();
    const scores = scoreSnap.data() as GameScoresDoc;
    const usersByScores = sortUsersScores(scores);

    const winner = usersByScores[0];
    if (winner) {
      usersRef.doc(winner.uid).update({
        wins: firestoreIncrementValue(),
      } as UpdateUserDocument);
    }

    gameRef.update({
      usersByScores,
      [`registeredUsers.${winner.uid}.wins`]: firestoreIncrementValue(),
    } as UpdateGameSettingsDoc);
    gameScoresRef.update({
      startTimestamp: null,
    } as UpdateGameSettingsDoc);

    res.send({ ok: true });
  }
}
