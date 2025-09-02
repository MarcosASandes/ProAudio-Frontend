import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addDescriptionTagInStore, addRelationTagInStore, addDependencyTagInStore } from "../../features/products/ProductSlice";
import { createProductTag } from "../../services/productApiService";
import { showToast, showToastError } from "../../utils/toastUtils";

export function useAddProductTag() {
  const dispatch = useDispatch();

  const handleAddProductTag = useCallback(
    async (productId, tagId, type) => {
      try {
        const payload = {
          product_id: productId,
          tag_id: tagId,
          type: type,
        };
        const createdTag = await createProductTag(payload);
        if (type === "DESCRIPTIVE") {
          dispatch(addDescriptionTagInStore(createdTag));
        } else if (type === "RELATION") {
          dispatch(addRelationTagInStore(createdTag));
        } else if (type === "DEPENDENCY") {
          dispatch(addDependencyTagInStore(createdTag));
        }

        showToast("Etiqueta agregada correctamente");
      } catch (error) {
        console.error("Error al agregar etiqueta:", error);
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return handleAddProductTag;
}
