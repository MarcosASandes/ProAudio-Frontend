import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getProjectById } from "../../services/projectApiService";
import { setSelectedProject } from "../../features/projects/ProjectSlice";

const useGetProjectById = () => {
  const dispatch = useDispatch();

  const fetchProjectById = useCallback(async (id) => {
    try {
      const data = await getProjectById(id);
      dispatch(setSelectedProject(data));
    } catch (error) {
      console.error("Error al obtener el proyecto:", error.message);
    }
  }, [dispatch]);

  return { fetchProjectById };
};

export default useGetProjectById;
