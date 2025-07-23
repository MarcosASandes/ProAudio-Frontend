import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteProject } from "../../services/projectApiService";
import { removeProject } from "../../features/projects/ProjectSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteProject = () => {
  const dispatch = useDispatch();

  const handleDeleteProject = async (projectId) => {
    try {
      const deletedProject = await deleteProject(projectId);
      const id = deletedProject.project_id;
      dispatch(removeProject(id));
      showToast("Proyecto eliminado correctamente.");
      return true;
    } catch (error) {
      console.error("Error eliminando el proyecto:", error.message);
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
      return false;
    }
  };

  return handleDeleteProject;
};

export default useDeleteProject;
