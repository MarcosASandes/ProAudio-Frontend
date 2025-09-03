/**
 * @file analyticsApiService.jsx
 * @description Servicio de comunicación con los endpoints de analíticas del backend.
 * Proporciona funciones para obtener productos más alquilados, balance de productos
 * y balance mensual de proyectos.
 *
 * @module analyticsApiService
 */

import axiosInstance from "./axiosInstance";
import qs from "qs";


/**
 * Obtiene los productos más alquilados en un rango de fechas.
 *
 * @async
 * @function getMostRentedProducts
 * @param {string} [start=""] - Fecha de inicio en formato ISO (ej: "2025-01-01").
 * @param {string} [end=""] - Fecha de fin en formato ISO (ej: "2025-01-31").
 * @param {number} [limit=20] - Límite de resultados a devolver.
 * @returns {Promise<Object[]>} Lista de productos más alquilados con sus métricas.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getMostRentedProducts = async (
  start = "",
  end = "",
  limit = 20
) => {
  const params = {
    start,
    end,
    limit,
  };
  const response = await axiosInstance.get("/analytics/rented", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};


/**
 * Obtiene el balance de un producto específico por su ID.
 *
 * @async
 * @function getProductBalanceById
 * @param {number|string} id - Identificador único del producto.
 * @returns {Promise<Object>} Balance del producto, incluyendo ingresos, egresos y métricas relacionadas.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProductBalanceById = async (id) => {
  const response = await axiosInstance.get(`/analytics/balance/${id}`);
  return response.data;
};


/**
 * Obtiene el balance mensual de proyectos para un rango de años.
 *
 * @async
 * @function getMonthProjectsBalance
 * @param {number} [years=1] - Cantidad de años hacia atrás a considerar para el balance.
 * @returns {Promise<Object[]>} Lista con los balances mensuales de proyectos.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getMonthProjectsBalance = async (years = 1) => {
  const params = {
    years,
  };
  const response = await axiosInstance.get(`/analytics/monthly/projects`, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};
