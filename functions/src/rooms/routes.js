const functions = require('firebase-functions');

const controllers = require('./controllers');

const joinToOpenRoom = functions.https.onCall(
  controllers.joinToOpenRoom,
);
const leaveFromOpenRoom = functions.https.onCall(
  controllers.leaveFromOpenRoom,
);

module.exports = { joinToOpenRoom, leaveFromOpenRoom };
