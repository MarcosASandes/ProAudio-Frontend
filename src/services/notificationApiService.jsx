import axiosInstance from "./axiosInstance";
import qs from "qs";

export const getNotificationTypes = async () => {
  const response = await axiosInstance.get("/notification/types");
  return response.data;
};

export const getAllNotifications = async (
  page = 1,
  size = 10,
  type = null,
  completed = false,
  name = '',
) => {
  const params = {
    page: page - 1,
    size,
    type,
    completed,
    name,
  };

  const response = await axiosInstance.get("/notification/all", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};

export const getNotificationDetails = async (id) => {
  const response = await axiosInstance.get(`/notification/details/${id}`);
  return response.data;
};

export const readNotification = async (id) => {
  const response = await axiosInstance.post(`/notification/read/${id}`);
  return response.data;
};
