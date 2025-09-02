/**
 * @file expenseApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a gastos.
 * Permite crear, actualizar, eliminar, obtener gastos por proyecto y consultar tipos de gastos.
 *
 * @module expenseApiService
 */

import axiosInstance from './axiosInstance';


/**
 * Obtiene todos los gastos asociados a un proyecto.
 *
 * @async
 * @function getAllExpensesByProject
 * @param {number|string} id - Identificador único del proyecto.
 * @returns {Promise<Object[]>} Lista de gastos relacionados con el proyecto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllExpensesByProject = async (id) => {
  const response = await axiosInstance.get(`/expense/project/${id}`);
  return response.data;
};


/**
 * Crea un nuevo gasto en el sistema.
 *
 * @async
 * @function createExpense
 * @param {Object} data - Datos del gasto a crear.
 * @param {number} data.project_id - ID del proyecto asociado al gasto.
 * @param {string} data.type - Tipo de gasto (ej: "PERSONNEL", "EXTRA_COST").
 * @param {number} data.value - Monto del gasto.
 * @param {string} data.description - Descripción del gasto.
 * @returns {Promise<Object>} Gasto creado con su ID asignado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createExpense = async (data) => {
  const response = await axiosInstance.post('/expense', data);
  return response.data;
};


/**
 * Actualiza la información de un gasto existente.
 *
 * @async
 * @function updateExpense
 * @param {number|string} id - Identificador único del gasto.
 * @param {Object} data - Datos del gasto a actualizar.
 * @param {number} [data.value] - Monto del gasto.
 * @param {string} [data.description] - Descripción del gasto.
 * @returns {Promise<Object>} Gasto actualizado con los nuevos valores.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateExpense = async (id, data) => {
  const response = await axiosInstance.put(`/expense/${id}`, data);
  return response.data;
};


/**
 * Elimina un gasto por su ID.
 *
 * @async
 * @function deleteExpense
 * @param {number|string} id - Identificador único del gasto.
 * @returns {Promise<Object>} Confirmación de la eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteExpense = async (id) => {
  const response = await axiosInstance.delete(`/expense/${id}`);
  return response.data;
};


/**
 * Obtiene la información de un gasto específico por su ID.
 *
 * @async
 * @function getExpenseById
 * @param {number|string} id - Identificador único del gasto.
 * @returns {Promise<Object>} Datos del gasto solicitado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getExpenseById = async (id) => {
  const response = await axiosInstance.get(`/expense/${id}`);
  return response.data;
};


/**
 * Obtiene todos los tipos de gastos disponibles en el sistema.
 *
 * @async
 * @function getExpenseTypes
 * @returns {Promise<string[]>} Lista de tipos de gastos (ej: ["PERSONNEL", "EXTRA_COST"]).
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getExpenseTypes = async () => {
  const response = await axiosInstance.get('/expense/types');
  return response.data;
};
