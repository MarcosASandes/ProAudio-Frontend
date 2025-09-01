import { useDispatch } from "react-redux";
import { deleteItemById } from "../../services/itemApiService";
import { removeItem } from "../../features/items/ItemSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (itemId) => {
    try {
      await deleteItemById(itemId);
      dispatch(removeItem(itemId));
      showToast("Artículo eliminado correctamente.");
      navigate("/products");
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return handleDelete;
};

export default useDeleteItem;
