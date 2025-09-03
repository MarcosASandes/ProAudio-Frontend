import { useDispatch } from "react-redux";
import { deleteProductPhoto } from "../../services/productApiService";
import { deleteProductPhotoInStore } from "../../features/products/ProductSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteProductPhoto = () => {
  const dispatch = useDispatch();

  const handleDeleteProductPhoto = async (photoId) => {
    try {
      const data = await deleteProductPhoto(photoId);
      dispatch(deleteProductPhotoInStore(data));
      showToast("Se eliminó correctamente la foto.");
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return { deleteProductPhoto: handleDeleteProductPhoto };
};

export default useDeleteProductPhoto;
