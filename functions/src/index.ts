import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import { RoomsController } from './controllers/RoomsController';

import { StatusController } from './controllers/StatusController';
import { GameController } from './controllers/GameController';
import { AuthController } from './controllers/AuthController';
import { TextsController } from './controllers/TextsController';
import { bindFireControllers } from 'firestore-decorators';

initializeApp(functions.config().firebase);

// bind firebase-functions controllers
const fireFunctions = bindFireControllers([
  new RoomsController(),
  new StatusController(),
  new GameController(),
  new AuthController(),
  new TextsController(),
]);

const keys = Object.keys(fireFunctions);
// export all binded Cloud Function
keys.forEach((key: string) => {
  exports[key] = fireFunctions[key];
});
