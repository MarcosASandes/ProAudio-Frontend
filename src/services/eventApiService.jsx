import axiosInstance from './axiosInstance';
import qs from "qs";

export const getAllEvents = async (
  page = 1,
  size = 10,
  sortBy = "id",
  direction = "desc",
  status = "",
  name = ""
) => {
  const params = {
    page: page - 1,
    size,
    sortBy,
    direction,
  };

  if (status) {
    params.status = status;
  }

  if (name) {
    params.name = name;
  }

  console.log("/event", { params });

  const response = await axiosInstance.get("/event", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  console.log("Eventos que llegan: ", response);

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