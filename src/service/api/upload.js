import api from './api';

export const uploadImage = (file, name) => {
  var formData = new FormData();
  formData.append("photo", file);
  formData.append("name", name);
  return api.post('/resources/image', formData)
}