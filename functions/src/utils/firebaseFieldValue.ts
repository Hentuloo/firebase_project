import { firestore } from 'firebase-admin';

export const firestoreIncrementValue = (firestore.FieldValue.increment(
  1,
) as unknown) as number;
export const firestoreDecrementValue = (firestore.FieldValue.increment(
  -1,
) as unknown) as number;
