import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";
//import { addProductToProject } from "../../services/projectApiService";
import { addProductInProject } from "../../features/products/ProductSlice";
import { addProductToProject } from "../../services/productProjectApiService";

export function useAddProductInProject() {
  const dispatch = useDispatch();

  const handleAddProductProject = useCallback(
    async (projectId, data) => {
      try {
        const payload = {
            product_id: data.productId,
            project_id: projectId,
            rent_price_id: data.rentPriceId,
            amount: data.amount,
        };

        const createdProductProject = await addProductToProject(payload);
        dispatch(addProductInProject(createdProductProject));
        showToast("Producto agregado correctamente.");
      } catch (error) {
        console.error("Error al agregar precio:", error);
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return handleAddProductProject;
}