import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../services/notificationApiService";
import { fetchSuccessRecent, fetchFailure, fetchStart } from "../../features/notifications/NotificationSlice";

const useGetRecentNotifications = (
  page = 0,
  size = 5,
  direction = "desc",
  type = null,
  is_completed = false,
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
          is_completed,
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
  }, [dispatch, page, size, direction, type, solved, seen, is_completed]);
};

export default useGetRecentNotifications;


/* Version con el SETINTERVAL

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../services/notificationApiService";
import {
  fetchSuccessRecent,
  fetchFailure,
  fetchStart
} from "../../features/notifications/NotificationSlice";

const useGetRecentNotifications = (
  page = 0,
  size = 5,
  direction = "desc",
  type = null,
  solved = false,
  seen = false,
  intervalMinutes = 15
) => {
  const dispatch = useDispatch();
  const fetchRef = useRef();

  // Guardamos la última versión de la función para que el intervalo no dependa de todos los argumentos
  useEffect(() => {
    fetchRef.current = async () => {
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
  }, [dispatch, page, size, direction, type, solved, seen]);

  useEffect(() => {
    // Llamada inicial
    fetchRef.current();

    // Llamadas periódicas
    const intervalId = setInterval(() => {
      if (fetchRef.current) {
        fetchRef.current();
      }
    }, intervalMinutes * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [intervalMinutes]);
};

export default useGetRecentNotifications;

*/
