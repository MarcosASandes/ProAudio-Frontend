/*
VERSIÓN NO CENTRALIZADA

import axios from "axios";

const BASE_URL = "http://localhost:8080/product/project";
//const BASE_URL = "/api/product/project";

export const deleteProductProject = async (id) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  return response.data;
};

export const addProductToProject = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};*/


/*---------------------------------- */


import axiosInstance from './axiosInstance';

export const deleteProductProject = async (id) => {
  const response = await axiosInstance.delete(`/product/project/${id}`);
  return response.data;
};

export const addProductToProject = async (data) => {
  const response = await axiosInstance.post('/product/project', data);
  return response.data;
};