import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateExpense } from "../../services/expenseApiService";
import { updateExpenseInStore } from "../../features/expenses/ExpenseSlice";

const useUpdateExpense = () => {
  const dispatch = useDispatch();
  const updateExpenseHook = useCallback(
    async (id, payload, onSuccess) => {
      try {
        const response = await updateExpense(id, payload);
        dispatch(updateExpenseInStore(response));
        toast.success("Gasto actualizado correctamente");
        if (onSuccess) onSuccess();
        return true;
      } catch (error) {
        toast.error("Error al actualizar el evento: " + error.message);
        return false;
      }
    },
    [dispatch]
  );

  return { updateExpenseHook };
};

export default useUpdateExpense;
