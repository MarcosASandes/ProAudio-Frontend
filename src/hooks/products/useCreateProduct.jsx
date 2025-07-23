import { useCallback } from "react";
import { createProduct } from "../../services/productApiService";
import { addProduct } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";

export function useCreateProduct() {
  const dispatch = useDispatch();

  const handleCreateProduct = useCallback(async (formData, onSuccess) => {
    try {
      const created = await createProduct(formData);
      dispatch(addProduct(created));
      showToast("El producto se ha creado correctamente.");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al crear producto:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  }, [dispatch]);

  return handleCreateProduct;
}
