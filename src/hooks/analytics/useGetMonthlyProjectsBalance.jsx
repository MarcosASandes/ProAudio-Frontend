import { useEffect, useCallback  } from "react";
import { useDispatch } from "react-redux";
import { showToastError } from "../../utils/toastUtils";
import { getMonthProjectsBalance } from "../../services/analyticsApiService";
import { setMonthlyProjectsBalanceAnalytic } from "../../features/analytics/AnalyticSlice";

const useGetMonthlyProjectsBalance = () => {
  const dispatch = useDispatch();

  const fetchAnalyticMonthlyBalance = useCallback(
    async (id) => {
      try {
        const data = await getMonthProjectsBalance(id);
        dispatch(setMonthlyProjectsBalanceAnalytic(data));
      } catch (error) {
        const msj =
          error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { fetchAnalyticMonthlyBalance };
};

export default useGetMonthlyProjectsBalance;