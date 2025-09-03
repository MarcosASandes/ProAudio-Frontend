import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { deleteClient } from "../../services/clientApiService";
import { removeClient } from "../../features/clients/ClientSlice";

const useDeleteClient = () => {
  const dispatch = useDispatch();

  const handleDeleteClient = async (id) => {
    try {
      const deletedClient = await deleteClient(id);
      dispatch(removeClient(deletedClient.client_id));
      showToast("Cliente eliminado correctamente.");
      return true;
    } catch (error) {
      console.error("Error eliminando el cliente:", error.message);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
      return false;
    }
  };

  return handleDeleteClient;
};

export default useDeleteClient;
