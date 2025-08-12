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