import axios from 'axios';
import { clearData } from '../utils/localStorageUtilities';

const apiURL = "/api";
const localURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: apiURL, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Cayó al promise.reject: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.warn("Token expirado o inválido, cerrando sesión...");
        clearData();
        /*localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('temporaryProjectClient');
        localStorage.removeItem('temporaryProjectEvent');
        localStorage.removeItem('projectDraft');
        localStorage.removeItem('projectDraftUpdate');*/
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
