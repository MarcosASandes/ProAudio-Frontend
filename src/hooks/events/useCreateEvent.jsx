import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createEvent } from "../../services/eventApiService";
import { fetchEventsStart, fetchEventsFailure, fetchEventsSuccess, addEvent } from "../../features/events/EventSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useCreateEvent = () => {
  const dispatch = useDispatch();

  const eventCreation = useCallback(
    async (payload) => {
      dispatch(fetchEventsStart());
      try {
        const response = await createEvent(payload);
        dispatch(addEvent(response));
        showToast("Evento creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchEventsFailure(error.message));
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { eventCreation };
};

export default useCreateEvent;
