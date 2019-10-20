import api from './api';

export const getAll = (params) => {
  return api.get('/posts', {params})
}
export const createNew = (data) => {
  return api.post('/posts', data);
}