import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  createItemsStart,
  createItemsSuccess,
  createItemsFailure,
} from "../../features/items/ItemSlice";
import { createItems } from "../../services/itemApiService";
import { showToast, showToastError } from "../../utils/toastUtils";

const useCreateItems = () => {
  const dispatch = useDispatch();

  const itemsCreation = useCallback(async (payload) => {
    dispatch(createItemsStart());
    try {
      const response = await createItems(payload);
      dispatch(createItemsSuccess(response));
      showToast("Items creados correctamente");
      return response;
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      dispatch(createItemsFailure(error.message));
      showToastError(msj);
    }
  }, [dispatch]);

  return { itemsCreation };
};

export default useCreateItems;
