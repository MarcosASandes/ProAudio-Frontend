import { useCallback } from "react";
import { updateTag } from "../../services/tagApiService";
import { updateTagInStore } from "../../features/tags/tagSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

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
      console.log("UPDATED: ");
      console.log(updated);
      if (onSuccess) onSuccess();
      dispatch(updateTagInStore(updated));
    } catch (error) {
      console.error("Error al actualizar etiqueta:", error);
      toast.error("Error: " + error.response.data.message);
    }
  }, []);

  return handleUpdateTag;
}
