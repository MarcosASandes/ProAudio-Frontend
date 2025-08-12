import axiosInstance from './axiosInstance';

export const getProductPrices = async (id) => {
  const response = await axiosInstance.get(`/price/product/${id}`);
  return response.data;
};