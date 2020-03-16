const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { requiredField, requiredAuth } = require('../utils');
const { getUserProfile, deleteRoomWhenEmpty } = require('../fbUtils');

const { arrayUnion } = admin.firestore.FieldValue;

const joinToOpenRoom = async (data, context) => {
  requiredField(data, 'roomId');
  requiredAuth(context);

  const { uid } = context.auth;
  const { roomId } = data;

  try {
    const resp = await getUserProfile(uid);
    const { displayName, photoURL } = resp;
    await admin
      .firestore()
      .doc(`rooms/${roomId}`)
      .update({
        users: arrayUnion({
          uid,
          displayName,
          photoURL: photoURL || null,
        }),
      });
    return { ok: true };
  } catch ({ code, message, details, name }) {
    throw new functions.https.HttpsError('unknown', code, {
      message,
      details,
      name,
    });
  }
};

const leaveFromOpenRoom = async (data, context) => {
  requiredField(data, 'roomId');
  requiredAuth(context);

  const { uid } = context.auth;
  const { roomId } = data;

  try {
    const roomSnap = await admin
      .firestore()
      .doc(`rooms/${roomId}`)
      .get();
    const { users } = roomSnap.data();

    if (users.length === 1) {
      setTimeout(() => deleteRoomWhenEmpty(roomId), 60000);
    }

    await admin
      .firestore()
      .doc(`rooms/${roomId}`)
      .update({
        users: users.filter(user => user.uid !== uid),
      });

    return { ok: true };
  } catch ({ code, message, details, name }) {
    throw new functions.https.HttpsError('unknown', code, {
      message,
      details,
      name,
    });
  }
};

module.exports = { joinToOpenRoom, leaveFromOpenRoom };
