import axiosInstance from './axiosInstance';
import qs from 'qs';

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

  return response.data;
};