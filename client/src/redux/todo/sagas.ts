import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { fetchTodoFailure, fetchTodoSuccess } from './actions';

import { FETCH_TODO_REQUEST } from './actionsTypes';

import { getTodos } from './services';

function* fetchTodoSaga() {
  try {
    const response = yield call(getTodos);
    yield put(
      fetchTodoSuccess({
        todos: response.data,
      }),
    );
  } catch (e) {
    yield put(
      fetchTodoFailure({
        error: e.message,
      }),
    );
  }
}

function* todoSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(FETCH_TODO_REQUEST, fetchTodoSaga)]);
}

export default todoSaga;
