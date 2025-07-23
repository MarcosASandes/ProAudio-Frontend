import { useCallback } from "react";
import { toast } from "react-toastify";
import { deleteTagById } from "../../services/tagApiService";
import { updateTagInStore } from "../../features/tags/tagSlice";
import { useDispatch } from "react-redux";
import { deleteTagStore } from "../../features/tags/tagSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteTag = () => {
  const dispatch = useDispatch();
  const deleteTag = useCallback(async (tagId) => {
    try {
      const deleted = await deleteTagById(tagId);  // aquí consumes la respuesta, pero no la usas
      dispatch(deleteTagStore(tagId));
      showToast("Etiqueta eliminada correctamente");
      return true;  // solo indico éxito
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
      return false;  // indico fallo
    }
  }, []);

  return deleteTag;
};

export default useDeleteTag;
