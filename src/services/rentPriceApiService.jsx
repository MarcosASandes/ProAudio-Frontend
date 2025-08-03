import axios from "axios";

const BASE_URL = "http://localhost:8080/price"; 
//const BASE_URL = "/api/price";

export const getProductPrices = async (id) => {
  const response = await axios.get(BASE_URL + "/product/" + id);
  return response.data;
};