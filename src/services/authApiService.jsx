import axios from "axios";

const BASE_URL = "http://localhost:8080/user";
//const BASE_URL = '/api/user';

/*export const login = async (mail, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        email: mail,
        name: "Marcos",
        token: "TOKEN2716",
      };
      resolve(response);
    }, 1000);
  });
};*/

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
};
