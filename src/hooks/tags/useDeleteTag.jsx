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
      const deleted = await deleteTagById(tagId);
      dispatch(deleteTagStore(tagId));
      showToast("Etiqueta eliminada correctamente");
      return true; 
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
      return false;
    }
  }, []);

  return deleteTag;
};

export default useDeleteTag;
