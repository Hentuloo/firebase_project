import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { bindFirebaseControllers } from './decorators/bindFirebaseControllers';
import { RoomsController } from './controllers/RoomsController';
// import { GameController } from './controllers/GameController';

admin.initializeApp(functions.config().firebase);
admin.firestore();

// bind firebase-functions controllers
const fireFunctions = bindFirebaseControllers([
  new RoomsController(),
  // new GameController(),
]);
const keys = Object.keys(fireFunctions);
keys.forEach((key: string) => {
  exports[key] = fireFunctions[key];
});
