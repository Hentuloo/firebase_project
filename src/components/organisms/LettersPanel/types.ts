export interface LetterObject {
  letter: string;
  blocked: boolean;
  id: number;
}
export interface LetterObjectWithActive extends LetterObject {
  active: boolean;
}

export type ToggleLetter = (e: any, id: number | string) => any;
