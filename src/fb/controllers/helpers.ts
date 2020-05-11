export const docWithId = (snap: any) => ({
  uid: snap.uid,
  ...snap.data(),
});
export const collectionsWithId = (snap: any) =>
  snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
