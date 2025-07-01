import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  pageable: null,
  loadingAllItems: false,
  errorAllItems: null,
  createdItems: [],
  statuses: [],
  selectedItem: null,
  loading: false,
  error: null,
  selectItemDetails: null,
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
      state.createdItems = action.payload; 
    },
    createItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedItem: (state, action) => {
      console.log("Guardando en store:", action.payload);
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
    fetchItemsStart: (state) => {
      state.loadingAllItems = true;
      state.errorAllItems = null;
    },
    fetchItemsSuccess: (state, action) => {
      state.loadingAllItems = false;
      state.items = action.payload.items;
      state.pageable = action.payload.pageable;
      state.errorAllItems = null;
    },
    fetchItemsFailure: (state, action) => {
      state.loadingAllItems = false;
      state.errorAllItems = action.payload;
    },
    setSelectedItemDetails: (state, action) => {
      state.selectItemDetails = action.payload;
    },
    removeItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter((item) => item.item_id !== action.payload),
      };
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
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  setSelectedItemDetails,
  removeItem,
} = itemSlice.actions;

export default itemSlice.reducer;
