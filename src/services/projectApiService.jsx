/**
 * @file projectApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a proyectos.
 * Permite crear, actualizar, eliminar proyectos, consultar detalles, tipos, estados,
 * generar PDFs de presupuestos y manejar la relación entre proyectos y productos/ítems.
 *
 * @module projectApiService
 */

import axiosInstance from './axiosInstance';
import qs from 'qs';


/**
 * Crea un nuevo proyecto.
 *
 * @async
 * @function createProject
 * @param {Object} data - Datos del proyecto a crear.
 * @returns {Promise<Object>} Proyecto creado con su ID y detalles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createProject = async (data) => {
  const response = await axiosInstance.post('/project', data);
  return response.data;
};


/**
 * Actualiza un proyecto existente.
 *
 * @async
 * @function updateProject
 * @param {number|string} id - ID del proyecto.
 * @param {Object} data - Datos a actualizar del proyecto.
 * @returns {Promise<Object>} Proyecto actualizado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateProject = async (id, data) => {
  const response = await axiosInstance.put(`/project/${id}`, data);
  return response.data;
};


/**
 * Elimina un proyecto por su ID.
 *
 * @async
 * @function deleteProject
 * @param {number|string} id - ID del proyecto a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteProject = async (id) => {
  const response = await axiosInstance.delete(`/project/${id}`);
  return response.data;
};


/**
 * Obtiene un proyecto por su ID.
 *
 * @async
 * @function getProjectById
 * @param {number|string} id - ID del proyecto.
 * @returns {Promise<Object>} Detalles del proyecto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProjectById = async (id) => {
  const response = await axiosInstance.get(`/project/${id}`);
  return response.data;
};


/**
 * Obtiene los detalles completos de un proyecto.
 *
 * @async
 * @function getProjectDetails
 * @param {number|string} id - ID del proyecto.
 * @returns {Promise<Object>} Información detallada del proyecto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProjectDetails = async (id) => {
  const response = await axiosInstance.get(`/project/details/${id}`);
  return response.data;
};


/**
 * Obtiene los tipos de proyecto disponibles.
 *
 * @async
 * @function getProjectTypes
 * @returns {Promise<Array<string>>} Lista de tipos de proyectos.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProjectTypes = async () => {
  const response = await axiosInstance.get('/project/types');
  return response.data;
};


/**
 * Obtiene los posibles estados de un proyecto específico.
 *
 * @async
 * @function getProjectStatusByProjectId
 * @param {number|string} id - ID del proyecto.
 * @returns {Promise<Array<string>>} Lista de estados posibles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProjectStatusByProjectId = async (id) => {
  const response = await axiosInstance.get(`/project/possible/status/${id}`);
  return response.data;
};


/**
 * Obtiene los posibles estados iniciales de un proyecto.
 *
 * @async
 * @function getStartingProjectStatus
 * @returns {Promise<Array<string>>} Lista de estados iniciales disponibles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getStartingProjectStatus = async () => {
  const response = await axiosInstance.get('/project/possible/status');
  return response.data;
};


/**
 * Obtiene los posibles estados de pago de un proyecto específico.
 *
 * @async
 * @function getPossiblePaymentStatusByProjectId
 * @param {number|string} id - ID del proyecto.
 * @returns {Promise<Array<string>>} Lista de estados de pago posibles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getPossiblePaymentStatusByProjectId = async (id) => {
  const response = await axiosInstance.get(`/project/possible/payment/status/${id}`);
  return response.data;
};


/**
 * Genera un PDF del presupuesto de un proyecto.
 *
 * @async
 * @function getBudgetPdfByProjectId
 * @param {number|string} id - ID del proyecto.
 * @returns {Promise<string>} URL del PDF generado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getBudgetPdfByProjectId = async (id) => {
  const response = await axiosInstance.post(
    `/project/${id}/budget`,
    {},
    {
      responseType: 'blob',
      headers: { Accept: 'application/pdf' },
    }
  );

  const pdfUrl = URL.createObjectURL(response.data);
  return pdfUrl;
};


/**
 * Obtiene todos los estados disponibles de proyectos.
 *
 * @async
 * @function getAllStatuses
 * @returns {Promise<Array<string>>} Lista de todos los estados.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllStatuses = async () => {
  const response = await axiosInstance.get('/project/status/all');
  return response.data;
};


/**
 * Obtiene todos los estados de pago disponibles de proyectos.
 *
 * @async
 * @function getAllPaymentStatuses
 * @returns {Promise<Array<string>>} Lista de todos los estados de pago.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllPaymentStatuses = async () => {
  const response = await axiosInstance.get('/project/payment/status/all');
  return response.data;
};


/**
 * Obtiene todos los estados de ejecución de proyectos.
 *
 * @async
 * @function getAllRunningStatuses
 * @returns {Promise<Array<string>>} Lista de todos los estados en curso.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllRunningStatuses = async () => {
  const response = await axiosInstance.get('/project/running/status/all');
  return response.data;
};


/**
 * Obtiene proyectos paginados con filtros opcionales.
 *
 * @async
 * @function getAllProjects
 * @param {number} [page=1] - Número de página.
 * @param {number} [size=10] - Tamaño de página.
 * @param {string} [sortBy="start_date"] - Campo de ordenamiento.
 * @param {string} [direction="asc"] - Dirección de ordenamiento.
 * @param {Array<string>} [filterStatus=["PLANNED","CONFIRMED","ON_COURSE", "DISCARDED", "EXPIRED", "COMPLETED"]] - Filtro de estados de proyecto.
 * @param {string} [filterPaymentStatus=""] - Filtro de estado de pago.
 * @param {string} [name=""] - Nombre del proyecto a buscar.
 * @returns {Promise<Object>} Respuesta con { projects, pageable }.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllProjects = async (
  page = 1,
  size = 10,
  sortBy = 'start_date',
  direction = 'asc',
  filterStatus = ['PLANNED', 'CONFIRMED', 'ON_COURSE'],
  filterPaymentStatus = '',
  name = ''
) => {
  const params = {
    page: page - 1,
    size,
    sortBy,
    direction,
  };
  if (filterStatus.length > 0) {
    params.filterStatus = filterStatus;
  }
  if (filterPaymentStatus) {
    params.filterPaymentStatus = filterPaymentStatus;
  }
  if (name) {
    params.name = name;
  }
  const response = await axiosInstance.get('/project/all', {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  return response.data;
};


/**
 * Obtiene los productos asociados a un proyecto.
 *
 * @async
 * @function getProductsInProject
 * @param {number|string} id - ID del proyecto.
 * @returns {Promise<Array<Object>>} Lista de productos asociados.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProductsInProject = async (id) => {
  const response = await axiosInstance.get(`/project/${id}/products`);
  return response.data;
};


/**
 * Asigna un ítem a un proyecto (lo saca del depósito).
 *
 * @async
 * @function exitItemToProject
 * @param {number|string} idProject - ID del proyecto.
 * @param {number|string} idItem - ID del ítem.
 * @returns {Promise<Object>} Confirmación de salida del ítem.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const exitItemToProject = async (idProject, idItem) => {
  const response = await axiosInstance.post(`/project/${idProject}/item/${idItem}/exit`);
  return response.data;
};


/**
 * Obtiene los ítems asignados a un proyecto.
 *
 * @async
 * @function getOutletItemsByProjectId
 * @param {number|string} id - ID del proyecto.
 * @returns {Promise<Array<Object>>} Lista de ítems del proyecto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getOutletItemsByProjectId = async (id) => {
  const response = await axiosInstance.get(`/project/${id}/items`);
  return response.data;
};


/**
 * Elimina un ítem de un proyecto.
 *
 * @async
 * @function deleteOutletItemInProject
 * @param {number|string} idProject - ID del proyecto.
 * @param {number|string} idItem - ID del ítem a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteOutletItemInProject = async (idProject, idItem) => {
  const response = await axiosInstance.delete(`/project/${idProject}/item/${idItem}/delete`);
  return response.data;
};


/**
 * Devuelve un ítem de un proyecto al depósito.
 *
 * @async
 * @function returnItemToDeposit
 * @param {number|string} idProject - ID del proyecto.
 * @param {number|string} idItem - ID del ítem a devolver.
 * @returns {Promise<Object>} Confirmación de devolución.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const returnItemToDeposit = async (idProject, idItem) => {
  const response = await axiosInstance.post(`/project/${idProject}/item/${idItem}/return`);
  return response.data;
};