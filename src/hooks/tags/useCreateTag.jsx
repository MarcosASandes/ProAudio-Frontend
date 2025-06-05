import { useCallback } from "react";
import { createTag } from "../../services/tagApiService";
import { toast } from "react-toastify";
import { addTag } from "../../features/tags/tagSlice";
import { useDispatch } from "react-redux";

export function useCreateTag() {
  const dispatch = useDispatch();
  const handleCreateTag = useCallback(async (formData, onSuccess) => {
    const newTag = {
      name: formData.name,
      father_id: formData.father_id ?? null, // por si no se seleccionó padre
      description: formData.description,
      status: "ENABLED",
    };

    try {
      const created = await createTag(newTag);
      dispatch(addTag(created));
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al crear etiqueta:", error);
      toast.error("Error al crear la etiqueta ❌");
    }
  }, []);

  return handleCreateTag;
}
