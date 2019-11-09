import api from './api';

export const login = (email, password) => {
  return api.post('/users/login', { email, password }, {
    validateStatus: function(status) {
      return status >=200 && status < 500;
    }
  })
}

export const logout = () => {
  return api.get('/users/logout');
}

export const getUserInfo = () => {
  return api.get('/users/me', {
    validateStatus: function(status) {
      return status >=200 && status < 500;
    }
  })
}