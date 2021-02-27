import axios, { AxiosResponse } from 'axios';

import { ITodo } from '../types/todoTypes';

const getTodos = (): Promise<AxiosResponse<ITodo[]>> =>
  axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');

export { getTodos };
