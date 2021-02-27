import {
  FetchTodoRequest,
  FetchTodoSuccess,
  FetchTodoSuccessPayload,
  FetchTodoFailure,
  FetchTodoFailurePayload,
} from './types';

import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
} from './actionsTypes';

const fetchTodoRequest = (): FetchTodoRequest => ({
  type: FETCH_TODO_REQUEST,
});

const fetchTodoSuccess = (
  payload: FetchTodoSuccessPayload,
): FetchTodoSuccess => ({
  type: FETCH_TODO_SUCCESS,
  payload,
});

const fetchTodoFailure = (
  payload: FetchTodoFailurePayload,
): FetchTodoFailure => ({
  type: FETCH_TODO_FAILURE,
  payload,
});

export { fetchTodoRequest, fetchTodoSuccess, fetchTodoFailure };
