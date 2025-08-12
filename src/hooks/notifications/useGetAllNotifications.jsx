import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../services/notificationApiService";
import { fetchSuccessAll, fetchFailure, fetchStart } from "../../features/notifications/NotificationSlice";

const useGetAllNotifications = (
  page = 0,
  size = 10,
  direction = "desc",
  type = null,
  solved = false,
  seen = false
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const data = await getAllNotifications(
          page,
          size,
          direction,
          type,
          solved,
          seen
        );
        dispatch(fetchSuccessAll(data));
      } catch (error) {
        dispatch(
          fetchFailure(error.message || "Error al cargar notificaciones")
        );
      }
    };

    fetchData();
  }, [dispatch, page, size, direction, type, solved, seen]);
};

export default useGetAllNotifications;
