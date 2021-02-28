import {
  ADD_TOAST,
  ADD_TOAST_SUCCESS,
  REMOVE_TOAST,
  REMOVE_TOAST_SUCCESS,
} from './actionsTypes';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastState {
  list: Toast[];
}

interface AddToast {
  type: typeof ADD_TOAST;
  payload: Omit<Toast, 'id'>;
}

interface AddToastSuccess {
  type: typeof ADD_TOAST_SUCCESS;
  payload: Toast;
}

interface RemoveToast {
  type: typeof REMOVE_TOAST;
  payload: string;
}

interface RemoveToastSuccess {
  type: typeof REMOVE_TOAST_SUCCESS;
  payload: string;
}

type ToastAction =
  | AddToast
  | AddToastSuccess
  | RemoveToast
  | RemoveToastSuccess;

export type {
  Toast,
  AddToast,
  ToastState,
  ToastAction,
  AddToastSuccess,
  RemoveToast,
  RemoveToastSuccess,
};
