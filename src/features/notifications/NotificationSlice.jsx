import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentNotifications: [],
  allNotifications: [],
  notificationTypes: [],
  pageable: {
    totalElements: 0,
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  },
  totalNotifications: 0,
  selectedNotification: null,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // ---------- Loading & Error ----------
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccessRecent: (state, action) => {
      state.loading = false;
      state.recentNotifications = action.payload.notifications || [];
      state.totalNotifications = action.payload.pageable.totalElements || null;
      state.error = null;
    },
    fetchSuccessAll: (state, action) => {
      state.loading = false;
      state.allNotifications = action.payload.notifications || [];
      state.pageable = action.payload.pageable || null;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------- Update / sync utilities ----------
    markNotificationAsSeen: (state, action) => {
      const id = action.payload;
      state.recentNotifications = state.recentNotifications.map((n) =>
        n.notification_id === id ? { ...n, is_seen: true } : n
      );
      state.allNotifications = state.allNotifications.map((n) =>
        n.notification_id === id ? { ...n, is_seen: true } : n
      );
    },

    markNotificationsAsSeen: (state, action) => {
      const ids = action.payload; // array de ids
      if (!Array.isArray(ids)) return;
      state.recentNotifications = state.recentNotifications.map((n) =>
        ids.includes(n.notification_id) ? { ...n, is_seen: true } : n
      );
      state.allNotifications = state.allNotifications.map((n) =>
        ids.includes(n.notification_id) ? { ...n, is_seen: true } : n
      );
    },

    addNotification: (state, action) => {
      const newNotif = action.payload;
      if (!newNotif) return;
      state.recentNotifications = [newNotif, ...state.recentNotifications];
      state.allNotifications = [newNotif, ...state.allNotifications];
    },

    removeNotification: (state, action) => {
      const id = action.payload;
      state.recentNotifications = state.recentNotifications.filter(
        (n) => n.notification_id !== id
      );
      state.allNotifications = state.allNotifications.filter(
        (n) => n.notification_id !== id
      );
    },

    setSelectedNotification: (state, action) => {
      state.selectedNotification = action.payload;
    },

    clearNotifications: (state) => {
      state.recentNotifications = [];
      state.allNotifications = [];
      state.pageable = null;
      state.selectedNotification = null;
      state.loading = false;
      state.error = null;
    },

    setNotificationTypes: (state, action) => {
      state.notificationTypes = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccessRecent,
  fetchSuccessAll,
  fetchFailure,
  markNotificationAsSeen,
  markNotificationsAsSeen,
  addNotification,
  removeNotification,
  setSelectedNotification,
  clearNotifications,
  setNotificationTypes,
} = notificationSlice.actions;

export default notificationSlice.reducer;
