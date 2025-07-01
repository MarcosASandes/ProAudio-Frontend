import { useDispatch } from "react-redux";
import { deleteProduct } from "../../services/productApiService";
import { toast } from "react-toastify";
import { removeProductInStore } from "../../features/products/ProductSlice";

const useDeleteProduct = () => {
  const dispatch = useDispatch();

  const handleDeleteProduct = async (productId) => {
    try {
      const deletedProduct = await deleteProduct(productId);

      const id = deletedProduct.product_id;

      dispatch(removeProductInStore(id));

      toast.success("Producto eliminado correctamente.");
      return true;
    } catch (error) {
      console.error("Error eliminando producto:", error);
      toast.error("No se pudo eliminar el producto.");
      return false;
    }
  };

  return handleDeleteProduct;
};

export default useDeleteProduct;
