import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";
//const BASE_URL = '/api/auth';

export const login = async (mail, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        email: mail,
        name: "Marcos",
        token: "TOKEN2716",
      };
      resolve(response);
    }, 1000); // Simula 1 segundo de espera como si fuera una llamada real
  });

  /*const response = await axios.get(`${BASE_URL}`, {
    params: { page, size },
  });
  return response.data;*/
};

export const logout = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
