import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getOutletItemsByProjectId } from "../../services/projectApiService";
import {
  setOutletItemsInStore,
  setReturnItemsInStore,
} from "../../features/projects/ProjectSlice";

const useGetOutletItemsByProjectId = () => {
  const dispatch = useDispatch();

  const fetchAllOutletItemsInProject = useCallback(
    async (id) => {
      try {
        const data = await getOutletItemsByProjectId(id);

        const items = data.items || [];

        const itemsReturned = items.filter(
          (obj) => obj.item_location === "IN_DEPOSIT"
        );
        const itemsNotReturned = items.filter(
          (obj) => obj.item_location !== "IN_DEPOSIT"
        );

        dispatch(setReturnItemsInStore(itemsReturned));
        dispatch(setOutletItemsInStore(itemsNotReturned));
      } catch (error) {
        console.error("Error al obtener los artículos:", error.message);
      }
    },
    [dispatch]
  );

  return { fetchAllOutletItemsInProject };
};

export default useGetOutletItemsByProjectId;
