import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToastError } from "../../utils/toastUtils";
import { getAllRunningStatuses } from "../../services/projectApiService";
import { setAllRunningStatusesInStore } from "../../features/projects/ProjectSlice";

const useGetAllProjectRunningStatuses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProjectRunningStatuses = async () => {
      try {
        const data = await getAllRunningStatuses();
        dispatch(setAllRunningStatusesInStore(data));
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchAllProjectRunningStatuses();
  }, []);
};

export default useGetAllProjectRunningStatuses;