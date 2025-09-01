import { useCallback } from "react";
import { updateProduct } from "../../services/productApiService";
import { updateProductInStore } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";

export function useUpdateProduct() {
  const dispatch = useDispatch();

  const handleUpdateProduct = useCallback(async (productId, formData, onSuccess) => {
    const updatedProduct = {
      model: formData.model,
      comments: formData.comments,
      replacement_value: formData.replacement_value,
      status: formData.status
    };

    try {
      const updated = await updateProduct(productId, updatedProduct);
      if (onSuccess) onSuccess();
      dispatch(updateProductInStore(updated));
      showToast("Producto modificado correctamente.");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  }, [dispatch]);

  return handleUpdateProduct;
}
