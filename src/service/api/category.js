import api from './api';

export const getAll = (params) => {
  return api.get('/categories', {params})
}
export const createNew = (data) => {
  return api.post('/categories', data);
}
export const getCategory = (id) => {
  return api.get(`/categories/${id}`)
}
export const editCategory = (id, data) => {
  return api.patch(`/categories/${id}`, data)
}
export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`)
}