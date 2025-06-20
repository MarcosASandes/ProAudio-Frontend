// src/hooks/products/useDeleteProduct.js
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../services/productApiService";
import { toast } from "react-toastify";
import { removeProductInStore } from "../../features/products/ProductSlice";

const useDeleteProduct = () => {
  const dispatch = useDispatch();

  const handleDeleteProduct = async (productId) => {
    try {
      // ⚡️ Llama al servicio: obtiene el objeto eliminado
      const deletedProduct = await deleteProduct(productId);

      // ⚡️ Extrae ID desde la respuesta
      const id = deletedProduct.product_id; // Asegúrate: snake_case!

      // ⚡️ Elimina del store usando ID
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
