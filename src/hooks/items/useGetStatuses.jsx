import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStatuses } from "../../services/itemApiService";
import {
  setStatuses,
  clearStatuses,
} from "../../features/items/ItemSlice";

const useGetStatuses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await getStatuses();
        dispatch(setStatuses(response));
      } catch (error) {
        console.error("Error fetching statuses:", error);
        dispatch(clearStatuses());
      }
    };

    fetchStatuses();

    // Limpieza opcional
    return () => dispatch(clearStatuses());
  }, [dispatch]);
};

export default useGetStatuses;
