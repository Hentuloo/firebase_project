import { types } from './types';

export const reducer = (state, action) => {
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
