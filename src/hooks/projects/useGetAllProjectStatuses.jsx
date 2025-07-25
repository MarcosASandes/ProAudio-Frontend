import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";
import { getAllStatuses } from "../../services/projectApiService";
import { setAllStatusesInStore } from "../../features/projects/ProjectSlice";

const useGetAllProjectStatuses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProjectStatuses = async () => {
      try {
        const data = await getAllStatuses();
        dispatch(setAllStatusesInStore(data));
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchAllProjectStatuses();
  }, []);
};

export default useGetAllProjectStatuses;