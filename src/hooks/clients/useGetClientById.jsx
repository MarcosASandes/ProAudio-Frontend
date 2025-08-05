import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getClientById } from "../../services/clientApiService";
import { setSelectedClient } from "../../features/clients/ClientSlice";

const useGetClientById = () => {
  const dispatch = useDispatch();

  const fetchClientById = useCallback(async (id) => {
    try {
      const data = await getClientById(id);
      dispatch(setSelectedClient(data));
    } catch (error) {
      console.error("Error al obtener el cliente:", error.message);
    }
  }, [dispatch]);

  return { fetchClientById };
};

export default useGetClientById;