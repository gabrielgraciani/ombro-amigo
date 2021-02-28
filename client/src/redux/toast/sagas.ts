import {
  all,
  AllEffect,
  ForkEffect,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { v4 as uuid } from 'uuid';

import {
  addToast,
  addToastSuccess,
  removeToast,
  removeToastSuccess,
} from './actions';

import { ADD_TOAST, REMOVE_TOAST } from './actionsTypes';

function* addToastSaga({ payload }: ReturnType<typeof addToast>) {
  const { type, title, description } = payload;

  const id = uuid();
  const toast = {
    id,
    type,
    title,
    description,
  };

  yield put(addToastSuccess(toast));
}

function* removeToastSaga({ payload }: ReturnType<typeof removeToast>) {
  yield put(removeToastSuccess(payload));
}

function* toastSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([
    takeLatest(ADD_TOAST, addToastSaga),
    takeLatest(REMOVE_TOAST, removeToastSaga),
  ]);
}

export default toastSaga;
