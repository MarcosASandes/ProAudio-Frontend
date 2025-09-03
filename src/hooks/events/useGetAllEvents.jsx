import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../services/eventApiService";
import { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } from "../../features/events/EventSlice";

const useGetAllEvents = (
  page,
  size,
  sortBy,
  direction,
  status = "",
  name = ""
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEventsAll = async () => {
      dispatch(fetchEventsStart());
      try {
        const data = await getAllEvents(
          page,
          size,
          sortBy,
          direction,
          status,
          name
        );
        dispatch(fetchEventsSuccess(data));
      } catch (error) {
        dispatch(
          fetchEventsFailure(error.message || "Error al cargar eventos")
        );
      }
    };

    fetchEventsAll();
  }, [dispatch, page, size, sortBy, direction, status, name]);
};

export default useGetAllEvents;
