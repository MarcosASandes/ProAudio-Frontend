import React from "react";
import styles from "../../styles/notifications/notificationTable.module.css";
import NotificationRow from "./NotificationRow";

const NotificationTable = ({ notifications = [] }) => {
  if (!notifications.length) {
    return <div className={styles.noData}>No hay notificaciones para mostrar.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="Listado de notificaciones">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Resuelta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif) => (
              <NotificationRow key={notif.notification_id} notification={notif} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationTable;
