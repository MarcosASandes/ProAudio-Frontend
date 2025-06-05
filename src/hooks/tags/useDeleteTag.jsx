import { useCallback } from "react";
import { toast } from "react-toastify";
import { deleteTagById } from "../../services/tagApiService";
import { updateTagInStore } from "../../features/tags/tagSlice";
import { useDispatch } from "react-redux";

const useDeleteTag = () => {
  const dispatch = useDispatch();
  const deleteTag = useCallback(async (tagId) => {
    try {
      const deleted = await deleteTagById(tagId);  // aquí consumes la respuesta, pero no la usas
      dispatch(updateTagInStore(deleted));
      toast.success("Etiqueta eliminada correctamente");
      return true;  // solo indico éxito
    } catch (error) {
      toast.error(error.message || "Error al eliminar la etiqueta");
      return false;  // indico fallo
    }
  }, []);

  return deleteTag;
};

export default useDeleteTag;
