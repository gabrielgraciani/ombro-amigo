import {
  ADD_TOAST,
  ADD_TOAST_SUCCESS,
  REMOVE_TOAST,
  REMOVE_TOAST_SUCCESS,
} from './actionsTypes';

import { ToastAction, ToastState } from './types';

const initialState: ToastState = {
  list: [],
};

const errorReducer = (
  state = initialState,
  action: ToastAction,
): ToastState => {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
      };

    case ADD_TOAST_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case REMOVE_TOAST:
      return {
        ...state,
      };

    case REMOVE_TOAST_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
      };

    default:
      return {
        ...state,
      };
  }
};

export default errorReducer;
