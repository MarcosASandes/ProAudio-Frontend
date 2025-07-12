import { useDispatch } from "react-redux";
import { deleteProductPhoto } from "../../services/productApiService";
import { deleteProductPhotoInStore } from "../../features/products/ProductSlice";
import { toast } from "react-toastify";
import useGetProductDetails from "./useGetProductDetails";

const useDeleteProductPhoto = () => {
  const dispatch = useDispatch();

  const handleDeleteProductPhoto = async (photoId, productId) => {
    try {
      const data = await deleteProductPhoto(photoId);
      dispatch(deleteProductPhotoInStore(data));
      toast("Se eliminó correctamente la foto.");
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      toast("No se eliminó la foto.");
    }
  };

  return { deleteProductPhoto: handleDeleteProductPhoto };
};

export default useDeleteProductPhoto;
