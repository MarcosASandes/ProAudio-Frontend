/*import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteExpense } from "../../services/expenseApiService";
import { removeExpense } from "../../features/expenses/ExpenseSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteExpense = () => {
  const dispatch = useDispatch();

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      dispatch(removeExpense(id));
      showToast("Gasto eliminado correctamente.");
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return handleDeleteExpense;
};

export default useDeleteExpense;*/


/*------------------------ */

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteExpense } from "../../services/expenseApiService";
import { removeExpense } from "../../features/expenses/ExpenseSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteExpense = () => {
  const dispatch = useDispatch();

  const deleteExpenseByProjectId = async (id) => {
    try {
      await deleteExpense(id); // evita confundir con el nombre del hook
      dispatch(removeExpense(id));
      showToast("Gasto eliminado correctamente.");
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return { deleteExpenseByProjectId };
};

export default useDeleteExpense;