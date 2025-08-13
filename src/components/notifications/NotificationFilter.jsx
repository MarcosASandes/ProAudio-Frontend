import React, { useState } from "react";
import styles from "../../styles/notifications/notificationFilter.module.css";
import { getDirectionLabel, getNotificationsTypeLabel } from "../../utils/getLabels";

const NotificationFilter = ({
  searchTerm,
  onSearchChange,
  direction,
  onDirectionChange,
  type,
  onTypeChange,
  completed,
  onCompletedChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const directionOptions = ["desc", "asc"];
  const typeOptions = ["Client", "Project", "Product"];
  const completedOptions = [
    { label: "Completada", value: "true" },
    { label: "No completada", value: "false" },
  ];

  return (
    <>
      {/* Botón toggle visible solo en móvil */}
      <button
        className={styles.filterToggleBtn}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      <div className={`${styles.container} ${showFilters ? styles.show : ""}`}>
        <div className="row align-items-end">
          {/* Buscador */}
          <div className="col-md-4 mb-2">
            <label className={styles.label}>Buscador:</label>
            <input
              type="text"
              className={`form-control ${styles.inputSearch}`}
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Dirección */}
          <div className="col-md-2 mb-2">
            <label className={styles.label}>Dirección:</label>
            <select
              className={`form-select ${styles.select}`}
              value={direction}
              onChange={(e) => onDirectionChange(e.target.value)}
            >
              {directionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getDirectionLabel(opt)}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div className="col-md-3 mb-2">
            <label className={styles.label}>Tipo:</label>
            <select
              className={`form-select ${styles.select}`}
              value={type}
              onChange={(e) => onTypeChange(e.target.value)}
            >
              <option value="">Todos</option>
              {typeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getNotificationsTypeLabel(opt)}
                </option>
              ))}
            </select>
          </div>

          {/* Estado */}
          <div className="col-md-3 mb-2">
            <label className={styles.label}>Estado:</label>
            <select
              className={`form-select ${styles.select}`}
              value={completed}
              onChange={(e) => onCompletedChange(e.target.value)}
            >
              <option value="">Todos</option>
              {completedOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationFilter;
