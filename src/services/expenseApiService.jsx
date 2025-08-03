import axios from 'axios';

const BASE_URL = 'http://localhost:8080/expense'; 
//const BASE_URL = '/api/expense';

export const getAllExpensesByProject = async (id) => {
  const response = await axios.get(BASE_URL + '/project/' + id);
  return response.data;
};

export const createExpense = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateExpense = async (id, data) => {
  const response = await axios.put(BASE_URL + '/' + id, data);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(BASE_URL + '/' + id);
  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id);
  return response.data;
};

export const getExpenseTypes = async () => {
  const response = await axios.get(BASE_URL + '/types');
  return response.data;
};

