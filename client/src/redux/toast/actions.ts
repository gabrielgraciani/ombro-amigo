import {
  AddToast,
  AddToastSuccess,
  RemoveToast,
  RemoveToastSuccess,
  Toast,
} from './types';

import {
  ADD_TOAST,
  ADD_TOAST_SUCCESS,
  REMOVE_TOAST,
  REMOVE_TOAST_SUCCESS,
} from './actionsTypes';

const addToast = (payload: Toast): AddToast => ({
  type: ADD_TOAST,
  payload,
});

const addToastSuccess = (payload: Toast): AddToastSuccess => ({
  type: ADD_TOAST_SUCCESS,
  payload,
});

const removeToast = (payload: string): RemoveToast => ({
  type: REMOVE_TOAST,
  payload,
});

const removeToastSuccess = (payload: string): RemoveToastSuccess => ({
  type: REMOVE_TOAST_SUCCESS,
  payload,
});

export { addToast, addToastSuccess, removeToast, removeToastSuccess };
