const functions = require('firebase-functions');

const requiredAuth = context => {
  if (!context) {
    throw new Error('Pass context field');
  }
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'not authenticated!',
    );
  }
};

const requiredField = (data, ...fieldsNames) => {
  if (!data) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'not any data is passed',
    );
  }
  fieldsNames.forEach(field => {
    if (!data[field]) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'field is required',
        { fieldName: field },
      );
    }
  });
};

module.exports = { requiredAuth, requiredField };
