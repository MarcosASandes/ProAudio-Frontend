import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllExpensesByProject } from "../../services/expenseApiService";
import {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
} from "../../features/expenses/ExpenseSlice";

const useGetExpensesByProject = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchAllExpensesByProjectId = async () => {
      dispatch(fetchExpensesStart());
      try {
        const response = await getAllExpensesByProject(id);
        dispatch(fetchExpensesSuccess(response));
      } catch (error) {
        toast("Error al obtener los gastos:" + error.message);
        dispatch(fetchExpensesFailure(error.messag));
      }
    };

    fetchAllExpensesByProjectId();
  }, [dispatch, id]);
};

export default useGetExpensesByProject;
