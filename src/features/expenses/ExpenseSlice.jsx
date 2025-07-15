import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  types: [],
  selectedExpense: null,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setSelectedExpense: (state, action) => {
      state.selectedExpense = action.payload;
    },
    clearSelectedExpense: (state) => {
      state.selectedExpense = null;
    },
    fetchExpensesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExpensesSuccess: (state, action) => {
      state.loading = false;
      state.expenses = action.payload.events;
      state.error = null;
    },
    fetchExpensesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeExpense: (state, action) => {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    },
    addExpense: (state, action) => {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    },
    updateExpenseInStore: (state, action) => {
      const updatedExpense = action.payload;
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === updatedExpense.id
            ? updatedExpense
            : expense
        ),
      };
    },
    setExpenseTypesInStore: (state, action) => {
      state.types = action.payload.types;
    },
  },
});

export const {
    setSelectedExpense,
    clearSelectedExpense,
    fetchExpensesStart,
    fetchExpensesSuccess,
    fetchExpensesFailure,
    removeExpense,
    addExpense,
    updateExpenseInStore,
    setExpenseTypesInStore,
} = expenseSlice.actions;

export default expenseSlice.reducer;
