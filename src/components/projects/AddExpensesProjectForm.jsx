import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/projects/addExpensesProjectForm.module.css";
import { toast } from "react-toastify";
import { createExpenseSchema } from "../../validators/expenses/createExpenseValidator";
import useCreateExpense from "../../hooks/expenses/useCreateExpense";
import useDeleteExpense from "../../hooks/expenses/useDeleteExpense";
import useGetExpensesByProject from "../../hooks/expenses/useGetExpensesByProject";
import useGetExpenseTypes from "../../hooks/expenses/useGetExpensesTypes";
import {
  selectExpenseTypes,
  selectExpenses,
} from "../../features/expenses/ExpenseSelector";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getExpensesTypesLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import { Trash2 } from "lucide-react";

const AddExpensesProjectForm = () => {
  const { id } = useParams();
  useGetExpensesByProject(id);
  useGetExpenseTypes();
  const expensesTypes = useSelector(selectExpenseTypes);
  const expenses = useSelector(selectExpenses);
  const { expenseCreation } = useCreateExpense();
  const { deleteExpenseByProjectId } = useDeleteExpense();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createExpenseSchema),
    defaultValues: {
      type: "",
      value: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await expenseCreation({ ...data, project_id: Number(id) });
      reset();
    } catch (error) {
      toast.error("Error al crear gasto");
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpenseByProjectId(Number(expenseId));
    } catch (error) {
      toast.error("Error al eliminar gasto: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <BackButton target={`/project/${id}`} />
        <h2 className={styles.title}>Gastos del proyecto</h2>
        <h3 className={styles.subtitle}>Agregar un gasto</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fieldGroup}>
            <select {...register("type")} className={styles.input}>
              <option value="">Seleccionar tipo</option>
              {expensesTypes?.map((type) => (
                <option key={type} value={type}>
                  {getExpensesTypesLabel(type)}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Valor"
              {...register("value")}
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Descripción"
              {...register("description")}
              className={styles.input}
            />
          </div>

          {(errors.type || errors.value || errors.description) && (
            <div className={styles.error}>
              {errors.type && <span>{errors.type.message}</span>}
              {errors.value && <span>{errors.value.message}</span>}
              {errors.description && <span>{errors.description.message}</span>}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={`${styles.submitBtn} ${styles.formButton}`}
            >
              Guardar
            </button>
            <button
              type="button"
              className={`${styles.resetBtn} ${styles.formButton}`}
              onClick={() => reset()}
            >
              Resetear
            </button>
          </div>
        </form>
      </div>

      <div className={styles.expensesListSection}>
        <h4 className={styles.expensesTitle}>Gastos existentes</h4>
        {expenses?.length > 0 ? (
          <ul className={styles.expenseList}>
            {expenses.map((expense) => (
              <li key={expense.expense_id} className={styles.expenseItem}>
                <span>
                  <strong>{getExpensesTypesLabel(expense.type)}</strong> -{" "}
                  {expense.description} - {expense.value} USD
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(expense.expense_id)}
                >
                  <Trash2 size={20} strokeWidth={2} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyList}>No hay gastos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpensesProjectForm;
