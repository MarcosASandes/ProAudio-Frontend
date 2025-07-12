import { useDispatch } from "react-redux";
import { deleteProductPrice } from "../../services/productApiService";
import { removeProductPriceInStore } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";

const useDeleteProductPrice = () => {
  const dispatch = useDispatch();

  const handleDeleteProductPrice = async (priceId) => {
    try {
      const data = await deleteProductPrice(priceId);
      dispatch(removeProductPriceInStore(data));
    } catch (error) {
      console.error("Error al eliminar el precio:", error);
      toast.error("No se eliminó el precio.");
    }
  };

  return { deleteProductPrice: handleDeleteProductPrice };
};

export default useDeleteProductPrice;
