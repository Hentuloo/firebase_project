import { types } from './types';

interface StateType {
  isRequest: boolean;
  errorMessage: number;
  inputValue: string;
  closeModal: boolean;
}

export const reducer = (state: StateType, action: any): StateType => {
  switch (action.type) {
    case types.SET_INPUT_VALUE:
      return { ...state, inputValue: action.payload };
    case types.RESET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case types.START_REQUEST:
      return { ...state, isRequest: true, closeModal: false };
    case types.REQUEST_SUCCESSFUL:
      return {
        ...state,
        isRequest: false,
        closeModal: true,
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        isRequest: false,
        closeModal: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};