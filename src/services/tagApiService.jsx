/**
 * @file tagApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a etiquetas (tags).
 * Permite consultar, crear, actualizar y eliminar etiquetas, así como obtener tipos de etiquetas disponibles.
 *
 * @module tagApiService
 */

import axiosInstance from './axiosInstance';


/**
 * Obtiene todas las etiquetas disponibles.
 *
 * @async
 * @function getAllTags
 * @returns {Promise<Array<Object>>} Lista de etiquetas con sus detalles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllTags = async () => {
  const response = await axiosInstance.get('/tag/all');
  return response.data;
};


/**
 * Obtiene los tipos de etiquetas disponibles.
 *
 * @async
 * @function getTagsTypes
 * @returns {Promise<Array<string>>} Lista de tipos de etiquetas.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getTagsTypes = async () => {
  const response = await axiosInstance.get('/tag/types');
  return response.data;
};


/**
 * Obtiene una etiqueta específica por su ID.
 *
 * @async
 * @function getTagById
 * @param {number|string} id - ID de la etiqueta.
 * @returns {Promise<Object>} Detalles de la etiqueta.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getTagById = async (id) => {
  const response = await axiosInstance.get(`/tag/${id}`);
  return response.data;
};


/**
 * Elimina una etiqueta por su ID.
 *
 * @async
 * @function deleteTagById
 * @param {number|string} tagId - ID de la etiqueta a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteTagById = async (tagId) => {
  const response = await axiosInstance.delete(`/tag/${tagId}`);
  return response.data;
};


/**
 * Crea una nueva etiqueta.
 *
 * @async
 * @function createTag
 * @param {Object} tagData - Datos de la etiqueta a crear.
 * @returns {Promise<Object>} Etiqueta creada con su ID y detalles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createTag = async (tagData) => {
  const response = await axiosInstance.post('/tag', tagData);
  return response.data;
};


/**
 * Actualiza una etiqueta existente.
 *
 * @async
 * @function updateTag
 * @param {number|string} tagId - ID de la etiqueta a actualizar.
 * @param {Object} tagData - Datos de la etiqueta a actualizar.
 * @returns {Promise<Object>} Etiqueta actualizada.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateTag = async (tagId, tagData) => {
  const response = await axiosInstance.put(`/tag/${tagId}`, tagData);
  return response.data;
};
