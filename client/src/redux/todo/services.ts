import axios, { AxiosResponse } from 'axios';

import { Todo } from './types';

const getTodos = (): Promise<AxiosResponse<Todo[]>> =>
  axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

export { getTodos };
