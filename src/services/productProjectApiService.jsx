import axiosInstance from './axiosInstance';

export const deleteProductProject = async (id) => {
  const response = await axiosInstance.delete(`/product/project/${id}`);
  return response.data;
};

export const addProductToProject = async (data) => {
  const response = await axiosInstance.post('/product/project', data);
  return response.data;
};