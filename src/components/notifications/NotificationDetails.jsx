import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/notifications/notificationDetails.module.css";
import { formatearFecha } from "../../utils/formatDate";
import useGetNotificationDetails from "../../hooks/notifications/useGetNotificationDetails";
import { selectSelectedNotification } from "../../features/notifications/NotificationSelector";
import { useSelector } from "react-redux";
import { getActionKeyLabel, getNotificationRelatedInfoLabel } from "../../utils/getLabels";
import { Info, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import useMarkNotificationAsRead from "../../hooks/notifications/useMarkNotificationAsRead";
import BackButton from "../global/BackButton";
import { getActionSolutionRoute } from "../../utils/getActionSolutionRoute";
import { useNavigate } from "react-router-dom";

const NotificationDetails = () => {
  const { id } = useParams();
  const { fetchNotificationDetails } = useGetNotificationDetails();
  const notification = useSelector(selectSelectedNotification);
  const { markAsRead } = useMarkNotificationAsRead();
  const [showRelated, setShowRelated] = useState(false);
  const navigate = useNavigate();
  const hasMarked = useRef(false);

  useEffect(() => {
    if (id) fetchNotificationDetails(id);
  }, [id, fetchNotificationDetails]);

  useEffect(() => {
    if (notification && !notification.is_seen && !hasMarked.current) {
      markAsRead(id);
      hasMarked.current = true;
    }
  }, [id, notification, markAsRead]);

  if (!notification) {
    return <div className={styles.loading}>Cargando notificación...</div>;
  }

  const handleSolve = () => {
    if (notification.is_solved) return;

    const routeRedirection = getActionSolutionRoute(notification);
    if (routeRedirection) {
      navigate(routeRedirection);
    } else {
      console.warn("No se encontró ruta para:", notification);
    }
  };

  return (
    <div className={styles.container}>
      <BackButton target={"/notifications"} />
      {/* Header*/}
      <header className={styles.headerRow}>
        <h1 className={styles.title}>{notification.title}</h1>
        <span
          className={`${styles.badge} ${
            notification.is_solved ? styles.badgeSolved : styles.badgePending
          }`}
        >
          {notification.is_solved ? "Resuelta" : "No resuelta"}
        </span>
      </header>

      {/* Descripción */}
      <p className={styles.description}>{notification.description}</p>

      {notification.action && (
        <section className={styles.actionBlock}>
          <div className={styles.actionLeft}>
            <div className={styles.infoIconWrap} aria-hidden="true">
              <Info size={20} />
              <div className={styles.tooltip}>
                Puedes solucionar la notificación clickeando en el botón
                <strong> "Solucionar"</strong>, te redireccionará al lugar
                correcto para que puedas completar la acción sugerida.
              </div>
            </div>
            <div className={styles.actionText}>
              <p className={styles.actionKey}>
                {getActionKeyLabel(notification.action.action_key)}
              </p>
              <p className={styles.actionDescription}>
                {notification.action.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.solveBtn}
            onClick={handleSolve}
            disabled={notification.is_solved}
            title={notification.is_solved ? "Ya resuelta" : "Solucionar"}
            aria-disabled={notification.is_solved}
          >
            <span>Solucionar</span>
            <ArrowRight size={18} />
          </button>
        </section>
      )}

      {notification.type_data && notification.type_data.length > 0 && (
        <section className={styles.relatedSection}>
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setShowRelated((v) => !v)}
            aria-expanded={showRelated}
            aria-controls="related-panel"
          >
            <span>Ver datos relacionados</span>
            {showRelated ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showRelated && (
            <div id="related-panel" className={styles.relatedPanel}>
              <ul className={styles.dataList}>
                {notification?.type_data.map((item, idx) => {
                  const formattedTitle =
                    item.title.charAt(0).toUpperCase() +
                    item.title.slice(1) +
                    ":";
                  return (
                    <li key={idx} className={styles.dataItem}>
                      <span className={styles.dataValue} title={item.title}>
                        <strong className={styles.relatedTitles}>
                          {formattedTitle}
                        </strong>{" "}
                        {item.title === "Fecha de inicio" || item.title === "Fecha de fin" ? formatearFecha(item.value) : getNotificationRelatedInfoLabel(item.value)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Footer con fecha */}
      <footer className={styles.footer}>
        <span>
          <strong>Creada:</strong> {formatearFecha(notification.created_at)}
        </span>
        {notification.expiration_date && (
          <span>
            <strong>Expira:</strong>{" "}
            {formatearFecha(notification.expiration_date)}
          </span>
        )}
      </footer>
    </div>
  );
};

export default NotificationDetails;
