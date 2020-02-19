export const docWithId = snap => ({ uid: snap.uid, ...snap.data() });
export const collectionWithId = snap =>
  snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
