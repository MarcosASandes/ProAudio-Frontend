import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getExpenseTypes } from "../../services/expenseApiService";
import { setExpenseTypesInStore, fetchExpensesStart, fetchExpensesFailure } from "../../features/expenses/ExpenseSlice";

const useGetExpenseTypes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenseTypes = async () => {
        dispatch(fetchExpensesStart());
      try {
        const data = await getExpenseTypes();
        dispatch(setExpenseTypesInStore(data));
      } catch (error) {
        toast(`Hubo un error cargando los tipos de gastos: ${error.message}`);
        dispatch(fetchExpensesFailure(error.message));
      }
    };

    fetchExpenseTypes();
  }, []);
};

export default useGetExpenseTypes;