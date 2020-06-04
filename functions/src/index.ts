import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { bindFirebaseControllers } from './decorators/bindFirebaseControllers';
import { RoomsController } from './controllers/RoomsController';

admin.initializeApp(functions.config().firebase);
admin.firestore();

// bind firebase-functions controllers
bindFirebaseControllers([new RoomsController()]).create(exports);
