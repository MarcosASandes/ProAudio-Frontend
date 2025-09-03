import React, { useState, useEffect } from "react";
import Pagination from "../global/Pagination";
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
  const [type, setType] = useState("");
  const [completed, setCompleted] = useState(false);
  const [page, setPage] = useState(1);
  const size = 10;
  const navigate = useNavigate();
  const { markMultipleAsRead } = useMarkMultipleNotificationsAsRead();
  useGetAllNotifications(page, size, type, completed, searchTerm);
  const notifications = useSelector(selectAllNotifications);
  const pageable = useSelector(selectNotificationsPageable);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleMarkAllRead = () => {
    const notificationIds = notifications
      .filter((n) => !n.is_seen)
      .map((n) => n.notification_id);
    markMultipleAsRead(notificationIds);
  }

  useEffect(() => {
    setPage(1);
  }, [searchTerm, type, completed]);
  

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
      <Pagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default NotificationView;
