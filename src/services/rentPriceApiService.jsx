/**
 * @file rentPriceApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a los precios de alquiler de productos.
 * Permite consultar los precios de alquiler de un producto específico.
 *
 * @module rentPriceApiService
 */

import axiosInstance from './axiosInstance';


/**
 * Obtiene los precios de alquiler de un producto por su ID.
 *
 * @async
 * @function getProductPrices
 * @param {number|string} id - ID del producto.
 * @returns {Promise<Array<Object>>} Lista de precios de alquiler asociados al producto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProductPrices = async (id) => {
  const response = await axiosInstance.get(`/price/product/${id}`);
  return response.data;
};