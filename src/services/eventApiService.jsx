import axios from 'axios';

const BASE_URL = 'http://localhost:8080/event'; 

//No está implementado aún
export const getAllEvents = async () => {
  const response = await axios.get(BASE_URL + '/all');
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
};

