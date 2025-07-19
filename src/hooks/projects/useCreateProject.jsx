import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createProject } from "../../services/projectApiService";
import { addProject, fetchProjectsStart, fetchProjectsFailure } from "../../features/projects/ProjectSlice";

const useCreateProject = () => {
  const dispatch = useDispatch();

  const projectCreation = useCallback(
    async (payload) => {
      dispatch(fetchProjectsStart());
      try {
        const response = await createProject(payload);
        dispatch(addProject(response));
        toast.success("Proyecto creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchProjectsFailure(error.message));
        toast.error("Error al crear el proyecto: " + error.response?.data?.message);
      }
    },
    [dispatch]
  );

  return { projectCreation };
};

export default useCreateProject;