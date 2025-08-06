
/*VERSION NO CENTRALIZADA

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tag'; 
//const BASE_URL = '/api/tag';

export const getAllTags = async () => {
  const response = await axios.get(BASE_URL + '/all');
  return response.data;
};

export const getTagsTypes = async () => {
  const response = await axios.get(BASE_URL + '/types');
  return response.data;
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


/*----------------------------------------- */



import axiosInstance from './axiosInstance';

export const getAllTags = async () => {
  const response = await axiosInstance.get('/tag/all');
  console.log("Este es el response del getAllTags: ", response);
  return response.data;
};

export const getTagsTypes = async () => {
  const response = await axiosInstance.get('/tag/types');
  console.log("Este es el response del getAllTags: ", response);
  return response.data;
};

export const getTagById = async (id) => {
  const response = await axiosInstance.get(`/tag/${id}`);
  console.log("Este es el response del getAllTags: ", response);
  return response.data;
};

export const deleteTagById = async (tagId) => {
  const response = await axiosInstance.delete(`/tag/${tagId}`);
  console.log("Este es el response del getAllTags: ", response);
  return response.data;
};

export const createTag = async (tagData) => {
  const response = await axiosInstance.post('/tag', tagData);
  console.log("Este es el response del getAllTags: ", response);
  return response.data;
};

export const updateTag = async (tagId, tagData) => {
  const response = await axiosInstance.put(`/tag/${tagId}`, tagData);
  console.log("Este es el response del getAllTags: ", response);
  return response.data;
};
