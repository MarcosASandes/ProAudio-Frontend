import axios from 'axios';

const BASE_URL = 'http://proaudio-test.c6zfg2tqcsfh.us-east-1.rds.amazonaws.com/tag'; // Reemplaza con la URL real

export const getAllTags = async () => {
  const response = await axios.get(BASE_URL + '/all');
  return response.data; // Asegúrate de que esto sea lo que necesitas
};
