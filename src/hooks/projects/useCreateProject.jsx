import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createProject } from "../../services/projectApiService";
import { addProject, fetchProjectsStart, fetchProjectsFailure } from "../../features/projects/ProjectSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useCreateProject = () => {
  const dispatch = useDispatch();

  const projectCreation = useCallback(
    async (payload) => {
      dispatch(fetchProjectsStart());
      try {
        const response = await createProject(payload);
        dispatch(addProject(response));
        showToast("Proyecto creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchProjectsFailure(error.message));
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { projectCreation };
};

export default useCreateProject;