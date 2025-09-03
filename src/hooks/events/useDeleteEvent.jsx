import { useDispatch } from "react-redux";
import { deleteEvent } from "../../services/eventApiService";
import { removeEvent } from "../../features/events/EventSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteEvent = () => {
  const dispatch = useDispatch();

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      dispatch(removeEvent(id));
      showToast("Evento eliminado correctamente.");
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return handleDeleteEvent;
};

export default useDeleteEvent;
