import { firestore } from 'firebase-admin';

export const firestoreIncrementValue = (value?: number) =>
  (firestore.FieldValue.increment(value || 1) as unknown) as number;
export const firestoreDecrementValue = (value?: number) =>
  (firestore.FieldValue.increment(value || -1) as unknown) as number;

export const firestoreDocumentId = firestore.FieldPath.documentId();
