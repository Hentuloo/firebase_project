import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import { RoomsController } from './controllers/RoomsController';

import { bindFireControllers } from './decorators/bindFireControllers';
import { StatusController } from './controllers/StatusController';
import { GameController } from './controllers/GameController';

initializeApp(functions.config().firebase);

// bind firebase-functions controllers
const fireFunctions = bindFireControllers([
  new RoomsController(),
  new StatusController(),
  new GameController(),
]);

const keys = Object.keys(fireFunctions);
keys.forEach((key: string) => {
  exports[key] = fireFunctions[key];
});
