import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
} from '../actionTypes/todoActionType';

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  pending: boolean;
  todos: ITodo[];
  error: string | null;
}

interface FetchTodoSuccessPayload {
  todos: ITodo[];
}

interface FetchTodoFailurePayload {
  error: string;
}

interface FetchTodoRequest {
  type: typeof FETCH_TODO_REQUEST;
}

type FetchTodoSuccess = {
  type: typeof FETCH_TODO_SUCCESS;
  payload: FetchTodoSuccessPayload;
};

type FetchTodoFailure = {
  type: typeof FETCH_TODO_FAILURE;
  payload: FetchTodoFailurePayload;
};

type TodoActions = FetchTodoRequest | FetchTodoSuccess | FetchTodoFailure;

export type {
  ITodo,
  TodoState,
  FetchTodoSuccessPayload,
  FetchTodoFailurePayload,
  FetchTodoRequest,
  FetchTodoSuccess,
  FetchTodoFailure,
  TodoActions,
};
