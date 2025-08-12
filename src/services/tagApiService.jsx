import axiosInstance from './axiosInstance';

export const getAllTags = async () => {
  const response = await axiosInstance.get('/tag/all');
  return response.data;
};

export const getTagsTypes = async () => {
  const response = await axiosInstance.get('/tag/types');
  return response.data;
};

export const getTagById = async (id) => {
  const response = await axiosInstance.get(`/tag/${id}`);
  return response.data;
};

export const deleteTagById = async (tagId) => {
  const response = await axiosInstance.delete(`/tag/${tagId}`);
  return response.data;
};

export const createTag = async (tagData) => {
  const response = await axiosInstance.post('/tag', tagData);
  return response.data;
};

export const updateTag = async (tagId, tagData) => {
  const response = await axiosInstance.put(`/tag/${tagId}`, tagData);
  return response.data;
};
