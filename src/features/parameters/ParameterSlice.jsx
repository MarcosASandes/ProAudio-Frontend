import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parameters: [],
  selectedParameter: null,
  loading: false,
  error: null,
};

const parametersSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {
    setSelectedParameter: (state, action) => {
      state.selectedParameter = action.payload;
    },
    clearSelectedParameter: (state) => {
      state.selectedParameter = null;
    },
    fetchParametersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchParametersSuccess: (state, action) => {
      state.loading = false;
      state.parameters = action.payload.events;
      state.error = null;
    },
    fetchParametersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeParameter: (state, action) => {
      return {
        ...state,
        parameters: state.parameters.filter(
          (param) => param.key !== action.payload
        ),
      };
    },
    addParameter: (state, action) => {
      return {
        ...state,
        parameters: [...state.parameters, action.payload],
      };
    },
    updateParameterInStore: (state, action) => {
      const updatedParameter = action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.key === updatedParameter.key
            ? updatedParameter
            : param
        ),
      };
    },
  },
});

export const {
    setSelectedParameter,
    clearSelectedParameter,
    fetchParametersStart,
    fetchParametersSuccess,
    fetchParametersFailure,
    removeParameter,
    addParameter,
    updateParameterInStore,
} = parametersSlice.actions;

export default parametersSlice.reducer;
