import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLogged: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.userLogged = action.payload;
    },
    clearLoggedUser: (state, action) => {
      state.userLogged = null;
    },
  },
});

export const {
  setLoggedUser,
  clearLoggedUser
} = authSlice.actions;

export default authSlice.reducer;
