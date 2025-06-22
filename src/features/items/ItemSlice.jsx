import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdItems: [],
  statuses: [],
  selectedItem: null,
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    createItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    createItemsSuccess(state, action) {
      state.loading = false;
      state.createdItems = action.payload; // Guarda el array de items creados
    },
    createItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedItem: (state, action) => {
      console.log("Guardando en store:", action.payload); // 👈 verifique aquí!
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
    setStatuses: (state, action) => {
      state.statuses = action.payload;
    },
    clearStatuses: (state) => {
      state.statuses = [];
    },
  },
});

export const {
  createItemsStart,
  createItemsSuccess,
  createItemsFailure,
  setSelectedItem,
  clearSelectedItem,
  setStatuses,
  clearStatuses,
} = itemSlice.actions;

export default itemSlice.reducer;
