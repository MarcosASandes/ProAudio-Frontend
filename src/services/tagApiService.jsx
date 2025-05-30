import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tag'; // Reemplaza con la URL real

export const getAllTags = async () => {
  const response = await axios.get(BASE_URL + '/all');
  return response.data; // Asegúrate de que esto sea lo que necesitas
};
