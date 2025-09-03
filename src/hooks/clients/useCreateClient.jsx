import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { createClient } from "../../services/clientApiService";
import { addClient, fetchClientsStart, fetchClientsFailure } from "../../features/clients/ClientSlice";

const useCreateClient = () => {
  const dispatch = useDispatch();

  const clientCreation = useCallback(
    async (payload) => {
      dispatch(fetchClientsStart());
      try {
        const data = {
          name: payload.name,
          phone_number: payload.phone,
          email: payload.email,
          address: payload.address,
          details: payload.details
        }
        const response = await createClient(data);
        dispatch(addClient(response));
        showToast("Cliente creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchClientsFailure(error.message));
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
        return null;
      }
    },
    [dispatch]
  );

  return { clientCreation };
};

export default useCreateClient;