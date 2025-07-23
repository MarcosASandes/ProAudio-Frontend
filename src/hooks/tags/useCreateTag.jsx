import { useCallback } from "react";
import { createTag } from "../../services/tagApiService";
import { toast } from "react-toastify";
import { addTag } from "../../features/tags/tagSlice";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";

export function useCreateTag() {
  const dispatch = useDispatch();
  const handleCreateTag = useCallback(async (formData, onSuccess) => {
    const newTag = {
      name: formData.name,
      father_id: formData.father_id ?? null, 
      description: formData.description,
      status: "ENABLED",
    };

    try {
      const created = await createTag(newTag);
      dispatch(addTag(created));
      showToast("Se ha creado la etiqueta correctamente.");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al crear etiqueta:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  }, []);

  return handleCreateTag;
}
