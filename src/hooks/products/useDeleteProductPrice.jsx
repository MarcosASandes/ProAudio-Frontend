import { useDispatch } from "react-redux";
import { deleteProductPrice } from "../../services/productApiService";
import { removeProductPriceInStore } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";

const useDeleteProductPrice = () => {
  const dispatch = useDispatch();

  // ✅ Devuelve una función para usarla donde quieras
  const handleDeleteProductPrice = async (priceId) => {
    try {
      // 👉 Llama al servicio para borrar en backend
      const data = await deleteProductPrice(priceId);
      // 👉 Actualiza la store usando tu reducer
      dispatch(removeProductPriceInStore(data));
    } catch (error) {
      console.error("Error al eliminar el precio:", error);
      toast.error("No se eliminó el precio.");
    }
  };

  return { deleteProductPrice: handleDeleteProductPrice };
};

export default useDeleteProductPrice;
