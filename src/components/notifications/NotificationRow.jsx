import React, { useState } from "react";
import styles from "../../styles/notifications/notificationTable.module.css";
import { SquareArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getNotificationCompletedLabel } from "../../utils/getLabels";
import { formatearFecha } from "../../utils/formatDate";
import useMarkNotificationAsRead from "../../hooks/notifications/useMarkNotificationAsRead";

const NotificationRow = ({ notification }) => {
  const navigate = useNavigate();
  const [isEyeClosed, setIsEyeClosed] = useState(false);
  const { markAsRead } = useMarkNotificationAsRead();

  const handleEyeClick = (e, notId) => {
    e.stopPropagation();
    setIsEyeClosed(true);
    setTimeout(() => setIsEyeClosed(false), 700);
    markAsRead(notId);
  };

  return (
    <tr
      className={`${styles.row} ${!notification.is_seen ? styles.unread : ""}`}
    >
      <td title={notification.notification_id}>
        {notification.notification_id}
      </td>
      <td title={notification.title}>{notification.title}</td>
      <td title={notification.description}>{notification.description}</td>
      <td title={notification.created_at}>
        {formatearFecha(notification.created_at)}
      </td>

      {/* Badge de estado */}
      <td title={`${getNotificationCompletedLabel(notification.is_solved)}`}>
        <span
          className={`${styles.statusBadge} ${
            notification.is_solved ? styles.completed : styles.pending
          }`}
        >
          {getNotificationCompletedLabel(notification.is_solved)}
        </span>
      </td>

      {/* Botones de acción */}
      <td className={styles.actions}>
        <button
          type="button"
          className={styles.eyeBtn}
          aria-label={`Marcar como vista ${notification.title}`}
          title={`Marcar como vista ${notification.title}`}
          onClick={(e) => handleEyeClick(e, notification.notification_id)}
        >
          {isEyeClosed ? (
            <EyeOff
              className={`${styles.eyeIcon} ${styles.eyeBlink}`}
              size={22}
            />
          ) : (
            <Eye className={styles.eyeIcon} size={22} />
          )}
        </button>

        {/* Botón ver detalle */}
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Ver detalle de ${notification.title}`}
          title={`Ver detalle de ${notification.title}`}
          onClick={() =>
            navigate(`/notification/${notification.notification_id}`)
          }
        >
          <SquareArrowRight size={22} />
        </button>
      </td>
    </tr>
  );
};

export default NotificationRow;
