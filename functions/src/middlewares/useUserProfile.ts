import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';

export const useUserProfile = async (
  data: any,
  context: https.CallableContext,
) => {
  const { uid } = context.auth;
  if (!uid) {
    throw new https.HttpsError(
      'unauthenticated',
      'not authenticated!',
    );
  }

  const userSnap = await firestore()
    .doc(`users/${uid}`)
    .get();
  const user = { uid, ...userSnap.data() };
  data.user = user;
};
