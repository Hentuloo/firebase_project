const functions = require('firebase-functions');
const admin = require('firebase-admin');

const handlers = require('./src/index.js');

admin.initializeApp(functions.config().firebase);
admin.firestore();

Object.keys(handlers).map(
  keyName => (exports[keyName] = handlers[keyName]),
);
