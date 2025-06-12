import { useCallback } from "react";
import { toast } from "react-toastify";
import { deleteTagById } from "../../services/tagApiService";
import { updateTagInStore } from "../../features/tags/TagSlice";
import { useDispatch } from "react-redux";
import { deleteTagStore } from "../../features/tags/TagSlice";

const useDeleteTag = () => {
  const dispatch = useDispatch();
  const deleteTag = useCallback(async (tagId) => {
    try {
      const deleted = await deleteTagById(tagId);  // aquí consumes la respuesta, pero no la usas
      dispatch(deleteTagStore(tagId));
      toast.success("Etiqueta eliminada correctamente");
      return true;  // solo indico éxito
    } catch (error) {
      toast.error(error.response.data.message || "Error al eliminar la etiqueta");
      return false;  // indico fallo
    }
  }, []);

  return deleteTag;
};

export default useDeleteTag;
