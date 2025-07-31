import axios from 'axios';

const BASE_URL = 'http://localhost:8080/item';

export const createItems = async (payload) => {
  const response = await axios.post(BASE_URL, payload);
  return response.data;
};

export const deleteItemById = async (itemId) => {
  const response = await axios.delete(`${BASE_URL}/${itemId}`);
  return response.data;
};

export const updateItemById = async (id, payload) => {
  const response = await axios.put(BASE_URL + "/" + id, payload);
  return response.data;
};

export const getItemById = async (id) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

export const getStatuses = async () => {
  const response = await axios.get(BASE_URL + "/status");
  return response.data;
};

export const getItemDetails = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id + '/detail');
  return response.data;
};

export const regenerateQrCode = async (id) => {
  const response = await axios.post(BASE_URL + '/' + id + '/regenerate/qr');
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

  
  console.log(`${BASE_URL}/product/${productId}`, params);


  const response = await axios.get(`${BASE_URL}/product/${productId}`, { params });
  return response.data;
};

