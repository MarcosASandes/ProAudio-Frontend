import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  pageable: null,
  selectedEvent: null,
  loading: false,
  error: null,
  selectEventDetails: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    fetchEventsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.events;
      state.pageable = action.payload.pageable;
      state.error = null;
    },
    fetchItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedEventDetails: (state, action) => {
      state.selectEventDetails = action.payload;
    },
    removeEvent: (state, action) => {
      return {
        ...state,
        events: state.events.filter(
          (event) => event.event_id !== action.payload
        ),
      };
    },
    addEvent: (state, action) => {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    },
    updateEventInStore: (state, action) => {
      const updatedEvent = action.payload;
      return {
        ...state,
        events: state.events.map((event) =>
          event.event_id === updatedEvent.event_id
            ? updatedEvent
            : event
        ),
      };
    },
  },
});

export const {
  setSelectedEvent,
  clearSelectedEvent,
  fetchEventsStart,
  fetchEventsSuccess,
  fetchItemsFailure,
  setSelectedEventDetails,
  removeEvent,
  addEvent,
  updateEventInStore,
} = eventSlice.actions;

export default eventSlice.reducer;
