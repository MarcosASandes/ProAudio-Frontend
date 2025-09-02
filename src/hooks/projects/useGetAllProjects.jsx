import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../services/projectApiService";
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
} from "../../features/projects/ProjectSlice";

const useGetAllProjects = (
  page,
  size,
  sortBy,
  direction,
  filterStatus = [],
  filterPaymentStatus = "",
  name = ""
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(fetchProjectsStart());
      try {
        const data = await getAllProjects(
          page,
          size,
          sortBy,
          direction,
          filterStatus,
          filterPaymentStatus,
          name
        );
        dispatch(fetchProjectsSuccess(data));
      } catch (error) {
        dispatch(fetchProjectsFailure(error.message || "Error al cargar proyectos"));
      }
    };

    fetchProjects();
  }, [dispatch, page, size, sortBy, direction, filterStatus, filterPaymentStatus, name]);
};

export default useGetAllProjects;