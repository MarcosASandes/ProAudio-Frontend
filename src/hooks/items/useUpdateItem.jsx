import { useCallback } from "react";
import { updateItemById } from "../../services/itemApiService";
import { toast } from "react-toastify";

const useUpdateItem = () => {
  const updateItem = useCallback(async (id, payload) => {
    try {
      await updateItemById(id, payload);
      toast.success("Artículo actualizado correctamente");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el artículo");
      return false;
    }
  }, []);

  return { updateItem };
};

export default useUpdateItem;
