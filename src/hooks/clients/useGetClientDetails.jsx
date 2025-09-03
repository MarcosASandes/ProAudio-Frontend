import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getClientDetails } from "../../services/clientApiService";
import { setSelectedClientDetails } from "../../features/clients/ClientSlice";

const useGetClientDetails = () => {
  const dispatch = useDispatch();

  const fetchClientDetails = useCallback(async (id) => {
    try {
      const data = await getClientDetails(id);
      dispatch(setSelectedClientDetails(data));
    } catch (error) {
      console.error("Error al obtener el detalle del cliente:", error);
    }
  }, [dispatch]);

  return { fetchClientDetails };
};

export default useGetClientDetails;
