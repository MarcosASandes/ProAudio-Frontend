import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../services/clientApiService";
import { fetchClientsSuccess, fetchClientsStart, fetchClientsFailure } from "../../features/clients/ClientSlice";

const useGetAllClients = (
  page,
  size,
  sortBy,
  direction,
  status = "",
  name = ""
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClients = async () => {
      dispatch(fetchClientsStart());
      try {
        const data = await getAllClients(
          page,
          size,
          sortBy,
          direction,
          status,
          name
        );
        dispatch(fetchClientsSuccess(data));
      } catch (error) {
        dispatch(
          fetchClientsFailure(error.message || "Error al cargar clientes")
        );
      }
    };

    fetchClients();
  }, [dispatch, page, size, sortBy, direction, status, name]);
};

export default useGetAllClients;
