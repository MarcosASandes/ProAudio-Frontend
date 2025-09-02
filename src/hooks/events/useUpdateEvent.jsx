import { useCallback } from "react";
import { updateEvent } from "../../services/eventApiService";
import { updateEventInStore } from "../../features/events/EventSlice";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";

const useUpdateEvent = () => {
  const dispatch = useDispatch();
  const updateEventHook = useCallback(
    async (id, payload, onSuccess) => {
      try {
        const response = await updateEvent(id, payload);
        dispatch(updateEventInStore(response));
        showToast("Evento actualizado correctamente");
        if (onSuccess) onSuccess();
        return true;
      } catch (error) {
        console.error(error);
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
        return false;
      }
    },
    [dispatch]
  );

  return { updateEventHook };
};

export default useUpdateEvent;
