import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStartingProjectStatus } from "../../services/projectApiService";
import { setStartingProjectStatusInStore } from "../../features/projects/ProjectSlice";
import { showToastError } from "../../utils/toastUtils";

const useGetStartingProjectStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStartingProjectStatus = async () => {
      try {
        const data = await getStartingProjectStatus();
        dispatch(setStartingProjectStatusInStore(data.statuses));
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchStartingProjectStatus();
  }, []);
};

export default useGetStartingProjectStatus;