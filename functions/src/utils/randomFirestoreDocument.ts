import { firestore } from 'firebase-admin';
import { firestoreDocumentId } from './firebaseFieldValue';
import { TextForMesurementDoc } from '../types/TextForMesasurmentsDocument';

/**
 * The promise return random document from firestore-collection
 * @param collection simply path to a collection
 *
 */
export const randomFirestoreDocument = async (collection: string) => {
  const ref = firestore().collection(collection);
  const key = ref.doc().id;
  let data: null | TextForMesurementDoc = null;

  const snap = await ref
    .where(firestoreDocumentId, '>=', key)
    .limit(1)
    .get();
  if (snap.size > 0) {
    snap.forEach(doc => {
      data = doc.data() as TextForMesurementDoc;
    });
  } else {
    const secondSnap = await ref
      .where(firestoreDocumentId, '<', key)
      .limit(1)
      .get();
    secondSnap.forEach(doc => {
      data = doc.data() as TextForMesurementDoc;
    });
  }
  return data;
};
