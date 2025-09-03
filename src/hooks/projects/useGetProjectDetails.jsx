import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getProjectDetails } from "../../services/projectApiService";
import { setSelectedProjectDetails } from "../../features/projects/ProjectSlice";

const useGetProjectDetails = () => {
  const dispatch = useDispatch();

  const fetchProjectDetails = useCallback(async (id) => {
    try {
      const data = await getProjectDetails(id);
      dispatch(setSelectedProjectDetails(data));
    } catch (error) {
      console.error("Error al obtener el proyecto:", error);
    }
  }, [dispatch]);

  return { fetchProjectDetails };
};

export default useGetProjectDetails;
