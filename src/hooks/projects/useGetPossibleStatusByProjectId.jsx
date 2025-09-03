import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getProjectStatusByProjectId } from "../../services/projectApiService";
import { setProjectStatusInStore } from "../../features/projects/ProjectSlice";

const useGetPossibleStatusByProjectId = () => {
  const dispatch = useDispatch();

  const fetchProjectStatusByProjectId = useCallback(async (id) => {
    try {
      const data = await getProjectStatusByProjectId(id);
      dispatch(setProjectStatusInStore(data));
    } catch (error) {
      console.error("Error al obtener los estados del proyecto:", error.message);
    }
  }, [dispatch]);

  return { fetchProjectStatusByProjectId };
};

export default useGetPossibleStatusByProjectId;
