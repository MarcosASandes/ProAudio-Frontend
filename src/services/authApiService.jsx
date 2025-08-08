/*
VERSION NO CENTRALIZADA

import axios from "axios";

const BASE_URL = "http://localhost:8080/user";
//const BASE_URL = '/api/user';

export const login = async (data) => {
  const response = await axios.post(BASE_URL + "/login", data);
  return response.data;
};

export const logout = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};*/


/*--------------------------------------- */


import axiosInstance from './axiosInstance';

export const login = async (data) => {
  const response = await axiosInstance.post('/user/login', data);
  return response.data;
};

export const forgotPassword = async (email) => {
  //const response = await axiosInstance.post('/user/forgot/password?email=' + email);
  const response = await axiosInstance.post(`/user/forgot/password?email=${encodeURIComponent(email)}`);
  return response;
};

/*export const changePasswordWithToken = async (data) => {
    console.log("Así queda la data: ", data);
  const response = await axiosInstance.post('/user/reset/password', data);
  return response.data;
};*/

export const changePasswordWithToken = async (data) => {
    console.log("Así queda la data: ", data);
  const response = await axiosInstance.post('/user/reset/password', data);
  return response;
};

export const changePasswordLogged = async (data) => {
  const response = await axiosInstance.post('/user/change/password', data);
  return response.data;
};

export const logout = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};