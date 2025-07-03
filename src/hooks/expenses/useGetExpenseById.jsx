import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getExpenseById } from "../../services/expenseApiService";
import { setSelectedExpense, fetchExpensesStart, fetchExpensesFailure } from "../../features/expenses/ExpenseSlice";

const useGetExpenseById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchExpenseById = async () => {
      dispatch(fetchExpensesStart());
      try {
        const response = await getExpenseById(id);
        dispatch(setSelectedExpense(response));
        toast("Gasto encontrado con éxito.");
      } catch (error) {
        toast("Error al obtener el gasto:" + error.message);
        dispatch(fetchExpensesFailure(error.message));
      }
    };

    fetchExpenseById();
  }, [dispatch, id]);
};

export default useGetExpenseById;
