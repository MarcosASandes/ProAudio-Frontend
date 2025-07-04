import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProjectInStore } from "../../features/projects/ProjectSlice";
import { updateProject } from "../../services/projectApiService";

export function useUpdateProject() {
  const dispatch = useDispatch();

  const handleUpdateProject = useCallback(async (projectId, formData, onSuccess) => {
    const updatedProject = {
        name: formData.name,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        event_id: formData.event_id ? formData.event_id : null,
        event: formData.event ? formData.event : null,
        client: null,
        status: formData.status,
        payment_status: formData.payment_status,
        project_type: formData.project_type,
        cost_addition: formData.cost_addition
    };

    try {
      const updated = await updateProject(projectId, updatedProject);
      if (onSuccess) onSuccess();
      dispatch(updateProjectInStore(updated));
    } catch (error) {
      console.error("Error al actualizar projecto:", error.message);
      toast.error("Error: " + error.response?.data?.message || error.message);
    }
  }, [dispatch]);

  return handleUpdateProject;
}
