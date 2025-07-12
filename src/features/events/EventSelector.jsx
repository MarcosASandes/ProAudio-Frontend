export const selectEvents = (state) => state.events.events;
export const selectSelectedEvent = (state) => state.events.selectedEvent;
export const selectSelectedEventDetails = (state) => state.events.selectEventDetails;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;
export const selectEventsPageable = (state) => state.events.pageable;