import { useCallback } from "react";
import { updateTag } from "../../services/tagApiService";
import { updateTagInStore } from "../../features/tags/tagSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";

export function useUpdateTag() {
  const dispatch = useDispatch();
  const handleUpdateTag = useCallback(async (tagId, formData, onSuccess) => {
    const updatedTag = {
      name: formData.name,
      father_id: formData.father_id ?? null,
      description: formData.description,
      status: formData.status
    };

    try {
      const updated = await updateTag(tagId, updatedTag);
      if (onSuccess) onSuccess();
      dispatch(updateTagInStore(updated));
      showToast("La etiqueta se ha modificado con éxito.");
    } catch (error) {
      console.error("Error al actualizar etiqueta:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  }, []);

  return handleUpdateTag;
}
