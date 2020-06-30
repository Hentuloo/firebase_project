/**
 * firestoreDocument, text asset for typing speed test measurement
 */
export interface TextForMesurementDoc {
  /**
   * usually it is long text for measurement
   */
  text: string;
  /**
   * controll points
   */
  cursorPoints: number[];
  /**
   * written words related to cursors points
   */
  writtenWordsByInterval: number[];
  timeForWrite: number;
}
export type UpdateTextForMesurementDoc = Partial<
  TextForMesurementDoc
>;
