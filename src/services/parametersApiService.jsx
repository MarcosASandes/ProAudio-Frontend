/*
VERSIÓN NO CENTRALIZADA

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/parameters';
//const BASE_URL = '/api/parameters'; 

export const getAllParameters = async () => {
  const response = await axios.get(BASE_URL + '/all');
  return response.data;
};

export const createParameter = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateParameter = async (id, data) => {
  const response = await axios.put(BASE_URL + '/' + id, data);
  return response.data;
};

export const deleteParameter = async (id) => {
  const response = await axios.delete(BASE_URL + '/' + id);
  return response.data;
};

export const getParameterById = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id);
  return response.data;
};*/



/*---------------------------------------- */


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