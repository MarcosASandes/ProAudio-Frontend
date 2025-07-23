import { useCallback } from "react";
import { addProductPhotos } from "../../services/productApiService";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";

export function useAddProductPhotos() {
  const handleAddProductPhotos = useCallback(async (formData, productId, onSuccess) => {
    try {
      await addProductPhotos(formData, productId);
      showToast("Se agregaron las fotos correctamente.");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al agregar fotos:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  }, []);

  return handleAddProductPhotos;
}
