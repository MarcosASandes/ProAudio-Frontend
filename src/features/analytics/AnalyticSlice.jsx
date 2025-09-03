import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostRentedProductsData: {},
  productBalanceData: {},
  monthlyProjectsBalanceData: {},
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
    setMonthlyProjectsBalanceAnalytic: (state, action) => {
      state.monthlyProjectsBalanceData = action.payload;
    },
    clearMonthlyProjectsBalanceAnalytic: (state) => {
      state.monthlyProjectsBalanceData = null;
    },
  },
});

export const {
  setMostRentedProductsAnalytic,
  clearMostRentedProductsAnalytic,
  setProductBalanceAnalytic,
  clearProductBalanceAnalytic,
  setMonthlyProjectsBalanceAnalytic,
  clearMonthlyProjectsBalanceAnalytic,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
