import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8080/project";

/*Proyecto meramente de prueba en memoria para retornar cuando se pide uno por id */
const projectById = {
  project_id: 1,
  name: "Test Project",
  description: "This project is for testing purposes",
  start_date: "2025-04-12",
  end_date: "2025-05-12",
  event: {
    event_id: 1,
    name: "event 1",
    address: "false street 123",
    distance: 10,
    description: "Very fun musical event",
  },
  client: null,
  status: "PLANNED",
  payment_status: "NO_BILL",
  project_type: "SERVICE",
  cost_addition: 0.5,
};

/*Fin proyecto por id */

export const createProject = async (data) => {
  /*const response = await axios.post(BASE_URL, data);
  return response.data;*/

  toast(
    "Se ha creado correctamente el proyecto. En la consola están los datos"
  );
  console.log(data);
  return data;
};

export const updateProject = async (id, data) => {
  /*const response = await axios.put(BASE_URL + "/" + id, data);
  return response.data;*/

  toast(
    "Se ha modificado correctamente el proyecto. En la consola están los datos"
  );
  console.log(data);
  return data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  return response.data;
};

export const getProjectById = async (id) => {
  /*const response = await axios.get(BASE_URL + "/" + id);
  return response.data;*/

  return projectById; //Testing
};

//Tener en cuenta que el getAll de proyectos será algo así, NO HACER AÚN
/*
export const getAllProducts = async (page = 1, size = 10, tags = [], sortBy = "id", direction = "asc") => {
  const params = {
    page,
    size,
  };

  if (tags.length > 0) {
    params.tags = tags.map((t) => t.tag_id).join(",");
  }

  if (sortBy) {
    params.sortBy = sortBy;
    params.direction = direction;
  }

  console.log(`${BASE_URL}/all`, { params });

  const response = await axios.get(`${BASE_URL}/all`, { params });
  return response.data;
};*/
