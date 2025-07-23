import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getProjectTypes } from "../../services/projectApiService";
import { setProjectTypesInStore } from "../../features/projects/ProjectSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useGetProjectTypes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const data = await getProjectTypes();
        dispatch(setProjectTypesInStore(data));
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchProjectTypes();
  }, []);
};

export default useGetProjectTypes;