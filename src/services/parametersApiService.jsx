import axiosInstance from './axiosInstance';

export const getAllParameters = async () => {
  const response = await axiosInstance.get('/parameters/all');
  return response.data;
};

export const createParameter = async (data) => {
  const response = await axiosInstance.post('/parameters', data);
  return response.data;
};

export const updateParameter = async (id, data) => {
  const response = await axiosInstance.put(`/parameters/${id}`, data);
  return response.data;
};

export const deleteParameter = async (id) => {
  const response = await axiosInstance.delete(`/parameters/${id}`);
  return response.data;
};

export const getParameterById = async (id) => {
  const response = await axiosInstance.get(`/parameters/${id}`);
  return response.data;
};