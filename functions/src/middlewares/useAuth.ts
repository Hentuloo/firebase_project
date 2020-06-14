import { https, config } from 'firebase-functions';
import { auth } from 'firebase-admin';

export const useAuth = (
  data: any,
  context: https.CallableContext,
) => {
  if (!context) {
    throw new Error('Pass context field');
  }
  if (!context.auth) {
    throw new https.HttpsError(
      'unauthenticated',
      'not authenticated!',
    );
  }
};
export interface UseBearerAuthConfig {
  allowInternallKey?: boolean;
}
export const useBearerAuth = methodConfig => async (req, res) => {
  const { allowInternallKey } = methodConfig;
  const requestedUid = req.body.uid;
  if (!requestedUid) {
    throw new https.HttpsError(
      'unauthenticated',
      'uid field is required',
    );
  }
  //allow acces when it is internall call
  if (
    allowInternallKey &&
    req.headers.internallcall === config().internallcall.key
  ) {
    return requestedUid;
  }
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    throw new https.HttpsError(
      'unauthenticated',
      'not authenticated!',
    );
  }

  const tokenId = req.get('Authorization').split('Bearer ')[1];

  const { uid } = await auth().verifyIdToken(tokenId);
  if (uid !== requestedUid)
    throw new https.HttpsError(
      'unauthenticated',
      'not authenticated!',
    );
};
