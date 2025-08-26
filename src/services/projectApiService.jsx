import axiosInstance from './axiosInstance';
import qs from 'qs';

export const createProject = async (data) => {
  console.log("Proyecto que se creará: ", data);
  const response = await axiosInstance.post('/project', data);
  console.log("Proyecto que se creó: ", response);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await axiosInstance.put(`/project/${id}`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axiosInstance.delete(`/project/${id}`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axiosInstance.get(`/project/${id}`);
  return response.data;
};

export const getProjectDetails = async (id) => {
  const response = await axiosInstance.get(`/project/details/${id}`);
  return response.data;
};

export const getProjectTypes = async () => {
  const response = await axiosInstance.get('/project/types');
  return response.data;
};

export const getProjectStatusByProjectId = async (id) => {
  const response = await axiosInstance.get(`/project/possible/status/${id}`);
  return response.data;
};

export const getStartingProjectStatus = async () => {
  const response = await axiosInstance.get('/project/possible/status');
  return response.data;
};

export const getPossiblePaymentStatusByProjectId = async (id) => {
  const response = await axiosInstance.get(`/project/possible/payment/status/${id}`);
  return response.data;
};

export const getBudgetPdfByProjectId = async (id) => {
  const response = await axiosInstance.post(
    `/project/${id}/budget`,
    {},
    {
      responseType: 'blob',
      headers: { Accept: 'application/pdf' },
    }
  );
  console.log(response);

  const pdfUrl = URL.createObjectURL(response.data);
  return pdfUrl;
};

export const getAllStatuses = async () => {
  const response = await axiosInstance.get('/project/status/all');
  return response.data;
};

export const getAllPaymentStatuses = async () => {
  const response = await axiosInstance.get('/project/payment/status/all');
  return response.data;
};

export const getAllRunningStatuses = async () => {
  const response = await axiosInstance.get('/project/running/status/all');
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
  sortBy = 'start_date',
  direction = 'asc',
  filterStatus = ['PLANNED', 'CONFIRMED', 'ON_COURSE'],
  filterPaymentStatus = '',
  name = ''
) => {
  const params = {
    page: page - 1, // backend empieza en 0
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

  console.log('/project/all', { params });

  const response = await axiosInstance.get('/project/all', {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  return response.data;
};

export const getProductsInProject = async (id) => {
  const response = await axiosInstance.get(`/project/${id}/products`);
  return response.data;
};

export const exitItemToProject = async (idProject, idItem) => {
  const response = await axiosInstance.post(`/project/${idProject}/item/${idItem}/exit`);
  return response.data;
};

export const getOutletItemsByProjectId = async (id) => {
  const response = await axiosInstance.get(`/project/${id}/items`);
  return response.data;
};

export const deleteOutletItemInProject = async (idProject, idItem) => {
  const response = await axiosInstance.delete(`/project/${idProject}/item/${idItem}/delete`);
  return response.data;
};

export const returnItemToDeposit = async (idProject, idItem) => {
  const response = await axiosInstance.post(`/project/${idProject}/item/${idItem}/return`);
  return response.data;
};