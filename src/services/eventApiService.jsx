/*
VERSION NO CENTRALIZADA

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/event'; 
//const BASE_URL = '/api/event'; 

export const getAllEvents = async (page, size) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: { page, size },
  });
  return response.data;
};

export const createEvent = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateEvent = async (id, data) => {
  const response = await axios.put(BASE_URL + '/' + id, data);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(BASE_URL + '/' + id);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id);
  return response.data;
};*/

/*----------------------------------------- */



import axiosInstance from './axiosInstance';

export const getAllEvents = async (page, size) => {
  const response = await axiosInstance.get('/event', {
    params: { page, size },
  });
  return response.data;
};

export const createEvent = async (data) => {
  const response = await axiosInstance.post('/event', data);
  return response.data;
};

export const updateEvent = async (id, data) => {
  const response = await axiosInstance.put(`/event/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(`/event/${id}`);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axiosInstance.get(`/event/${id}`);
  return response.data;
};