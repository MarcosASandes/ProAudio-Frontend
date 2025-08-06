/*
VERSION NO CENTRALIZADA

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/client'; 
//const BASE_URL = '/api/client'; 

export const createClient = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateClient = async (id, data) => {
  const response = await axios.put(BASE_URL + '/' + id, data);
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await axios.delete(BASE_URL + '/' + id);
  return response.data;
};

export const getClientById = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id);
  return response.data;
};

export const getClientDetails = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id + "/details");
  return response.data;
};*/


/*-------------------------------------- */



import axiosInstance from './axiosInstance';

export const createClient = async (data) => {
  const response = await axiosInstance.post('/client', data);
  return response.data;
};

export const updateClient = async (id, data) => {
  const response = await axiosInstance.put(`/client/${id}`, data);
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await axiosInstance.delete(`/client/${id}`);
  return response.data;
};

export const getClientById = async (id) => {
  const response = await axiosInstance.get(`/client/${id}`);
  return response.data;
};

export const getClientDetails = async (id) => {
  const response = await axiosInstance.get(`/client/${id}/details`);
  return response.data;
};