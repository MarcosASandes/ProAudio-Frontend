import axiosInstance from './axiosInstance';

export const getAllExpensesByProject = async (id) => {
  const response = await axiosInstance.get(`/expense/project/${id}`);
  return response.data;
};

export const createExpense = async (data) => {
  const response = await axiosInstance.post('/expense', data);
  return response.data;
};

export const updateExpense = async (id, data) => {
  const response = await axiosInstance.put(`/expense/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axiosInstance.delete(`/expense/${id}`);
  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await axiosInstance.get(`/expense/${id}`);
  return response.data;
};

export const getExpenseTypes = async () => {
  const response = await axiosInstance.get('/expense/types');
  return response.data;
};
