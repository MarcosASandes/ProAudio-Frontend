import axios from "axios";
import {
  getAllTagsFake,
  getTagByIdFake,
  deleteTagByIdFake,
  createTagFake,
  updateTagFake
} from "./../utils/fakeTagService";

const BASE_URL = "http://localhost:8080/tag"; // Reemplaza con la URL real

/* Representación en memoria de los datos traídos por API */

/*export const getAllTags = async () => {
  const response = await axios.get(BASE_URL + "/all");
  return response.data;
};

export const getTagById = async (id) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

export const deleteTagById = async (tagId) => {
  const response = await axios.delete(BASE_URL + "/" + tagId);
  return response.data;
};

export const createTag = async (tagData) => {
  const response = await axios.post(BASE_URL, tagData);
  return response.data;
};

export const updateTag = async (tagId, tagData) => {
  const response = await axios.put(BASE_URL + "/" + tagId, tagData);
  console.log("RESPONSE: ");
  console.log(response);

  return response.data;
};*/



/*--*/

export const getAllTags = async () => {
  return getAllTagsFake();
};

export const getTagById = async (id) => {
  return getTagByIdFake(id);
};

export const deleteTagById = async (tagId) => {
  return deleteTagByIdFake(tagId);
};

export const createTag = async (tagData) => {
  return createTagFake(tagData);
};

export const updateTag = async (tagId, tagData) => {
  return updateTagFake(tagId, tagData);
};
