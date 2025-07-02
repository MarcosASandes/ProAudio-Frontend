import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEventById } from "../../services/eventApiService";
import { setSelectedEvent } from "../../features/events/EventSlice";
import { toast } from "react-toastify";

const useGetEventById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchEventById = async () => {
      try {
        const response = await getEventById(id);
        dispatch(setSelectedEvent(response));
        toast("Evento encontrado con éxito.");
      } catch (error) {
        toast("Error al obtener el producto:" + error.message);
      }
    };

    fetchEventById();
  }, [dispatch, id]);
};

export default useGetEventById;