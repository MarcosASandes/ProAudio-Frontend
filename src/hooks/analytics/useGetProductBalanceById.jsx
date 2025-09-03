import { useCallback  } from "react";
import { useDispatch } from "react-redux";
import { showToastError } from "../../utils/toastUtils";
import { getProductBalanceById } from "../../services/analyticsApiService";
import { setProductBalanceAnalytic } from "../../features/analytics/AnalyticSlice";

const useGetProductBalanceById = () => {
  const dispatch = useDispatch();

  const fetchAnalyticProductBalance = useCallback(
    async (id) => {
      try {
        const data = await getProductBalanceById(id);
        dispatch(setProductBalanceAnalytic(data));
      } catch (error) {
        const msj =
          error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { fetchAnalyticProductBalance };
};

export default useGetProductBalanceById;
