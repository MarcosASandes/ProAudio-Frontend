import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../services/projectApiService";
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
} from "../../features/projects/ProjectSlice";

const useGetAllProjects = (page, size, tags, sortBy, direction) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(fetchProjectsStart());
      try {
        const data = await getAllProjects(page, size, tags, sortBy, direction);
        dispatch(fetchProjectsSuccess(data));
      } catch (error) {
        dispatch(fetchProjectsFailure(error.message || "Error al cargar proyectos"));
      }
    };

    fetchProjects();
  }, [dispatch, page, size, tags, sortBy, direction]);
};

export default useGetAllProjects;
