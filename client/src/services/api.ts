import axios from 'axios';

// TODO change the baseURL when server will be ready to use
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
