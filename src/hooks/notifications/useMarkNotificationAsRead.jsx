import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { readNotification } from "../../services/notificationApiService";
import { markNotificationAsSeen, fetchFailure } from "../../features/notifications/NotificationSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useMarkNotificationAsRead = () => {
  const dispatch = useDispatch();

  const markAsRead = useCallback(
    async (id) => {
      try {
        await readNotification(id);
        dispatch(markNotificationAsSeen(id));
        showToast("Notificación marcada como leída");
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        dispatch(fetchFailure(error.message || "Error al marcar notificación como leída"));
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { markAsRead };
};

export default useMarkNotificationAsRead;
