import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";
import { getAllPaymentStatuses } from "../../services/projectApiService";
import { setAllPaymentStatusesInStore } from "../../features/projects/ProjectSlice";

const useGetAllProjectPaymentStatuses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProjectPaymentStatuses = async () => {
      try {
        const data = await getAllPaymentStatuses();
        dispatch(setAllPaymentStatusesInStore(data));
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchAllProjectPaymentStatuses();
  }, []);
};

export default useGetAllProjectPaymentStatuses;