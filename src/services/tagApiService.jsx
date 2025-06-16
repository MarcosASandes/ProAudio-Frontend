import axios from 'axios';

const BASE_URL = 'https://proaudio-channels-testing-env.eba-ut3ydwmy.us-east-1.elasticbeanstalk.com/tag'; // Reemplaza con la URL real

export const getAllTags = async () => {
  const response = await axios.get(BASE_URL + '/all');
  return response.data; // Asegúrate de que esto sea lo que necesitas
};
