import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getItemStatusesById } from "../../services/itemApiService";
import { setStatusesById } from "../../features/items/ItemSlice";

const useGetItemStatusesById = () => {
  const dispatch = useDispatch();

  const fetchStatusesByItemId = useCallback(async (id) => {
    try {
      const data = await getItemStatusesById(id);
      dispatch(setStatusesById(data));
    } catch (error) {
      console.error("Error al obtener los estados:", error.message);
    }
  }, [dispatch]);

  return { fetchStatusesByItemId };
};

export default useGetItemStatusesById;