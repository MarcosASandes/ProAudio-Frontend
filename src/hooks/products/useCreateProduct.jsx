import { useCallback } from "react";
import { createProduct } from "../../services/productApiService";
import { addProduct } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export function useCreateProduct() {
  const dispatch = useDispatch();

  const handleCreateProduct = useCallback(async (formData, onSuccess) => {
    try {
      const created = await createProduct(formData);
      dispatch(addProduct(created));
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al crear producto:", error);
      toast.error("Error al crear el producto ❌");
    }
  }, [dispatch]);

  return handleCreateProduct;
}
