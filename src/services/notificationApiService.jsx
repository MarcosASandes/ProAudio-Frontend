import axiosInstance from "./axiosInstance";
import qs from "qs";

const notificationsMock = {
  notifications: [
    {
      notification_id: 1,
      title: "Proyecto no pagado!",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: false,
      is_completed: true,
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 2,
      title: "Entrega retrasada",
      description:
        "El envío programado para la fecha acordada no ha sido despachado debido a problemas logísticos.",
      is_solved: false,
      is_seen: true,
      is_completed: false,
      created_at: "2025-06-28T15:10:45",
    },
    {
      notification_id: 3,
      title: "Nuevo comentario",
      description:
        "Un cliente ha dejado un nuevo comentario en el proyecto 'Reforma de oficinas'.",
      is_solved: true,
      is_seen: false,
      is_completed: true,
      created_at: "2025-08-01T09:45:12",
    },
    {
      notification_id: 4,
      title: "Actualización de contrato",
      description:
        "Se han realizado cambios en las cláusulas del contrato. Revísalos antes de la fecha límite.",
      is_solved: false,
      is_seen: false,
      is_completed: false,
      created_at: "2025-08-10T17:22:05",
    },
    {
      notification_id: 5,
      title: "Pago recibido",
      description:
        "El pago correspondiente al proyecto 'Desarrollo Web Corporativo' ha sido acreditado con éxito.",
      is_solved: true,
      is_seen: true,
      is_completed: true,
      created_at: "2025-07-30T11:05:59",
    },
    {
      notification_id: 6,
      title: "Proyecto no pagado!",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: false,
      is_completed: false,
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 7,
      title: "Nuevo comentario",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: true,
      is_completed: true,
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 8,
      title: "Nuevo comentario",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: true,
      is_completed: false,
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 9,
      title: "Nuevo comentario",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: true,
      is_completed: true,
      created_at: "2025-07-12T20:30:30",
    },
    {
      notification_id: 10,
      title: "Nuevo comentario",
      description:
        "El carnaval o carnestolendas es una celebración que tiene lugar inmediatamente antes de la Cuaresma y que tiene fecha variable.",
      is_solved: false,
      is_seen: true,
      is_completed: false,
      created_at: "2025-07-12T20:30:30",
    },
  ],
  pageable: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalElements: 10,
    hasNext: false,
    hasPrevious: false,
  },
};

export const getNotificationTypes = async () => {
  const response = await axiosInstance.get("/notifications/types");
  return response.data;
};

export const getAllNotifications = async (
  page = 1,
  size = 10,
  direction = "desc",
  type = null,
  completed = false,
  /*solved = false,
  seen = false*/
) => {
  const params = {
    page: page - 1,
    size,
    direction,
    type,
    completed,
    /*solved,
    seen,*/
  };

  /*const response = await axiosInstance.get("/notification/all", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;*/
  return notificationsMock;
};

export const getNotificationDetails = async (id) => {
  const response = await axiosInstance.get(`/notifications/${id}`);
  return response.data;
};

export const readNotification = async (id) => {
  const response = await axiosInstance.post(`/notifications/${id}/read`);
  return response.data;
};
