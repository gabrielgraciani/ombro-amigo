import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
} from './actionsTypes';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  pending: boolean;
  todos: Todo[];
  error: string | null;
}

interface FetchTodoSuccessPayload {
  todos: Todo[];
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
  Todo,
  TodoState,
  FetchTodoSuccessPayload,
  FetchTodoFailurePayload,
  FetchTodoRequest,
  FetchTodoSuccess,
  FetchTodoFailure,
  TodoActions,
};
