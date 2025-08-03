import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import { useNavigate } from "react-router-dom";
import { getExpensesTypesLabel } from "../../utils/getLabels";

const AddExpensesProjectForm = ({ id }) => {
  useGetExpensesByProject(id);
  useGetExpenseTypes();
  const expensesTypes = useSelector(selectExpenseTypes);
  const expenses = useSelector(selectExpenses);
  const { expenseCreation } = useCreateExpense();
  const { deleteExpenseByProjectId } = useDeleteExpense();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createExpenseSchema),
    defaultValues: {
      expenses: [{ type: "", value: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "expenses",
  });

  const onSubmit = async (data) => {
    try {
      for (let expense of data.expenses) {
        await expenseCreation({ ...expense, project_id: Number(id) });
      }
      reset();
      //fetchExpenses();
    } catch (error) {
      toast.error("Error al crear gastos");
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("projectDraftUpdate");
    navigate("/project/" + id);
  };

  const handleDelete = async (expenseId) => {
    try {
      console.log("ID del expense: " + expenseId);
      await deleteExpenseByProjectId(Number(expenseId));
      //fetchExpenses();
    } catch (error) {
      toast.error("Error al eliminar gasto: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
        <div className="mb-3">
        <button
          type="button"
          className={stylesBackButtom.btnBackArrow}
          onClick={handleGoBack}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>
      <h2>Gastos del proyecto</h2>
      <ul className={styles.expenseList}>
        {expenses?.map((expense) => (
          <li key={expense.expense_id} className={styles.expenseItem}>
            <span>
              <strong>{getExpensesTypesLabel(expense.type)}</strong> - {expense.description} - $
              {expense.value}
            </span>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(expense.expense_id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <h3>Agregar nuevos gastos</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.fieldGroup}>
            <select
              {...register(`expenses.${index}.type`)}
              className={styles.input}
            >
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
              {...register(`expenses.${index}.value`)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Descripción"
              {...register(`expenses.${index}.description`)}
              className={styles.input}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => remove(index)}
            >
              ✕
            </button>

            <div className={styles.error}>
              {errors.expenses?.[index]?.type?.message}
              {errors.expenses?.[index]?.value?.message}
              {errors.expenses?.[index]?.description?.message}
            </div>
          </div>
        ))}
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => append({ type: "", value: "", description: "" })}
        >
          + Agregar gasto
        </button>
        <button type="submit" className={styles.submitBtn}>
          Guardar gastos
        </button>

        {Object.keys(errors).length > 0 && (
          <div style={{ color: "red" }}>
            Errores en el formulario, verifique los campos
          </div>
        )}
      </form>
      <pre style={{ color: "tomato", background: "#222", padding: "1rem" }}>
        {JSON.stringify(errors, null, 2)}
      </pre>
    </div>
  );
};

export default AddExpensesProjectForm;
