import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { updateClient } from "../../services/clientApiService";
import { updateClientInStore, fetchClientsStart, fetchClientsFailure } from "../../features/clients/ClientSlice";

const useUpdateClient = () => {
  const dispatch = useDispatch();

  const updateClientFetch = useCallback(async (id, payload) => {
    dispatch(fetchClientsStart());
    try {
      const updated = await updateClient(id, payload);
      dispatch(updateClientInStore(updated));
      showToast("Cliente actualizado correctamente");
      return updated;
    } catch (error) {
      dispatch(fetchClientsFailure(error.message));
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  }, [dispatch]);

  return { updateClientFetch };
};

export default useUpdateClient;