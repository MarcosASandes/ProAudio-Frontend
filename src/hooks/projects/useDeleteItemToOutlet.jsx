/*ESTE SE PODRÍA BORRAR*/

import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { deleteOutletItemInProject } from "../../services/projectApiService";
import { removeItemToOutletInStore } from "../../features/projects/ProjectSlice";

const useDeleteItemToOutlet = () => {
  const dispatch = useDispatch();
  const handleDeleteItemInProject = async (idProject, idItem) => {
    try {
      await deleteOutletItemInProject(idProject, idItem);
      dispatch(removeItemToOutletInStore(idItem));
      showToast("Item removido correctamente.");
    } catch (error) {
      console.error("Error eliminando el proyecto:", error.message);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return handleDeleteItemInProject;
};

export default useDeleteItemToOutlet;
