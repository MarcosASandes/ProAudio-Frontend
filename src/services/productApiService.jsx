/**
 * @file productApiService.jsx
 * @description Servicio de comunicación con los endpoints relacionados a productos.
 * Permite crear, actualizar, eliminar productos, gestionar fotos, precios, tags y consultar productos con filtros y paginación.
 *
 * @module productApiService
 */

import axiosInstance from './axiosInstance';


/**
 * Crea un nuevo producto con soporte de archivos (multipart/form-data).
 *
 * @async
 * @function createProduct
 * @param {FormData} formData - Datos del producto a crear, incluyendo imágenes y atributos.
 * @returns {Promise<Object>} Producto creado con su ID y detalles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createProduct = async (formData) => {
  const response = await axiosInstance.post('/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


/**
 * Obtiene todos los estados posibles de los productos.
 *
 * @async
 * @function getProductStatus
 * @returns {Promise<string[]>} Lista de estados disponibles (ej: ["ACTIVE", "UNUSED", "ELIMINATED"]).
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProductStatus = async () => {
  const response = await axiosInstance.get('/product/status');
  return response.data;
};


/**
 * Agrega fotos a un producto existente.
 *
 * @async
 * @function addProductPhotos
 * @param {FormData} formData - Imágenes a agregar.
 * @param {number|string} productId - ID del producto al que se agregarán las fotos.
 * @returns {Promise<Object>} Información del producto con las nuevas fotos agregadas.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const addProductPhotos = async (formData, productId) => {
  const response = await axiosInstance.post(`/product/${productId}/photos/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


/**
 * Actualiza la información de un producto existente.
 *
 * @async
 * @function updateProduct
 * @param {number|string} productId - ID del producto a actualizar.
 * @param {Object} productData - Datos a actualizar del producto.
 * @returns {Promise<Object>} Producto actualizado con los nuevos datos.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const updateProduct = async (productId, productData) => {
  const response = await axiosInstance.put(`/product/${productId}`, productData);
  return response.data;
};


/**
 * Elimina un producto por su ID.
 *
 * @async
 * @function deleteProduct
 * @param {number|string} productId - ID del producto a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/product/${productId}`);
  return response.data;
};


/**
 * Obtiene un producto específico por su ID.
 *
 * @async
 * @function getProductById
 * @param {number|string} id - ID del producto.
 * @returns {Promise<Object>} Detalles del producto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
};


/**
 * Obtiene los detalles completos de un producto específico.
 *
 * @async
 * @function getProductDetails
 * @param {number|string} id - ID del producto.
 * @returns {Promise<Object>} Información detallada del producto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getProductDetails = async (id) => {
  const response = await axiosInstance.get(`/product/${id}/detail`);
  return response.data;
};


/**
 * Elimina una foto de un producto por su ID.
 *
 * @async
 * @function deleteProductPhoto
 * @param {number|string} id - ID de la foto a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación de la foto.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteProductPhoto = async (id) => {
  const response = await axiosInstance.delete(`/product/photo/${id}`);
  return response.data;
};


/**
 * Elimina un precio de producto por su ID.
 *
 * @async
 * @function deleteProductPrice
 * @param {number|string} id - ID del precio a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteProductPrice = async (id) => {
  const response = await axiosInstance.delete(`/product/price/${id}`);
  return response.data;
};


/**
 * Crea un precio para un producto.
 *
 * @async
 * @function createProductPrice
 * @param {Object} productPriceData - Datos del precio a crear.
 * @returns {Promise<Object>} Precio creado con su ID y detalles.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createProductPrice = async (productPriceData) => {
  const response = await axiosInstance.post('/product/price', productPriceData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


/**
 * Elimina un tag de un producto.
 *
 * @async
 * @function deleteProductTag
 * @param {number|string} productId - ID del producto.
 * @param {number|string} tagId - ID del tag a eliminar.
 * @param {string} type - Tipo de tag.
 * @returns {Promise<Object>} Confirmación de eliminación del tag.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const deleteProductTag = async (productId, tagId, type) => {
  const response = await axiosInstance.delete(`/product/${productId}/tag/${tagId}/type/${type}`);
  return response.data;
};


/**
 * Crea un tag para un producto.
 *
 * @async
 * @function createProductTag
 * @param {Object} productPriceData - Datos del tag a crear.
 * @returns {Promise<Object>} Tag creado con su información.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const createProductTag = async (productPriceData) => {
  const response = await axiosInstance.post('/product/tag', productPriceData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


/**
 * Obtiene productos paginados con filtros opcionales.
 *
 * @async
 * @function getAllProducts
 * @param {number} [page=1] - Número de página (empezando en 1).
 * @param {number} [size=10] - Cantidad de productos por página.
 * @param {Array} [tags=[]] - Lista de tags seleccionados para filtrar.
 * @param {string} [sortBy="id"] - Campo por el que ordenar.
 * @param {string} [direction="asc"] - Dirección de orden ("asc" o "desc").
 * @param {string} [title=""] - Filtrar productos por título.
 * @returns {Promise<Object>} Respuesta con productos y metadatos de paginación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const getAllProducts = async (page = 1, size = 10, tags = [], sortBy = "id", direction = "asc", title = '') => {
  const params = {
    page: page - 1,
    size,
  };
  if (tags?.length > 0) {
    params.tags = tags?.map(t => t.tag_id).join(",");
  }
  if (sortBy) {
    params.sortBy = sortBy;
    params.direction = direction;
  }
  if (title) {
    params.title = title;
  }
  const response = await axiosInstance.get('/product/all', { params });
  return response.data;
};