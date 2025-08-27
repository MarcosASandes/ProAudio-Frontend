import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../services/projectApiService";
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
} from "../../features/projects/ProjectSlice";

/**
 * Hook para obtener proyectos con filtros y paginación.
 * @param {number} page - Página actual (comienza en 1).
 * @param {number} size - Cantidad de elementos por página.
 * @param {string} sortBy - Campo por el cual ordenar.
 * @param {string} direction - Dirección del ordenamiento (asc o desc).
 * @param {Array<string>} filterStatus - Filtro por estados.
 * @param {string} filterPaymentStatus - Filtro por estado de pago.
 * @param {string} name - Filtro por nombre de proyecto.
 */
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