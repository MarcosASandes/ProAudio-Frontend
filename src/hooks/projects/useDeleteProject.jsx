import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteProject } from "../../services/projectApiService";
import { removeProject } from "../../features/projects/ProjectSlice";

const useDeleteProject = () => {
  const dispatch = useDispatch();

  const handleDeleteProject = async (projectId) => {
    try {
      const deletedProject = await deleteProject(projectId);
      const id = deletedProject.project_id;
      dispatch(removeProject(id));
      toast.success("Proyecto eliminado correctamente.");
      return true;
    } catch (error) {
      console.error("Error eliminando el proyecto:", error.message);
      toast.error("No se pudo eliminar el producto." + error.message);
      return false;
    }
  };

  return handleDeleteProject;
};

export default useDeleteProject;
