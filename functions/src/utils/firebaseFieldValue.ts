import { firestore } from 'firebase-admin';

/**
 * Increment firestore number-field
 * @param value number - The value to increment by
 */
export const firestoreIncrementValue = (value?: number) =>
  (firestore.FieldValue.increment(value || 1) as unknown) as number;
/**
 * Decrement firestore number-field
 * @param value number - The value to increment by
 */
export const firestoreDecrementValue = (value?: number) =>
  (firestore.FieldValue.increment(value || -1) as unknown) as number;

export const firestoreDocumentId = firestore.FieldPath.documentId();
