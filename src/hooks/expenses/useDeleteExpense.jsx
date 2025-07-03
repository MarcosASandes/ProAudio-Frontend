import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteExpense } from "../../services/expenseApiService";
import { removeExpense } from "../../features/expenses/ExpenseSlice";

const useDeleteExpense = () => {
  const dispatch = useDispatch();

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      dispatch(removeExpense(id));
      toast.success("Gasto eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el gasto: " + error.message);
    }
  };

  return handleDeleteExpense;
};

export default useDeleteExpense;
