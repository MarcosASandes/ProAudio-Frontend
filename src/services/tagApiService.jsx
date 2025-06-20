import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tag'; // Reemplaza con la URL real

export const getAllTags = async () => {
  const response = await axios.get(BASE_URL + '/all');
  return response.data; // Asegúrate de que esto sea lo que necesitas
};

export const getTagsTypes = async () => {
  const response = await axios.get(BASE_URL + '/types');
  return response.data; // Asegúrate de que esto sea lo que necesitas
};

export const getTagById = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id);
  return response.data;
};

export const deleteTagById = async (tagId) => {
  const response = await axios.delete(BASE_URL + '/' + tagId);
  return response.data;
};

export const createTag = async (tagData) => {
  const response = await axios.post(BASE_URL, tagData);
  return response.data;
};

export const updateTag = async (tagId, tagData) => {
  const response = await axios.put(BASE_URL + '/' + tagId, tagData);
  console.log("RESPONSE: ");
  console.log(response);
  
  return response.data;
};

