import {
  all,
  AllEffect,
  ForkEffect,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { fetchTodoFailure, fetchTodoSuccess } from './actions';

import { FETCH_TODO_REQUEST } from './actionsTypes';

import { getTodos } from './services';

import callWrapperSaga from '../config/callWrapperSaga';

function* fetchTodoSaga() {
  const response = yield callWrapperSaga(getTodos);

  if (response.data) {
    yield put(
      fetchTodoSuccess({
        todos: response.data,
      }),
    );
  } else {
    yield put(
      fetchTodoFailure({
        error: response.error.message,
      }),
    );
  }
}

function* todoSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(FETCH_TODO_REQUEST, fetchTodoSaga)]);
}

export default todoSaga;
