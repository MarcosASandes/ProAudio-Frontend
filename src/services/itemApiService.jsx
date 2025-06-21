import axios from 'axios';

const BASE_URL = 'http://localhost:8080/item';

export const createItems = async (payload) => {
    console.log(payload);
  const response = await axios.post(BASE_URL, payload);
  return response.data; // Retorna el array de items creados con sus QR base64
};