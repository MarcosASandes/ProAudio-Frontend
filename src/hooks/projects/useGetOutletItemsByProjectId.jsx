import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getOutletItemsByProjectId } from "../../services/projectApiService";
import { setOutletItemsInStore } from "../../features/projects/ProjectSlice";

const useGetOutletItemsByProjectId = () => {
  const dispatch = useDispatch();

  const fetchAllOutletItemsInProject = useCallback(async (id) => {
    try {
      const data = await getOutletItemsByProjectId(id);
      dispatch(setOutletItemsInStore(data));
    } catch (error) {
      console.error("Error al obtener los artículos:", error.message);
    }
  }, [dispatch]);

  return { fetchAllOutletItemsInProject };
};

export default useGetOutletItemsByProjectId;