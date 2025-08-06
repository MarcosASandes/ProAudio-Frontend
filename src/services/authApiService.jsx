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

export const logout = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};