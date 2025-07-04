import axios from 'axios';

const BASE_URL = 'http://localhost:8080/project';


export const createProject = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await axios.put(BASE_URL + '/' + id, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(BASE_URL + '/' + id);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(BASE_URL + '/' + id);
  return response.data;
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













