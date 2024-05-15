import axios from 'axios';
import {Platform} from 'react-native';
const axiosInstance = axios.create();
const baseURL =
  Platform.OS === 'ios' ? 'http://localhost:3000/' : 'http://192.168.1.7:3000/';
axiosInstance.interceptors.request.use(
  async config => {
    config.baseURL = baseURL;
    return config;
  },
  error => {
    console.log('axiosInstance error', error);
    return Promise.reject(error);
  },
);
export default axiosInstance;
