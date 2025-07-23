import { useDispatch } from "react-redux";
import { deleteProductPrice } from "../../services/productApiService";
import { removeProductPriceInStore } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteProductPrice = () => {
  const dispatch = useDispatch();

  const handleDeleteProductPrice = async (priceId) => {
    try {
      const data = await deleteProductPrice(priceId);
      dispatch(removeProductPriceInStore(data));
      showToast("Se eliminó el precio correctamente.");
    } catch (error) {
      console.error("Error al eliminar el precio:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return { deleteProductPrice: handleDeleteProductPrice };
};

export default useDeleteProductPrice;
