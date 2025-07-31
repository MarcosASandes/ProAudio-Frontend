import axios from "axios";

const BASE_URL = "http://localhost:8080/product/project";

export const deleteProductProject = async (id) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  return response.data;
};

export const addProductToProject = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};