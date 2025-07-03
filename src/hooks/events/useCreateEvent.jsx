import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createEvent } from "../../services/eventApiService";
import { fetchEventsStart, fetchEventsFailure, fetchEventsSuccess, addEvent } from "../../features/events/EventSlice";

const useCreateEvent = () => {
  const dispatch = useDispatch();

  const eventCreation = useCallback(
    async (payload) => {
      dispatch(fetchEventsStart());
      try {
        const response = await createEvent(payload);
        dispatch(addEvent(response));
        toast.success("Evento creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchEventsFailure(error.message));
        toast.error("Error al crear el evento");
      }
    },
    [dispatch]
  );

  return { eventCreation };
};

export default useCreateEvent;
