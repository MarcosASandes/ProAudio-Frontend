import { useDispatch } from "react-redux";
import { deleteItemById } from "../../services/itemApiService";
import { removeItem } from "../../features/items/ItemSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useDeleteItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (itemId) => {
    try {
        console.log(itemId + "ID DEL ITEM EN EL HOOK");
      await deleteItemById(itemId);
      dispatch(removeItem(itemId));
      toast.success("Artículo eliminado correctamente.");
      navigate("/products");
    } catch (error) {
      toast.error("Error al eliminar el artículo.");
    }
  };

  return handleDelete;
};

export default useDeleteItem;
