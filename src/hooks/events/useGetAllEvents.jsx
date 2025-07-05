// src/hooks/events/useGetAllEvents.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../services/eventApiService";
import { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } from "../../features/events/EventSlice";

const useGetAllEvents = (page, size) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(fetchEventsStart());
      try {
        const data = await getAllEvents(page, size);

        dispatch(
          fetchEventsSuccess({
            events: data.events,
            pageable: data.pageable,
          })
        );
      } catch (error) {
        dispatch(fetchEventsFailure(error.message || "Error al cargar eventos"));
      }
    };

    fetchEvents();
  }, [page, size, dispatch]);
};

export default useGetAllEvents;
