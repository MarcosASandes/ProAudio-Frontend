import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostRentedProductsData: {},
  projectsTimelineData: {},
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
    setProjectsTimelineAnalytic: (state, action) => {
      state.projectsTimelineData = action.payload;
    },
    clearProjectsTimelineAnalytic: (state) => {
      state.projectsTimelineData = null;
    },
  },
});

export const {
  setMostRentedProductsAnalytic,
  clearMostRentedProductsAnalytic,
  setProjectsTimelineAnalytic,
  clearProjectsTimelineAnalytic,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
