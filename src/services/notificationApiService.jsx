import axiosInstance from "./axiosInstance";
import qs from "qs";

export const getNotificationTypes = async () => {
  const response = await axiosInstance.get("/notifications/types");
  return response.data;
};

export const getAllNotifications = async (
  page = 1, 
  size = 10,
  direction = "desc",
  type = null,
  solved = false,
  seen = false
) => {
  const params = {
    page: page - 1,
    size,
    direction,
    type,
    solved,
    seen,
  };

  const response = await axiosInstance.get("/notification/all", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};


export const getNotificationDetails = async (id) => {
  const response = await axiosInstance.get(`/notifications/${id}`);
  return response.data;
};

export const readNotification = async (id) => {
  const response = await axiosInstance.post(`/notifications/${id}/read`);
  return response.data;
};
