import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../services/notificationApiService";
import { fetchSuccessAll, fetchFailure, fetchStart } from "../../features/notifications/NotificationSlice";

const useGetAllNotifications = (
  page = 0,
  size = 10,
  type = null,
  is_completed = false,
  name = '',
  /*solved = false,
  seen = false*/
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const data = await getAllNotifications(
          page,
          size,
          type,
          is_completed,
          name,
          /*solved,
          seen*/
        );
        console.log("Notificaciones: ", data);
        dispatch(fetchSuccessAll(data));
      } catch (error) {
        dispatch(
          fetchFailure(error.message || "Error al cargar notificaciones")
        );
      }
    };

    fetchData();
  }, [dispatch, page, size, type, is_completed, name]);
};

export default useGetAllNotifications;
