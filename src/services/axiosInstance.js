/**
 * @file axiosInstance.js
 * @description Configuración central de Axios para realizar solicitudes HTTP a la API.
 * Se encarga de:
 * - Establecer la URL base para todas las solicitudes.
 * - Configurar headers por defecto.
 * - Incluir un token de autenticación si existe en localStorage.
 * - Manejar interceptores para requests y responses.
 * - Gestionar expiración de token y redirección al login automáticamente.
 *
 * @module axiosInstance
 */

import axios from 'axios';
import { clearData } from '../utils/localStorageUtilities';


/**
 * URL base de la API, usado en producción.
 * @constant
 * @type {string}
 */
const apiURL = "/api";


/**
 * URL local utilizada en desarrollo.
 * @constant
 * @type {string}
 */
const localURL = "http://localhost:8080";


/**
 * Instancia de Axios configurada.
 * @type {import('axios').AxiosInstance}
 */
const axiosInstance = axios.create({
  baseURL: apiURL, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});


/**
 * Interceptor para requests.
 * Agrega automáticamente el token de autenticación si existe.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/**
 * Interceptor para responses.
 * Maneja errores de autenticación (401, 403), limpia los datos locales y redirige al login.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.warn("Token expirado o inválido, cerrando sesión...");
        clearData();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
