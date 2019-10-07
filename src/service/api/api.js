import axios from 'axios';
import authenStore from '@/store/modules/authenticate';
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

axiosInstance.interceptors.request.use(function(config) {
  const token = authenStore.state.token
  if(token) {
    config.headers.common['Authorization'] = `bearer ${token}`
  }
  return config;
})

export default axiosInstance;