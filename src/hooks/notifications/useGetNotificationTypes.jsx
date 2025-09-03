import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToastError } from "../../utils/toastUtils";
import { getNotificationTypes } from "../../services/notificationApiService";
import { setNotificationTypes } from "../../features/notifications/NotificationSlice";

const useGetNotificationTypes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotificationTypes = async () => {
      try {
        const data = await getNotificationTypes();
        dispatch(setNotificationTypes(data));
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchNotificationTypes();
  }, []);
};

export default useGetNotificationTypes;