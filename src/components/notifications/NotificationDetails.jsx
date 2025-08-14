/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/notifications/notificationDetails.module.css";
import { formatearFecha } from "../../utils/formatDate";
import useGetNotificationDetails from "../../hooks/notifications/useGetNotificationDetails";
import { selectSelectedNotification } from "../../features/notifications/NotificationSelector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getActionKeyLabel } from "../../utils/getLabels";

const NotificationDetails = () => {
  const { id } = useParams();
  const { fetchNotificationDetails } = useGetNotificationDetails();
  const notification = useSelector(selectSelectedNotification);
  const navigate = useNavigate();

  useEffect(() => {
      if (id) {
        fetchNotificationDetails(id);
      }
    }, [id, fetchNotificationDetails]);

  if (!notification) {
    return <div className={styles.loading}>Cargando notificación...</div>;
  }

  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <h1 className={styles.title}>{notification.title}</h1>
        <span
          className={`${styles.status} ${
            notification.is_solved ? styles.completed : styles.pending
          }`}
        >
          {notification.is_solved ? "Resuelta" : "No resuelta"}
        </span>
      </header>

      
      <p className={styles.description}>{notification.description}</p>

      
      {notification.action && (
        <section className={styles.actionBlock}>
          <h2 className={styles.sectionTitle}>Acción sugerida</h2>
          <p className={styles.actionKey}>{getActionKeyLabel(notification.action.key)}</p>
          <p className={styles.actionDescription}>{notification.action.description}</p>
        </section>
      )}

     
      {notification.type_data && notification.type_data.length > 0 && (
        <section className={styles.dataBlock}>
          <h2 className={styles.sectionTitle}>Datos relacionados</h2>
          <ul className={styles.dataList}>
            {notification.type_data.map((item, idx) => (
              <li key={idx} className={styles.dataItem}>
                <span className={styles.dataTitle}>{item.title}:</span>
                <span className={styles.dataValue}>{item.value}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      
      <footer className={styles.footer}>
        <span>Creada: {formatearFecha(notification.created_at)}</span>
        {notification.expiration_date && (
          <span>Expira: {formatearFecha(notification.expiration_date)}</span>
        )}
      </footer>
    </div>
  );
};

export default NotificationDetails;*/



/*----------------------------------------------- */


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/notifications/notificationDetails.module.css";
import { formatearFecha } from "../../utils/formatDate";
import useGetNotificationDetails from "../../hooks/notifications/useGetNotificationDetails";
import { selectSelectedNotification } from "../../features/notifications/NotificationSelector";
import { useSelector } from "react-redux";
import { getActionKeyLabel } from "../../utils/getLabels";
import { Info, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const NotificationDetails = () => {
  const { id } = useParams();
  const { fetchNotificationDetails } = useGetNotificationDetails();
  const notification = useSelector(selectSelectedNotification);

  const [showRelated, setShowRelated] = useState(false);

  useEffect(() => {
    if (id) fetchNotificationDetails(id);
  }, [id, fetchNotificationDetails]);

  if (!notification) {
    return <div className={styles.loading}>Cargando notificación...</div>;
  }

  const handleSolve = () => {
    if (notification.is_solved) return;
    // aquí invocarías tu acción real para "solucionar"
    console.log("Solucionar notificación:", notification.notification_id);
  };

  return (
    <div className={styles.container}>
      {/* Header: título + badge */}
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

      {/* Acción sugerida */}
      {notification.action && (
        <section className={styles.actionBlock}>
          <div className={styles.actionLeft}>
            <div className={styles.infoIconWrap} aria-hidden="true">
              <Info size={20} />
            </div>
            <div className={styles.actionText}>
              <p className={styles.actionKey}>
                {getActionKeyLabel(notification.action.key)}
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

      {/* Desplegable: Datos relacionados */}
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
                {notification.type_data.map((item, idx) => (
                  <li key={idx} className={styles.dataItem}>
                    {/* Mostramos solo el valor en UI; el título va como title para quien pase el mouse */}
                    <span className={styles.dataValue} title={item.title}>
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Footer con fechas (siempre visible) */}
      <footer className={styles.footer}>
        <span>Creada: {formatearFecha(notification.created_at)}</span>
        {notification.expiration_date && (
          <span>Expira: {formatearFecha(notification.expiration_date)}</span>
        )}
      </footer>
    </div>
  );
};

export default NotificationDetails;
