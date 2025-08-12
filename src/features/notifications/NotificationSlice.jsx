import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsList: [],
  notificationsDropdown: [],
  pageable: null,
  selectedNotification: null,
  loading: false,
  error: null,
  selectNotificationDetails: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
  },
});

export const {

} = notificationSlice.actions;

export default notificationSlice.reducer;
