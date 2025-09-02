import React from "react";
import styles from "../../styles/events/eventFilter.module.css";
import {
  getEnabledDisabledLabel,
  getDirectionLabel,
  getEventSortByOptionsLabel,
} from "../../utils/getLabels";
import { useState } from "react";

const EventFilter = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionChange,
  filterStatus,
  onFilterStatusChange,
}) => {

  const [showFilters, setShowFilters] = useState(false);
  const statusOptions = ["ENABLED", "DISABLED"];
  const sortByOptions = ["id", "name", "distance"];
  const directionOptions = ["desc", "asc"];

  return (
    <>
      <button
        className={styles.filterToggleBtn}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      <div className={`${styles.container} ${showFilters ? styles.show : ""}`}>
        <div className="row align-items-end">
          <div className="col-md-4 mb-2">
            <label htmlFor="txtEventSearcher" className={styles.label}>Buscador:</label>
            <input
            id="txtEventSearcher"
              type="text"
              className={`form-control ${styles.inputSearch}`}
              placeholder="Nombre..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="col-md-2 mb-2">
            <label htmlFor="slcEventSortBy" className={styles.label}>Ordenar por:</label>
            <select
            id="slcEventSortBy"
              className={`form-select ${styles.select}`}
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              {sortByOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getEventSortByOptionsLabel(opt)}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 mb-2">
            <label htmlFor="slcEventDirection" className={styles.label}>Dirección:</label>
            <select
            id="slcEventDirection"
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

          <div className="col-md-2 mb-2">
            <label htmlFor="slcEventStatus" className={styles.label}>Estado:</label>
            <select
            id="slcEventStatus"
              className={`form-select ${styles.select}`}
              value={filterStatus}
              onChange={(e) => onFilterStatusChange(e.target.value)}
            >
              <option value="">Todos</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {getEnabledDisabledLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventFilter;
