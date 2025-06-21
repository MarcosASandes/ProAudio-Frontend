import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdItems: [],
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
  },
});

export const {
  createItemsStart,
  createItemsSuccess,
  createItemsFailure,
} = itemSlice.actions;

export default itemSlice.reducer;
