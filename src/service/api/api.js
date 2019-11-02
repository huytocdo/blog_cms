import axios from 'axios';
import authenStore from '@/store/modules/authenticate';
const axiosInstance = axios.create({
  baseURL: '/api/v1'
});

axiosInstance.interceptors.request.use(function(config) {
  const token = authenStore.state.token
  if(token) {
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config;
})

export default axiosInstance;