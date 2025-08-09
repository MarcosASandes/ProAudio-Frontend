import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../services/clientApiService";
import { fetchClientsSuccess, fetchClientsStart, fetchClientsFailure } from "../../features/clients/ClientSlice";

/**
 * Hook para obtener clientes con filtros y paginación.
 * @param {number} page - Página actual (comienza en 1 en frontend).
 * @param {number} size - Cantidad de elementos por página.
 * @param {string} sortBy - Campo por el cual ordenar.
 * @param {string} direction - Dirección del ordenamiento (asc o desc).
 * @param {string} status - Estado del cliente (enabled, disabled o vacío para todos).
 * @param {string} name - Filtro por nombre de cliente.
 */
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
