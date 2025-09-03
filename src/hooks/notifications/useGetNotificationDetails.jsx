import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getNotificationDetails } from "../../services/notificationApiService";
import { setSelectedNotification } from "../../features/notifications/NotificationSlice";

const useGetNotificationDetails = () => {
  const dispatch = useDispatch();

  const fetchNotificationDetails = useCallback(async (id) => {
    try {
      const data = await getNotificationDetails(id);
      dispatch(setSelectedNotification(data));
    } catch (error) {
      console.error("Error al obtener la notificación:", error);
    }
  }, [dispatch]);

  return { fetchNotificationDetails };
};

export default useGetNotificationDetails;
