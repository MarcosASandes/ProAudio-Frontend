import React, { useState, useEffect } from "react";
import NotificationPagination from "./NotificationPagination";
import styles from "../../styles/notifications/notificationView.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationFilter from "./NotificationFilter";
import useGetAllNotifications from "../../hooks/notifications/useGetAllNotifications";
import { selectAllNotifications, selectNotificationsPageable } from "../../features/notifications/NotificationSelector";
import NotificationTable from "./NotificationTable";
import useMarkMultipleNotificationsAsRead from "../../hooks/notifications/useMarkMultipleNotificationsAsRead";

const NotificationView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [direction, setDirection] = useState("desc");
  const [type, setType] = useState("");
  const [completed, setCompleted] = useState(false);
  const [page, setPage] = useState(1);
  const size = 10;
  const navigate = useNavigate();
  const { markMultipleAsRead } = useMarkMultipleNotificationsAsRead();
  useGetAllNotifications(page, size, direction, type, completed);
  const notifications = useSelector(selectAllNotifications);
  const pageable = useSelector(selectNotificationsPageable);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleMarkAllRead = () => {
    const notificationIds = notifications
      .filter((n) => !n.is_seen)
      .map((n) => n.notification_id);
    //markMultipleAsRead(notificationIds);
    console.log("Estas notif se pondrán en vistas: ", notificationIds); 
  }

  useEffect(() => {
    setPage(1);
  }, [searchTerm, direction, type, completed]);
  

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Notificaciones</h2>
        <button onClick={handleMarkAllRead} className={styles.createButton}>Marcar como leídas</button>
      </div>

      {/* Filtros */}
      <NotificationFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        direction={direction}
        onDirectionChange={setDirection}
        type={type}
        onTypeChange={setType}
        completed={completed}
        onCompletedChange={setCompleted}
      />

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        <NotificationTable notifications={notifications} />
      </div>

      {/* Paginación */}
      <NotificationPagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default NotificationView;
