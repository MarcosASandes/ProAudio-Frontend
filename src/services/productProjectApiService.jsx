/**
 * @file productProjectApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a la asociación de productos con proyectos.
 * Permite agregar productos a proyectos y eliminar productos de proyectos existentes.
 *
 * @module productProjectApiService
 */

import axiosInstance from './axiosInstance';


/**
 * Elimina un producto asociado a un proyecto por su ID.
 *
 * @async
 * @function deleteProductProject
 * @param {number|string} id - ID de la relación producto-proyecto a eliminar.
 * @returns {Promise<Object>} Confirmación de la eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteProductProject = async (id) => {
  const response = await axiosInstance.delete(`/product/project/${id}`);
  return response.data;
};


/**
 * Agrega un producto a un proyecto.
 *
 * @async
 * @function addProductToProject
 * @param {Object} data - Datos de la relación producto-proyecto.
 * @returns {Promise<Object>} Información de la relación creada entre el producto y el proyecto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const addProductToProject = async (data) => {
  const response = await axiosInstance.post('/product/project', data);
  return response.data;
};