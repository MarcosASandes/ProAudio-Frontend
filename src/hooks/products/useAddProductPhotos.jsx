import { useCallback } from "react";
import { addProductPhotos } from "../../services/productApiService";
import { toast } from "react-toastify";

export function useAddProductPhotos() {
  const handleAddProductPhotos = useCallback(async (formData, productId, onSuccess) => {
    try {
      // 👉 Llamar servicio pasando formData + ID
      await addProductPhotos(formData, productId);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al agregar fotos:", error);
      toast.error("Error al agregar las fotos ❌");
    }
  }, []);

  return handleAddProductPhotos;
}
