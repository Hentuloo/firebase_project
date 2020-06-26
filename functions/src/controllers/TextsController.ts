import { listenDatabase } from '../decorators/listenDatabase';
import { TextForMesurementDoc } from '../data';
import { getTextPropertiesForMeasurment } from '../utils/utils';
import { firestore } from 'firebase-admin';

export class TextsController {
  @listenDatabase({
    dbType: 'firestore',
    listenerType: 'onCreate',
    ref: '/textsForMeasurements/{textId}',
  })
  async onTextCreated(snap, context) {
    const { textId } = context.params;
    const textRef = firestore().doc(
      `/textsForMeasurements/${textId}`,
    );
    const {
      text,
      cursorPoints: cursors,
    } = snap.data() as TextForMesurementDoc;
    if (cursors) return { ok: true };

    const {
      cursorPoints,
      writtenWordsByInterval,
    } = getTextPropertiesForMeasurment(text);

    const wordsLength =
      writtenWordsByInterval[writtenWordsByInterval.length - 1];

    const timeForWrite = Math.ceil((wordsLength / 15) * 60);

    textRef.set(
      {
        cursorPoints,
        writtenWordsByInterval,
        timeForWrite,
      },
      { merge: true },
    );
    return { ok: true };
  }
}
