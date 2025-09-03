/**
 * @file parametersApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a parámetros del sistema.
 * Permite consultar, crear, actualizar y eliminar parámetros, así como obtener un parámetro específico por su ID.
 *
 * @module parametersApiService
 */

import axiosInstance from './axiosInstance';


/**
 * Obtiene todos los parámetros disponibles.
 *
 * @async
 * @function getAllParameters
 * @returns {Promise<Array<Object>>} Lista de parámetros con sus detalles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllParameters = async () => {
  const response = await axiosInstance.get('/parameters/all');
  return response.data;
};


/**
 * Crea un nuevo parámetro.
 *
 * @async
 * @function createParameter
 * @param {Object} data - Datos del parámetro a crear.
 * @returns {Promise<Object>} Parámetro creado con su ID y detalles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createParameter = async (data) => {
  const response = await axiosInstance.post('/parameters', data);
  return response.data;
};


/**
 * Actualiza un parámetro existente.
 *
 * @async
 * @function updateParameter
 * @param {number|string} id - ID del parámetro a actualizar.
 * @param {Object} data - Datos del parámetro a actualizar.
 * @returns {Promise<Object>} Parámetro actualizado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateParameter = async (id, data) => {
  const response = await axiosInstance.put(`/parameters/${id}`, data);
  return response.data;
};


/**
 * Elimina un parámetro por su ID.
 *
 * @async
 * @function deleteParameter
 * @param {number|string} id - ID del parámetro a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteParameter = async (id) => {
  const response = await axiosInstance.delete(`/parameters/${id}`);
  return response.data;
};


/**
 * Obtiene un parámetro específico por su ID.
 *
 * @async
 * @function getParameterById
 * @param {number|string} id - ID del parámetro a consultar.
 * @returns {Promise<Object>} Detalles del parámetro.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getParameterById = async (id) => {
  const response = await axiosInstance.get(`/parameters/${id}`);
  return response.data;
};