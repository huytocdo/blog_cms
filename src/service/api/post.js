import api from './api';

export const getAll = (params) => {
  return api.get('/posts', {params})
}