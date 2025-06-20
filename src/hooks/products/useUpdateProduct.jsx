import { useCallback } from "react";
import { updateProduct } from "../../services/productApiService";
import { updateProductInStore } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export function useUpdateProduct() {
  const dispatch = useDispatch();

  const handleUpdateProduct = useCallback(async (productId, formData, onSuccess) => {
    const updatedProduct = {
      model: formData.model,
      comments: formData.comments,
      replacement_value: formData.replacement_value,
      status: formData.status
    };

    console.log("Producto editado: ");
    console.log(updatedProduct);

    try {
      const updated = await updateProduct(productId, updatedProduct);
      if (onSuccess) onSuccess();
      dispatch(updateProductInStore(updated));
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      toast.error("Error: " + error.response?.data?.message || error.message);
    }
  }, [dispatch]);

  return handleUpdateProduct;
}
