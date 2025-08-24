import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { returnItemById } from "../../services/itemApiService";
import { updateItemLocationAndStatus } from "../../features/items/ItemSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useReturnItemById = () => {
  const dispatch = useDispatch();

  const fetchReturnItemById = useCallback(
    async (id) => {
      try {
        const data = await returnItemById(id);
        console.log("ESTA ES LA DATA", data);
        dispatch(updateItemLocationAndStatus(data));
        showToast("Se ha retornado el artículo correctamente.");
      } catch (error) {
        const msj =
          error.response?.data?.message || "Ocurrió un error inesperado";
        console.error("Error al retornar el item:", msj);
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { fetchReturnItemById };
};

export default useReturnItemById;
