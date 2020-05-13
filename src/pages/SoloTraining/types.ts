export type AddSnap = (
  time: number,
  accuracy: number,
  speed: number,
) => void;

export enum Tabs {
  TYPING,
  CHART,
}
