import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { readNotification } from "../../services/notificationApiService";
import { markNotificationAsSeen, fetchFailure } from "../../features/notifications/NotificationSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useMarkMultipleNotificationsAsRead = () => {
  const dispatch = useDispatch();

  const markMultipleAsRead = useCallback(
    async (ids = []) => {
      if (!Array.isArray(ids) || ids.length === 0) {
        showToastError("No se seleccionaron notificaciones");
        return;
      }

      try {
        // Podríamos optimizar con Promise.all para paralelizar
        await Promise.all(
          ids.map(async (id) => {
            await readNotification(id);
            dispatch(markNotificationAsSeen(id));
          })
        );

        showToast(`${ids.length} notificación(es) marcada(s) como leída(s)`);
      } catch (error) {
        const msj =
          error.response?.data?.message || "Ocurrió un error inesperado";
        dispatch(
          fetchFailure(
            error.message || "Error al marcar notificaciones como leídas"
          )
        );
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { markMultipleAsRead };
};

export default useMarkMultipleNotificationsAsRead;
