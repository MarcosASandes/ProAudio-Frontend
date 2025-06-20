// ✅ Hook correcto para control manual
import { useDispatch } from "react-redux";
import { deleteProductPhoto } from "../../services/productApiService";
import { deleteProductPhotoInStore } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";
import useGetProductDetails from "./useGetProductDetails";

const useDeleteProductPhoto = () => {
  const dispatch = useDispatch();

  // Devuelve una FUNCIÓN, no ejecuta nada solo
  const handleDeleteProductPhoto = async (photoId, productId) => {
    try {
      const data = await deleteProductPhoto(photoId); // llama al service
      dispatch(deleteProductPhotoInStore(data)); // actualiza store
      //useGetProductDetails(productId);
      toast("Se eliminó correctamente la foto.");
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      toast("No se eliminó la foto.");
    }
  };

  return { deleteProductPhoto: handleDeleteProductPhoto };
};

export default useDeleteProductPhoto;
