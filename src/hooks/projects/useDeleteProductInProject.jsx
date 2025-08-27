import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";
import { removeProductInProject } from "../../features/products/ProductSlice";
import { deleteProductProject } from "../../services/productProjectApiService";

const useDeleteProductInProject = () => {
  const dispatch = useDispatch();

  const handleDeleteProductProject = async (productProjectId) => {
    try {
      const data = await deleteProductProject(productProjectId);
      dispatch(removeProductInProject(data));
      showToast("Se removió el producto del proyecto correctamente.");
    } catch (error) {
      console.error("Error al eliminar el precio:", error);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return { deleteProductProject: handleDeleteProductProject };
};

export default useDeleteProductInProject;
