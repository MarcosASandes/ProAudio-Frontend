/**
 * @file authApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a la autenticación de usuarios.
 * Incluye funciones para login, recuperación de contraseña, cambio de contraseña
 * y manejo del logout en frontend.
 *
 * @module authApiService
 */

import axiosInstance from './axiosInstance';


/**
 * Inicia sesión en la aplicación enviando las credenciales del usuario.
 *
 * @async
 * @function login
 * @param {Object} data - Datos de autenticación del usuario.
 * @param {string} data.email - Correo electrónico del usuario.
 * @param {string} data.password - Contraseña del usuario.
 * @returns {Promise<Object>} Respuesta con el token de acceso y/o información del usuario.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const login = async (data) => {
  const response = await axiosInstance.post('/user/login', data);
  return response.data;
};


/**
 * Solicita un enlace para restablecer la contraseña enviando el email del usuario.
 *
 * @async
 * @function forgotPassword
 * @param {string} email - Correo electrónico del usuario registrado.
 * @returns {Promise<Object>} Respuesta del backend indicando si el email fue enviado exitosamente.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post(`/user/forgot/password?email=${encodeURIComponent(email)}`);
  return response;
};


/**
 * Cambia la contraseña de un usuario utilizando un token de recuperación.
 *
 * @async
 * @function changePasswordWithToken
 * @param {Object} data - Datos para restablecer la contraseña.
 * @param {string} data.token - Token de validación recibido en el correo electrónico.
 * @param {string} data.newPassword - Nueva contraseña del usuario.
 * @returns {Promise<Object>} Respuesta del backend sobre el cambio de contraseña.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const changePasswordWithToken = async (data) => {
  const response = await axiosInstance.post('/user/reset/password', data);
  return response;
};


/**
 * Cambia la contraseña de un usuario ya autenticado.
 *
 * @async
 * @function changePasswordLogged
 * @param {Object} data - Datos para el cambio de contraseña.
 * @param {string} data.currentPassword - Contraseña actual del usuario.
 * @param {string} data.newPassword - Nueva contraseña del usuario.
 * @returns {Promise<Object>} Respuesta del backend confirmando el cambio.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const changePasswordLogged = async (data) => {
  const response = await axiosInstance.post('/user/change/password', data);
  return response.data;
};


/**
 * Cierra la sesión del usuario en el frontend.
 *
 * @async
 * @function logout
 * @param {string} token - Token de autenticación del usuario (actualmente no utilizado).
 * @returns {Promise<Object>} Objeto indicando si el logout fue exitoso.
 * @description Actualmente no realiza una llamada al backend, se maneja en el frontend.
 * En un futuro se puede reemplazar para invalidar el token en el servidor.
 */
export const logout = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};