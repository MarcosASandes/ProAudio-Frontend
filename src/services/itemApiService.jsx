import axios from 'axios';

const BASE_URL = 'http://localhost:8080/item';

export const createItems = async (payload) => {
    console.log(payload);
  const response = await axios.post(BASE_URL, payload);
  return response.data; // Retorna el array de items creados con sus QR base64
};

export const updateItemById = async (id, payload) => {
  const response = await axios.put(BASE_URL + "/" + id, payload);
  return response.data;
};

export const getItemById = async (id) => {
  console.log("Llego al getItemById");
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

export const getStatuses = async () => {
  const response = await axios.get(BASE_URL + "/status");
  return response.data;
};