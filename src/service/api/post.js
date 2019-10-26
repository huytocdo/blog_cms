import api from './api';

export const getAll = (params) => {
  return api.get('/posts', {params})
}
export const createNew = (data) => {
  return api.post('/posts', data);
}
export const getPost = (id) => {
  return api.get(`/posts/${id}`)
}
export const editPost = (id, data) => {
  return api.patch(`/posts/${id}`, data)
}
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`)
}