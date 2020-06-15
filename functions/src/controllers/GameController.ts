import { firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import { fireFunction } from '../decorators/fireFunctions';
import { useAuth, useBearerAuth } from '../middlewares/useAuth';
import { useRequiredFields } from '../middlewares/useRequiredFields';
import { use } from '../decorators/use';
import { RoomDocument } from '../data';
import { callFunctionByCloudTask } from '../utils/cloudTask.utils';

interface StartGameProps {
  roomId: string;
}

interface StartGameCountingProps {
  uid: string;
  roomId: string;
  tickToStart: number;
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
    } = gameSnap.data() as RoomDocument;
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

    const start = Date.now() / 1000 + 10;
    const end = Date.now() / 1000 + 70;

    await gameRef.update({
      startTimestamp: start,
      endTimestamp: end,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu diam, mollis eu lectus et, dignissim egestas odio.',
      cursorsStamps: [10, 22, 34],
    });

    callFunctionByCloudTask({
      functionName: 'stopGame',
      payload: { uid },
      time: end,
      headers: {
        Authorization: context.rawRequest.headers.authorization,
      },
    });

    return {
      ok: true,
    };
  }
  @use(useBearerAuth)
  @fireFunction({ region: 'europe-west1', type: 'onRequest' })
  async stopGame(data: StartGameProps, context) {
    console.log('Zatrzymuje !!!!!!!!!');
    return {
      ok: true,
    };
  }
}
