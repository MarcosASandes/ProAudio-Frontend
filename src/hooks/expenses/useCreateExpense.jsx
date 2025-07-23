import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createExpense } from "../../services/expenseApiService";
import { fetchExpensesStart, fetchExpensesFailure, addExpense } from "../../features/expenses/ExpenseSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useCreateExpense = () => {
  const dispatch = useDispatch();

  const expenseCreation = useCallback(
    async (payload) => {
      dispatch(fetchExpensesStart());
      try {
        const response = await createExpense(payload);
        dispatch(addExpense(response));
        showToast("Gasto creado correctamente");
        return response;
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        dispatch(fetchExpensesFailure(error.message));
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { expenseCreation };
};

export default useCreateExpense;
