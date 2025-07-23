import { useCallback } from "react";
import { updateItemById } from "../../services/itemApiService";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";

const useUpdateItem = () => {
  const updateItem = useCallback(async (id, payload) => {
    try {
      await updateItemById(id, payload);
      showToast("Artículo actualizado correctamente");
      return true;
    } catch (error) {
      console.error(error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
      return false;
    }
  }, []);

  return { updateItem };
};

export default useUpdateItem;
