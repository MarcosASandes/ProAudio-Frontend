import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createExpense } from "../../services/expenseApiService";
import { fetchExpensesStart, fetchExpensesFailure, addExpense } from "../../features/expenses/ExpenseSlice";

const useCreateExpense = () => {
  const dispatch = useDispatch();

  const expenseCreation = useCallback(
    async (payload) => {
      dispatch(fetchExpensesStart());
      try {
        const response = await createExpense(payload);
        dispatch(addExpense(response));
        toast.success("Gasto creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchExpensesFailure(error.message));
        toast.error("Error al crear el gasto");
      }
    },
    [dispatch]
  );

  return { expenseCreation };
};

export default useCreateExpense;
