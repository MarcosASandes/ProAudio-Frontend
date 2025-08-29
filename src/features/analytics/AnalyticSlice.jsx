import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostRentedProductsData: {},
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setMostRentedProductsAnalytic: (state, action) => {
      state.mostRentedProductsData = action.payload;
    },
    clearMostRentedProductsAnalytic: (state) => {
      state.mostRentedProductsData = null;
    },
  },
});

export const {
  setMostRentedProductsAnalytic,
  clearMostRentedProductsAnalytic,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
