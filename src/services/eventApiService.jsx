/**
 * @file eventApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a eventos.
 * Permite crear, actualizar, eliminar, obtener y listar eventos con filtros.
 *
 * @module eventApiService
 */

import axiosInstance from './axiosInstance';
import qs from "qs";


/**
 * Obtiene una lista paginada de eventos con filtros opcionales.
 *
 * @async
 * @function getAllEvents
 * @param {number} [page=1] - Número de página (empieza en 1).
 * @param {number} [size=10] - Cantidad de resultados por página.
 * @param {string} [sortBy="id"] - Campo por el cual ordenar.
 * @param {("asc"|"desc")} [direction="desc"] - Dirección de la ordenación.
 * @param {string} [status=""] - Filtro por estado del evento.
 * @param {string} [name=""] - Filtro por nombre o título del evento.
 * @returns {Promise<Object>} Objeto con la lista de eventos, paginación y metadatos.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllEvents = async (
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
  const response = await axiosInstance.get("/event", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};


/**
 * Crea un nuevo evento en el sistema.
 *
 * @async
 * @function createEvent
 * @param {Object} data - Datos del evento a crear.
 * @param {string} data.name - Nombre o título del evento.
 * @param {string} [data.date] - Fecha del evento en formato ISO.
 * @param {string} [data.location] - Ubicación del evento.
 * @param {string} [data.description] - Descripción del evento.
 * @returns {Promise<Object>} Evento creado con su ID asignado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createEvent = async (data) => {
  const response = await axiosInstance.post('/event', data);
  return response.data;
};


/**
 * Actualiza la información de un evento existente.
 *
 * @async
 * @function updateEvent
 * @param {number|string} id - Identificador único del evento.
 * @param {Object} data - Datos del evento a actualizar.
 * @returns {Promise<Object>} Evento actualizado con los nuevos valores.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateEvent = async (id, data) => {
  const response = await axiosInstance.put(`/event/${id}`, data);
  return response.data;
};


/**
 * Elimina un evento por su ID.
 *
 * @async
 * @function deleteEvent
 * @param {number|string} id - Identificador único del evento.
 * @returns {Promise<Object>} Confirmación de la eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(`/event/${id}`);
  return response.data;
};


/**
 * Obtiene la información de un evento específico por su ID.
 *
 * @async
 * @function getEventById
 * @param {number|string} id - Identificador único del evento.
 * @returns {Promise<Object>} Datos del evento solicitado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getEventById = async (id) => {
  const response = await axiosInstance.get(`/event/${id}`);
  return response.data;
};