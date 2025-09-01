import axiosInstance from "./axiosInstance";
import qs from "qs";

export const getMostRentedProducts = async (
  start = "",
  end = "",
  limit = 20
) => {
  const params = {
    start,
    end,
    limit,
  };
  const response = await axiosInstance.get("/analytics/rented", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};

export const getProductBalanceById = async (id) => {
  const response = await axiosInstance.get(`/analytics/balance/${id}`);
  return response.data;
};

const dataMock = {
  monthly_avg: [
    {
      month: "Enero",
      monthly_average: 0.0,
    },
    {
      month: "Febrero",
      monthly_average: 0.0,
    },
    {
      month: "Marzo",
      monthly_average: 0.0,
    },
    {
      month: "Abril",
      monthly_average: 0.0,
    },
    {
      month: "Mayo",
      monthly_average: 0.0,
    },
    {
      month: "Junio",
      monthly_average: 0.0,
    },
    {
      month: "Julio",
      monthly_average: 5.0,
    },
    {
      month: "Agosto",
      monthly_average: 16.0,
    },
    {
      month: "Septiembre",
      monthly_average: 4.5,
    },
    {
      month: "Octubre",
      monthly_average: 0.1,
    },
    {
      month: "Noviembre",
      monthly_average: 0.0,
    },
    {
      month: "Diciembre",
      monthly_average: 0.0,
    },
  ],
};

export const getMonthProjectsBalance = async (years = 1) => {
  const params = {
    years,
  };
  const response = await axiosInstance.get(`/analytics/monthly/projects`, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};
