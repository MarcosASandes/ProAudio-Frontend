/**
 * @file itemApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a ítems individuales de productos.
 * Permite crear ítems, actualizarlos, eliminarlos, consultar su información, estados disponibles,
 * regenerar códigos QR y manejar su devolución.
 *
 * @module itemApiService
 */

import axiosInstance from "./axiosInstance";

/**
 * Crea uno o varios ítems asociados a productos.
 *
 * @async
 * @function createItems
 * @param {Object} payload - Objeto con la lista de ítems a crear.
 * @param {Array<Object>} payload.items - Lista de ítems.
 * @param {number} payload.items[].product_id - ID del producto asociado.
 * @param {string} payload.items[].description - Descripción del ítem.
 * @param {number} payload.items[].price_bought - Precio de compra del ítem.
 * @param {string} payload.items[].bought_at - Fecha de compra en formato ISO.
 * @param {number} payload.items[].amount_bought - Cantidad comprada.
 * @param {string} payload.items[].item_range - Rango o ubicación del ítem.
 * @param {Array<string|number>} payload.items[].serial_numbers - Números de serie asociados.
 * @returns {Promise<Object>} Resultado con los ítems creados y sus IDs.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createItems = async (payload) => {
  const response = await axiosInstance.post("/item", payload);
  return response.data;
};

/**
 * Elimina un ítem por su ID.
 *
 * @async
 * @function deleteItemById
 * @param {number|string} itemId - Identificador único del ítem.
 * @returns {Promise<Object>} Confirmación de la eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteItemById = async (itemId) => {
  const response = await axiosInstance.delete(`/item/${itemId}`);
  return response.data;
};

/**
 * Actualiza la información de un ítem específico.
 *
 * @async
 * @function updateItemById
 * @param {number|string} id - Identificador único del ítem.
 * @param {Object} payload - Datos del ítem a actualizar.
 * @param {string} [payload.status] - Nuevo estado del ítem (ej: "WITH_DETAILS").
 * @param {string} [payload.description] - Nueva descripción del ítem.
 * @param {string} [payload.item_range] - Rango o ubicación del ítem.
 * @returns {Promise<Object>} Ítem actualizado con los nuevos valores.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateItemById = async (id, payload) => {
  const response = await axiosInstance.put(`/item/${id}`, payload);
  return response.data;
};

/**
 * Obtiene la información de un ítem específico por su ID.
 *
 * @async
 * @function getItemById
 * @param {number|string} id - Identificador único del ítem.
 * @returns {Promise<Object>} Datos del ítem solicitado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getItemById = async (id) => {
  const response = await axiosInstance.get(`/item/${id}`);
  return response.data;
};

/**
 * Obtiene la lista de todos los estados posibles de los ítems.
 *
 * @async
 * @function getStatuses
 * @returns {Promise<string[]>} Lista de estados disponibles (ej: ["CREATED", "DELETED", "GOOD", "WITH_DETAILS", "OUT_OF_USAGE"]).
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getStatuses = async () => {
  const response = await axiosInstance.get("/item/status");
  return response.data;
};

/**
 * Obtiene los posibles estados de transición de un ítem específico.
 *
 * @async
 * @function getItemStatusesById
 * @param {number|string} id - Identificador único del ítem.
 * @returns {Promise<string[]>} Lista de estados a los que puede cambiar el ítem.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getItemStatusesById = async (id) => {
  const response = await axiosInstance.get(`/item/possible/status/${id}`);
  return response.data;
};

/**
 * Obtiene los detalles completos de un ítem específico.
 *
 * @async
 * @function getItemDetails
 * @param {number|string} id - Identificador único del ítem.
 * @returns {Promise<Object>} Información detallada del ítem.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getItemDetails = async (id) => {
  const response = await axiosInstance.get(`/item/${id}/detail`);
  return response.data;
};

/**
 * Regenera el código QR de un ítem específico.
 *
 * @async
 * @function regenerateQrCode
 * @param {number|string} id - Identificador único del ítem.
 * @returns {Promise<Object>} Código QR actualizado.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const regenerateQrCode = async (id) => {
  const response = await axiosInstance.post(`/item/${id}/regenerate/qr`);
  return response.data;
};

/**
 * Marca un ítem como devuelto.
 *
 * @async
 * @function returnItemById
 * @param {number|string} id - Identificador único del ítem.
 * @returns {Promise<Object>} Confirmación de devolución.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const returnItemById = async (id) => {
  const response = await axiosInstance.post(`/item/${id}/return`);
  return response.data;
};

/**
 * Obtiene los ítems asociados a un producto con paginación y filtros opcionales.
 *
 * @async
 * @function getAllItemsByProduct
 * @param {number|string} productId - Identificador del producto.
 * @param {number} [page=1] - Número de página (empezando en 1).
 * @param {number} [size=10] - Cantidad de ítems por página.
 * @param {string} [status=""] - Filtro por estado del ítem.
 * @param {string} [sortBy="id"] - Campo por el cual ordenar.
 * @param {string} [direction="ASC"] - Dirección de orden ("ASC" o "DESC").
 * @returns {Promise<Object>} Respuesta con los ítems y metadatos de paginación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllItemsByProduct = async (
  productId,
  page = 1,
  size = 10,
  status = "",
  sortBy = "id",
  direction = "ASC"
) => {
  const params = { page, size };
  if (status) params.status = status;
  if (sortBy) {
    params.sortBy = sortBy;
    params.direction = direction;
  }
  const response = await axiosInstance.get(`/item/product/${productId}`, {
    params,
  });
  return response.data;
};
