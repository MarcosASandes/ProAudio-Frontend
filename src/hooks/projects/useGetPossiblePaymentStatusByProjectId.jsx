import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getPossiblePaymentStatusByProjectId } from "../../services/projectApiService";
import { setPaymentStatusInStore } from "../../features/projects/ProjectSlice";

const useGetPossiblePaymentStatusByProjectId = () => {
  const dispatch = useDispatch();

  const fetchPaymentStatusByProjectId = useCallback(async (id) => {
    try {
      const data = await getPossiblePaymentStatusByProjectId(id);
      dispatch(setPaymentStatusInStore(data));
    } catch (error) {
      console.error("Error al obtener los estados de pago del proyecto:", error.message);
    }
  }, [dispatch]);

  return { fetchPaymentStatusByProjectId };
};

export default useGetPossiblePaymentStatusByProjectId;
