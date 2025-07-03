import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../services/eventApiService";
import { removeEvent } from "../../features/events/EventSlice";

const useDeleteEvent = () => {
  const dispatch = useDispatch();

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      dispatch(removeEvent(id));
      toast.success("Evento eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el evento: " + error.message);
    }
  };

  return handleDeleteEvent;
};

export default useDeleteEvent;
