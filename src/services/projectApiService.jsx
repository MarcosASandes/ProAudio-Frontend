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

/*Proyecto meramente de prueba en memoria para retornar cuando se pide uno por details */
const projectByDetails = {
  project_id: 1,
  name: "Test Project Details",
  description: "This project is for testing purposes Details",
  start_date: "2025-04-12",
  end_date: "2025-05-12",
  total: 1567,
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
  products: [
    {
      product_id: 20,
      model: "EXTENSE XD",
      status: "UNUSED",
      price_value: 120,
      amount: 3,
    },
    {
      product_id: 23,
      model: "EXTENSE MEGA XD",
      status: "ACTIVE",
      price_value: 200,
      amount: 2,
    },
    {
      product_id: 12,
      model: "MEGA IN-EAR XDDD",
      status: "ACTIVE",
      price_value: 50,
      amount: 12,
    },
  ],
  expenses: [
    {
      type: "PERSONNEL",
      value: 150,
      description: "Paid for his service",
    },
    {
      type: "EXTRA_COST",
      value: 50,
      description: "Transport",
    },
  ],
};
/*Fin proyecto por details */

/*Listado de proyectos de prueba para retornar algo */

const projectList = {
  projects: [
    {
      project_id: 1,
      project_type: "SERVICE",
      name: "Proyecto Test 1",
      event_name: "Evento de proyecto test 1",
      date_start_end: "10/04/25 - 12/04/25",
      client_name: "Marcos",
      status: "PLANNED",
    },
    {
      project_id: 2,
      project_type: "RENT",
      name: "Proyecto Test 2",
      event_name: "Evento de proyecto test 2",
      date_start_end: "14/05/25 - 12/06/25",
      client_name: "Mateo",
      status: "CONFIRMED",
    },
    {
      project_id: 3,
      project_type: "RENT",
      name: "Proyecto Test 3",
      event_name: "Evento de proyecto test 3",
      date_start_end: "15/05/25 - 15/06/25",
      client_name: "Marcos",
      status: "COMPLETED",
    },
  ],
  pageable: {
    page_number: 1,
    page_size: 10,
    total_pages: 1,
    total_elements: 3,
    has_next: false,
    has_previous: false,
  },
};

/*Fin de listado de proyectos de prueba */

export const createProject = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;

  /*toast(
    "Se ha creado correctamente el proyecto. En la consola están los datos"
  );
  console.log(data);
  return data;*/
};

export const updateProject = async (id, data) => {
  console.log("Estos son los datos enviados del update: ", data);
  const response = await axios.put(BASE_URL + "/" + id, data);
  return response.data;

  /*toast(
    "Se ha modificado correctamente el proyecto. En la consola están los datos"
  );
  console.log(data);
  return data;*/
};

export const deleteProject = async (id) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;

  //return projectById; //Testing
};

export const getProjectDetails = async (id) => {
  const response = await axios.get(BASE_URL + "/details/" + id);
  return response.data;

  //return projectByDetails; //Testing
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

export const getAllProjects = async () => {
  return projectList;
};


export const getProjectTypes = async () => {
  const response = await axios.get(BASE_URL + "/types");
  return response.data;
};

export const getProjectStatusByProjectId = async (id) => {
  const response = await axios.get(BASE_URL + "/possible/status/" + id);
  return response.data;
};

export const getStartingProjectStatus = async () => {
  const response = await axios.get(BASE_URL + "/possible/status");
  return response.data;
};

export const getPossiblePaymentStatusByProjectId = async (id) => {
  console.log("coso pum");
  const response = await axios.get(BASE_URL + "/possible/payment/status/" + id);
  return response.data;
};


export const getBudgetPdfByProjectId = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}/budget-pdf`, {
    responseType: 'blob',
    headers: {
      Accept: 'application/pdf',
    },
  });

  const pdfUrl = URL.createObjectURL(response.data);
  return pdfUrl;
};


export const getAllStatuses = async () => {
  const response = await axios.get(BASE_URL + "/status/all");
  return response.data;
};

export const getAllPaymentStatuses = async () => {
  const response = await axios.get(BASE_URL + "/payment/status/all");
  return response.data;
};

export const getAllRunningStatuses = async () => {
  const response = await axios.get(BASE_URL + "/running/status/all");
  return response.data;
};
