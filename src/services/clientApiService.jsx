/**
 * @file clientApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a clientes.
 * Permite crear, actualizar, eliminar, obtener detalles y listar clientes con filtros.
 *
 * @module clientApiService
 */

import axiosInstance from './axiosInstance';
import qs from "qs";


/**
 * Crea un nuevo cliente en el sistema.
 *
 * @async
 * @function createClient
 * @param {Object} data - Datos del cliente a crear.
 * @param {string} data.name - Nombre del cliente.
 * @param {string} [data.email] - Correo electrónico del cliente.
 * @param {string} [data.phone] - Teléfono de contacto del cliente.
 * @param {string} [data.address] - Dirección del cliente.
 * @returns {Promise<Object>} Cliente creado con su ID asignado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createClient = async (data) => {
  const response = await axiosInstance.post('/client', data);
  return response.data;
};


/**
 * Actualiza la información de un cliente existente.
 *
 * @async
 * @function updateClient
 * @param {number|string} id - Identificador único del cliente.
 * @param {Object} data - Datos del cliente a actualizar.
 * @returns {Promise<Object>} Cliente actualizado con los nuevos valores.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateClient = async (id, data) => {
  const response = await axiosInstance.put(`/client/${id}`, data);
  return response.data;
};


/**
 * Elimina un cliente por su ID.
 *
 * @async
 * @function deleteClient
 * @param {number|string} id - Identificador único del cliente.
 * @returns {Promise<Object>} Confirmación de la eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteClient = async (id) => {
  const response = await axiosInstance.delete(`/client/${id}`);
  return response.data;
};


/**
 * Obtiene la información básica de un cliente por su ID.
 *
 * @async
 * @function getClientById
 * @param {number|string} id - Identificador único del cliente.
 * @returns {Promise<Object>} Datos básicos del cliente.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getClientById = async (id) => {
  const response = await axiosInstance.get(`/client/${id}`);
  return response.data;
};


/**
 * Obtiene los detalles completos de un cliente por su ID.
 *
 * @async
 * @function getClientDetails
 * @param {number|string} id - Identificador único del cliente.
 * @returns {Promise<Object>} Información detallada del cliente (ejemplo: información básica, proyectos asociados).
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getClientDetails = async (id) => {
  const response = await axiosInstance.get(`/client/${id}/details`);
  return response.data;
};


/**
 * Obtiene una lista paginada de clientes con filtros opcionales.
 *
 * @async
 * @function getAllClients
 * @param {number} [page=1] - Número de página (empieza en 1).
 * @param {number} [size=10] - Cantidad de resultados por página.
 * @param {string} [sortBy="id"] - Campo por el cual ordenar.
 * @param {("asc"|"desc")} [direction="desc"] - Dirección de la ordenación.
 * @param {string} [status=""] - Filtro por estado del cliente.
 * @param {string} [name=""] - Filtro por nombre del cliente.
 * @returns {Promise<Object>} Objeto con la lista de clientes, paginación y metadatos.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllClients = async (
  page = 1,
  size = 10,
  sortBy = "id",
  direction = "desc",
  status = "",
  name = ""
) => {
  const params = {
    page: page - 1,
    size,
    sortBy,
    direction,
  };
  if (status) {
    params.status = status;
  }
  if (name) {
    params.name = name;
  }
  const response = await axiosInstance.get("/client/list", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};