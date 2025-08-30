import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostRentedProductsData: {},
  productBalanceData: {},
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
    setProductBalanceAnalytic: (state, action) => {
      state.productBalanceData = action.payload;
    },
    clearProductBalanceAnalytic: (state) => {
      state.productBalanceData = null;
    },
  },
});

export const {
  setMostRentedProductsAnalytic,
  clearMostRentedProductsAnalytic,
  setProductBalanceAnalytic,
  clearProductBalanceAnalytic,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
