import axiosInstance from './axiosInstance';

export const createProduct = async (formData) => {
  const response = await axiosInstance.post('/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getProductStatus = async () => {
  const response = await axiosInstance.get('/product/status');
  return response.data;
};

export const addProductPhotos = async (formData, productId) => {
  const response = await axiosInstance.post(`/product/${productId}/photos/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await axiosInstance.put(`/product/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/product/${productId}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
};

export const getProductDetails = async (id) => {
  const response = await axiosInstance.get(`/product/${id}/detail`);
  return response.data;
};

export const deleteProductPhoto = async (id) => {
  const response = await axiosInstance.delete(`/product/photo/${id}`);
  return response.data;
};

export const deleteProductPrice = async (id) => {
  const response = await axiosInstance.delete(`/product/price/${id}`);
  return response.data;
};

export const createProductPrice = async (productPriceData) => {
  const response = await axiosInstance.post('/product/price', productPriceData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteProductTag = async (productId, tagId, type) => {
  const response = await axiosInstance.delete(`/product/${productId}/tag/${tagId}/type/${type}`);
  return response.data;
};

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
 * @param {number} page - Número de página (empieza en 1).
 * @param {number} size - Tamaño de página.
 * @param {Array} tags - Array de tags seleccionados.
 * @param {string} sortBy - Campo por el que ordenar.
 * @param {string} direction - Dirección del orden (asc o desc).
 * @returns {Promise<Object>} Respuesta con { products, pageable }.
 */
export const getAllProducts = async (page = 1, size = 10, tags = [], sortBy = "id", direction = "asc", title = '') => {
  const params = {
    page: page - 1,
    size,
  };

  if (tags?.length > 0) {
    console.log("Esto es tags: ", tags);
    params.tags = tags?.map(t => t.tag_id).join(",");
  }

  if (sortBy) {
    params.sortBy = sortBy;
    params.direction = direction;
  }

  if (title) {
    params.title = title;
  }

  console.log('/product/all', { params });

  const response = await axiosInstance.get('/product/all', { params });
  return response.data;
};