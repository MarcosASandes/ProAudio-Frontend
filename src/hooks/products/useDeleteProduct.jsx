import { useDispatch } from "react-redux";
import { deleteProduct } from "../../services/productApiService";
import { removeProductInStore } from "../../features/products/ProductSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteProduct = () => {
  const dispatch = useDispatch();

  const handleDeleteProduct = async (productId) => {
    try {
      const deletedProduct = await deleteProduct(productId);

      const id = deletedProduct.product_id;

      dispatch(removeProductInStore(id));

      showToast("Producto eliminado correctamente.");
      return true;
    } catch (error) {
      console.error("Error eliminando producto:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
      return false;
    }
  };

  return handleDeleteProduct;
};

export default useDeleteProduct;
