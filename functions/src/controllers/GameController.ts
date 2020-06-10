// import { firestore } from 'firebase-admin';
// import { fireFunction } from '../decorators/fireFunctions';
// import { fireMiddleware } from '../decorators/fireMiddleware';
// import { FunctionsIndex } from '../decorators/bindFirebaseControllers';
// import { useAuth } from '../middlewares/useAuth';
// import { useRequiredFields } from '../middlewares/useRequiredFields';

// interface userExitRoomData {
//   roomId: string;
// }

// export class GameController extends FunctionsIndex {
//   @fireMiddleware(useRequiredFields('roomId'))
//   @fireMiddleware(useAuth)
//   @fireFunction({ region: 'us-central1', type: 'onCall' })
//   async userExitRoom(data: userExitRoomData, context) {
//   }
// }
