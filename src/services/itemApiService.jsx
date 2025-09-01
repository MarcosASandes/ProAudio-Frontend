import axiosInstance from './axiosInstance';

export const createItems = async (payload) => {
  const response = await axiosInstance.post('/item', payload);
  return response.data;
};

export const deleteItemById = async (itemId) => {
  const response = await axiosInstance.delete(`/item/${itemId}`);
  return response.data;
};

export const updateItemById = async (id, payload) => {
  const response = await axiosInstance.put(`/item/${id}`, payload);
  return response.data;
};

export const getItemById = async (id) => {
  const response = await axiosInstance.get(`/item/${id}`);
  return response.data;
};

export const getStatuses = async () => {
  const response = await axiosInstance.get('/item/status');
  return response.data;
};

export const getItemStatusesById = async (id) => {
  const response = await axiosInstance.get(`/item/possible/status/${id}`);
  return response.data;
};

export const getItemDetails = async (id) => {
  const response = await axiosInstance.get(`/item/${id}/detail`);
  return response.data;
};

export const regenerateQrCode = async (id) => {
  const response = await axiosInstance.post(`/item/${id}/regenerate/qr`);
  return response.data;
};

export const returnItemById = async (id) => {
  const response = await axiosInstance.post(`/item/${id}/return`);
  return response.data;
};

/**
 * Obtiene artículos paginados con filtros opcionales.
 * @param {number} page
 * @param {number} size
 * @param {string} status
 * @param {string} sortBy
 * @param {string} direction
 * @returns {Promise<Object>} Respuesta con { items, pageable }
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

  const response = await axiosInstance.get(`/item/product/${productId}`, { params });
  return response.data;
};