import axiosInstance from './axiosInstance';
import qs from 'qs';


const mockData = {
  enero: 1,
  febrero: 1,
  marzo: 3,
  abril: 4,
  mayo: 7,
  junio: 7,
  julio: 9,
  agosto: 5,
  setiembre: 3,
  octubre: 2,
  noviembre: 1,
  diciembre: 1,
};


export const getMostRentedProducts = async (
  start = "",
  end = "",
  limit = 20,
) => {
  const params = {
    start,
    end,
    limit,
  };
  const response = await axiosInstance.get('/analytics/rented', {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  console.log("Esta es la data que me llega: ", response.data);

  return response.data;
};

export const getProductBalanceById = async (id) => {
  const response = await axiosInstance.get(`/analytics/balance/${id}`);
  return response.data;
};

export const getMonthProjectsBalance = async (filter) => {
  /*const response = await axiosInstance.get(`/analytics/monthly/projects/${filter}`);
  return response.data;*/
  return mockData;
};

