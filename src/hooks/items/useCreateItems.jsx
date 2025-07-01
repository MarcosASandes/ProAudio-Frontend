import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  createItemsStart,
  createItemsSuccess,
  createItemsFailure,
} from "../../features/items/ItemSlice";
import { toast } from "react-toastify";
import { createItems } from "../../services/itemApiService";

const useCreateItems = () => {
  const dispatch = useDispatch();

  const itemsCreation = useCallback(async (payload) => {
    dispatch(createItemsStart());
    try {
      const response = await createItems(payload);
      dispatch(createItemsSuccess(response));
      toast.success("Items creados correctamente");
      return response;
    } catch (error) {
      dispatch(createItemsFailure(error.message));
      toast.error("Error al crear items");
    }
  }, [dispatch]);

  return { itemsCreation };
};

export default useCreateItems;
