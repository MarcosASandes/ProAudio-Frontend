import axios from "axios";
import { toast } from "react-toastify";
import qs from "qs";

const BASE_URL = "http://localhost:8080/project";

export const createProject = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await axios.put(BASE_URL + "/" + id, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

export const getProjectDetails = async (id) => {
  const response = await axios.get(BASE_URL + "/details/" + id);
  return response.data;
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

/*export const getBudgetPdfByProjectId = async (id) => {
  const response = await axios.post(`${BASE_URL}/${id}/budget`, {
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
  });

  const pdfUrl = URL.createObjectURL(response.data);
  return pdfUrl;
};*/

export const getBudgetPdfByProjectId = async (id) => {
  const response = await axios.post(
    `${BASE_URL}/${id}/budget`,
    {}, // body vacío (o los datos si corresponde)
    {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    }
  );

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

/**
 * Obtiene proyectos paginados con filtros.
 * @param {number} page - Página (empieza en 1).
 * @param {number} size - Tamaño de página.
 * @param {string} sortBy - Campo de ordenamiento (por defecto "start_date").
 * @param {string} direction - Dirección ("asc" o "desc").
 * @param {Array<string>} filterStatus - Estados de proyecto a filtrar.
 * @param {string} filterPaymentStatus - Estado de pago a filtrar.
 * @param {string} name - Nombre del proyecto a buscar.
 * @returns {Promise<Object>} Respuesta con { projects, pageable }.
 */
export const getAllProjects = async (
  page = 1,
  size = 10,
  sortBy = "start_date",
  direction = "asc",
  filterStatus = ["PLANNED", "CONFIRMED", "ON_COURSE"],
  filterPaymentStatus = "",
  name = ""
) => {
  const params = {
    page: page - 1, // el backend empieza en 0
    size,
    sortBy,
    direction,
  };

  if (filterStatus.length > 0) {
    params.filterStatus = filterStatus;
  }

  if (filterPaymentStatus) {
    params.filterPaymentStatus = filterPaymentStatus;
  }

  if (name) {
    params.name = name;
  }

  console.log(`${BASE_URL}/all`, { params });
  const response = await axios.get(`${BASE_URL}/all`, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

export const getProductsInProject = async (id) => {
  const response = await axios.get(BASE_URL + "/" + id + "/products");
  return response.data;
};

/*export const deleteProductProject = async (id) => {
  const response = await axios.delete("http://localhost:8080/product/project/" + id);
  return response.data;
};

export const addProductToProject = async (data) => {
  const response = await axios.post("http://localhost:8080/product/project", data);
  return response.data;
};*/

export const exitItemToProject = async (idProject, idItem) => {
  console.log(`En el método exitItemToProject llegan los IDs: - Proyecto: ${idProject} - Item: ${idItem}`);
  const response = await axios.post(BASE_URL + "/" + idProject + "/item/" + idItem + "/exit");
  console.log("Luego de hacer la petición llega esto: ", response);
  return response.data;
};

export const getOutletItemsByProjectId = async (id) => {
  const response = await axios.get(BASE_URL + "/" + id + "/items");
  return response.data;
};

export const deleteOutletItemInProject = async (idProject, idItem) => {
  const response = await axios.delete(BASE_URL + "/" + idProject + "/item/" + idItem + "/delete");
  return response.data;
};

export const returnItemToDeposit = async (idProject, idItem) => {
  const response = await axios.post(BASE_URL + "/" + idProject + "/item/" + idItem + "/return");
  return response.data;
};