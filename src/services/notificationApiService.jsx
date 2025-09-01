/**
 * @file notificationApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a notificaciones.
 * Permite obtener tipos de notificación, listar notificaciones con filtros y paginación,
 * consultar detalles de una notificación y marcarlas como leídas.
 *
 * @module notificationApiService
 */

import axiosInstance from "./axiosInstance";
import qs from "qs";


/**
 * Obtiene todos los tipos de notificación disponibles en el sistema.
 *
 * @async
 * @function getNotificationTypes
 * @returns {Promise<Object[]>} Lista de tipos de notificación (ej: ["PROJECT", "PRODUCT", "ITEM", "CLIENT"]).
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getNotificationTypes = async () => {
  const response = await axiosInstance.get("/notification/types");
  return response.data;
};


/**
 * Obtiene todas las notificaciones con soporte de paginación y filtros opcionales.
 *
 * @async
 * @function getAllNotifications
 * @param {number} [page=1] - Número de página (empezando en 1).
 * @param {number} [size=10] - Cantidad de notificaciones por página.
 * @param {string|null} [type=null] - Tipo de notificación a filtrar (ej: "PROJECT").
 * @param {boolean} [completed=false] - Filtrar notificaciones completadas o no completadas.
 * @param {string} [name=""] - Filtro por nombre o título de la notificación.
 * @returns {Promise<Object>} Objeto con las notificaciones y metadatos de paginación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllNotifications = async (
  page = 1,
  size = 10,
  type = null,
  completed = false,
  name = '',
) => {
  const params = {
    page: page - 1,
    size,
    type,
    completed,
    name,
  };
  const response = await axiosInstance.get("/notification/all", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};


/**
 * Obtiene los detalles completos de una notificación específica.
 *
 * @async
 * @function getNotificationDetails
 * @param {number|string} id - Identificador único de la notificación.
 * @returns {Promise<Object>} Información detallada de la notificación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getNotificationDetails = async (id) => {
  const response = await axiosInstance.get(`/notification/details/${id}`);
  return response.data;
};


/**
 * Marca una notificación como leída.
 *
 * @async
 * @function readNotification
 * @param {number|string} id - Identificador único de la notificación.
 * @returns {Promise<Object>} Confirmación del servidor tras marcar como leída.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const readNotification = async (id) => {
  const response = await axiosInstance.post(`/notification/read/${id}`);
  return response.data;
};
