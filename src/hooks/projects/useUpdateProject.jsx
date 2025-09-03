import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateProject as updateProjectAPI } from "../../services/projectApiService";
import { updateProjectInStore, fetchProjectsStart, fetchProjectsFailure } from "../../features/projects/ProjectSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useUpdateProject = () => {
  const dispatch = useDispatch();

  const updateProject = useCallback(async (id, payload) => {
    dispatch(fetchProjectsStart());
    try {
      const updated = await updateProjectAPI(id, payload);
      dispatch(updateProjectInStore(updated));
      showToast("Proyecto actualizado correctamente");
      return updated;
    } catch (error) {
      dispatch(fetchProjectsFailure(error.message));
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
      return error;
    }
  }, [dispatch]);

  return { updateProject };
};

export default useUpdateProject;
