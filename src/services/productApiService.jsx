import axios from "axios";

const BASE_URL = "http://localhost:8080/product"; 

export const createProduct = async (formData) => {
  console.log("Form data: ");
  console.log(formData);
  const response = await axios.post("http://localhost:8080/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getProductStatus = async () => {
  const response = await axios.get(BASE_URL + '/status');
  return response.data;
};

export const addProductPhotos = async (formData, productId) => {
  console.log("Este es el formData: ");
  console.log(formData);
  const response = await axios.post(
    `http://localhost:8080/product/${productId}/photos/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  console.log("ProductData: ");
  console.log(productData);
  const response = await axios.put(`${BASE_URL}/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${BASE_URL}/${productId}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id);
  return response.data;
};

export const getProductDetails = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id + '/detail');
  return response.data;
};

export const deleteProductPhoto = async (id) => {
  const response = await axios.delete(BASE_URL + '/photo/' + id);
  return response.data;
};

export const deleteProductPrice = async (id) => {
  const response = await axios.delete(BASE_URL + '/price/' + id);
  return response.data;
};

export const createProductPrice = async (productPriceData) => {
  const response = await axios.post(BASE_URL + "/price", productPriceData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteProductTag = async (productId, tagId, type) => {
  const response = await axios.delete(`${BASE_URL}/${productId}/tag/${tagId}/type/${type}`);
  return response.data;
};

export const createProductTag = async (productPriceData) => {
  const response = await axios.post(BASE_URL + "/tag", productPriceData, {
    headers: {
      "Content-Type": "application/json",
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
export const getAllProducts = async (page = 1, size = 10, tags = [], sortBy = "id", direction = "asc") => {
  const params = {
    page,
    size,
  };

  if (tags.length > 0) {
    params.tags = tags.map((t) => t.tag_id).join(",");
  }

  if (sortBy) {
    params.sortBy = sortBy;
    params.direction = direction;
  }

  console.log(`${BASE_URL}/all`, { params });

  const response = await axios.get(`${BASE_URL}/all`, { params });
  return response.data;
};
