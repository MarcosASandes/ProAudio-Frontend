import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateExpense } from "../../services/expenseApiService";
import { updateExpenseInStore } from "../../features/expenses/ExpenseSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useUpdateExpense = () => {
  const dispatch = useDispatch();
  const updateExpenseHook = useCallback(
    async (id, payload, onSuccess) => {
      try {
        const response = await updateExpense(id, payload);
        dispatch(updateExpenseInStore(response));
        showToast("Gasto actualizado correctamente");
        if (onSuccess) onSuccess();
        return true;
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
        return false;
      }
    },
    [dispatch]
  );

  return { updateExpenseHook };
};

export default useUpdateExpense;
