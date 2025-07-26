import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getExpenseTypes } from "../../services/expenseApiService";
import { setExpenseTypesInStore, fetchExpensesStart, fetchExpensesFailure } from "../../features/expenses/ExpenseSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useGetExpenseTypes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenseTypes = async () => {
        dispatch(fetchExpensesStart());
      try {
        const data = await getExpenseTypes();
        dispatch(setExpenseTypesInStore(data));
      } catch (error) {
        dispatch(fetchExpensesFailure(error.message));
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchExpenseTypes();
  }, []);
};

export default useGetExpenseTypes;