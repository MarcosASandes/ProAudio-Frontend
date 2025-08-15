import React, { useState } from "react";
import styles from "../../styles/items/itemFilter.module.css";
import {
  getItemsStatusLabel,
  getDirectionLabel,
  getItemsSortByOptionsLabel,
} from "../../utils/getLabels";

export default function ItemFilter({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionChange,
  statuses = [],
}) {
  const [showFilters, setShowFilters] = useState(false);

  const sortByOptions = ["ID", "LOCATION", "BOUGHT_AT"];
  const directionOptions = ["ASC", "DESC"];

  return (
    <>
      {/* Botón toggle para móvil */}
      <button
        className={styles.filterToggleBtn}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      {/* Contenedor de filtros */}
      <div className={`${styles.container} ${showFilters ? styles.show : ""}`}>
        <div className="row align-items-end">
          {/* Ordenar por */}
          <div className="col-md-2 mb-2">
            <label className={styles.label}>Ordenar por:</label>
            <select
              className={`form-select ${styles.select}`}
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              {sortByOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getItemsSortByOptionsLabel(opt)}
                </option>
              ))}
            </select>
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

          {/* Estado */}
          <div className="col-md-2 mb-2">
            <label className={styles.label}>Estado:</label>
            <select
              className={`form-select ${styles.select}`}
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="">Todos</option>
              {statuses.status_list && statuses.status_list.length > 0
                ? statuses.status_list.map((status) => (
                    <option key={status} value={status}>
                      {getItemsStatusLabel(status)}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
