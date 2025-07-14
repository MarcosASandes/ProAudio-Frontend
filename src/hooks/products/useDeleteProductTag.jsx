import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeDescriptionTagInStore, removeRelationTagInStore, removeDependencyTagInStore } from "../../features/products/ProductSlice";
import { deleteProductTag } from "../../services/productApiService";
import { toast } from "react-toastify";

export function useDeleteProductTag() {
  const dispatch = useDispatch();

  const handleDeleteProductTag = useCallback(
    async (productId, tagId, type) => {
      try {
        const deletedTag = await deleteProductTag(productId, tagId, type);

        if (type === "DESCRIPTIVE") {
          dispatch(removeDescriptionTagInStore(deletedTag));
        } else if (type === "RELATION") {
          dispatch(removeRelationTagInStore(deletedTag));
        } else if (type === "DEPENDENCY") {
          dispatch(removeDependencyTagInStore(deletedTag));
        }

        toast.success("Etiqueta eliminada correctamente ✅");
      } catch (error) {
        console.error("Error al eliminar etiqueta:", error);
        toast.error("Error al eliminar etiqueta ❌");
      }
    },
    [dispatch]
  );

  return handleDeleteProductTag;
}
