import axiosInstance from './axiosInstance';
import qs from "qs";

export const createClient = async (data) => {
  const response = await axiosInstance.post('/client', data);
  return response.data;
};

export const updateClient = async (id, data) => {
  const response = await axiosInstance.put(`/client/${id}`, data);
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await axiosInstance.delete(`/client/${id}`);
  return response.data;
};

export const getClientById = async (id) => {
  const response = await axiosInstance.get(`/client/${id}`);
  return response.data;
};

export const getClientDetails = async (id) => {
  const response = await axiosInstance.get(`/client/${id}/details`);
  return response.data;
};

/**
 * Obtiene todos los clientes con paginación, orden y filtros.
 * @param {number} page - Página actual (comienza en 1 en frontend).
 * @param {number} size - Cantidad de elementos por página.
 * @param {string} sortBy - Campo por el cual ordenar (id, name, phone_number).
 * @param {string} direction - Dirección del ordenamiento (asc o desc).
 * @param {string} status - Estado del cliente (enabled, disabled o vacío para todos).
 * @param {string} name - Filtro por nombre de cliente (opcional).
 */
export const getAllClients = async (
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

  console.log("/client/list", { params });

  const response = await axiosInstance.get("/client/list", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};