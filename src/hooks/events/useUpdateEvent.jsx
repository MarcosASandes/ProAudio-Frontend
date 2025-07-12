import { useCallback } from "react";
import { toast } from "react-toastify";
import { updateEvent } from "../../services/eventApiService";
import { updateEventInStore } from "../../features/events/EventSlice";
import { useDispatch } from "react-redux";

const useUpdateEvent = () => {
  const dispatch = useDispatch();
  const updateEventHook = useCallback(
    async (id, payload, onSuccess) => {
      try {
        const response = await updateEvent(id, payload);
        dispatch(updateEventInStore(response));
        toast.success("Evento actualizado correctamente");
        if (onSuccess) onSuccess(); // 👈 ejecutamos callback si existe
        return true;
      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar el evento: " + error.message);
        return false;
      }
    },
    [dispatch]
  );

  return { updateEventHook };
};

export default useUpdateEvent;
