import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { exitItemToProject } from "../../services/projectApiService";
import { addItemToOutletInStore } from "../../features/projects/ProjectSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useExitItemProject = () => {
  const dispatch = useDispatch();

  const fetchExitItem = useCallback(
    async (idProject, idItem) => {
      try {
        const data = await exitItemToProject(idProject, idItem);
        dispatch(addItemToOutletInStore(data));
        showToast("Se ha agregado el artículo correctamente.");
      } catch (error) {
        console.error("Error al obtener el proyecto:", error.message);
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { fetchExitItem };
};

export default useExitItemProject;
