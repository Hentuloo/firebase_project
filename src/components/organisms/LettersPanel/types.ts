export interface LetterObject {
  letter: string;
  id: number;
}
export interface LetterWithStatusFlags extends LetterObject {
  active: boolean;
  blocked: boolean;
}

export type ToggleLetter = (e: any, id: number | string) => any;
