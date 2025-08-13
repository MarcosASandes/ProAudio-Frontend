import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../services/notificationApiService";
import { fetchSuccessRecent, fetchFailure, fetchStart } from "../../features/notifications/NotificationSlice";

const useGetRecentNotifications = (
  page = 0,
  size = 5,
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
        dispatch(fetchSuccessRecent(data));
      } catch (error) {
        dispatch(
          fetchFailure(error.message || "Error al cargar notificaciones recientes")
        );
      }
    };

    fetchData();
  }, [dispatch, page, size, direction, type, solved, seen]);
};

export default useGetRecentNotifications;
