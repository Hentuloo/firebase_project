export enum types {
  TOGGLE_LETTER,
}

export type StateType = any[];

export default (state: StateType, action: any): StateType => {
  if (action.type === types.TOGGLE_LETTER) {
    const index = action.payload;

    return [...state].map(letter =>
      letter.id === index
        ? { ...letter, active: !letter.active }
        : letter,
    );
  }
  return state;
};
