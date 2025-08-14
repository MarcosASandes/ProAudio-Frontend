/**
 * Componente de filtrado para la lista de proyectos.
 *
 * Este componente permite al usuario aplicar distintos filtros y opciones de búsqueda
 * sobre un listado de proyectos, incluyendo:
 * - Búsqueda por nombre.
 * - Filtrado por estado de pago.
 * - Filtrado por estado general del proyecto.
 * - Ordenamiento por fecha de inicio, nombre o fecha de finalización.
 * - Dirección de orden (ascendente o descendente).
 *
 * También incluye:
 * - Un toggle para mostrar/ocultar filtros en dispositivos móviles.
 * - Un modal para la selección múltiple de estados del proyecto.
 *
 * El componente se conecta al store de Redux para obtener las opciones de estado
 * y estado de pago mediante los selectores correspondientes, y utiliza hooks personalizados
 * para cargar dichas opciones desde la API.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} Interfaz de filtros para proyectos.
 */

import React, { useState } from "react";
import styles from "../../styles/projects/projectFilter.module.css";
import useGetAllProjectStatuses from "../../hooks/projects/useGetAllProjectStatuses";
import useGetAllProjectPaymentStatuses from "../../hooks/projects/useGetAllProjectPaymentStatuses";
import {
  selectAllPaymentStatusesProject,
  selectAllStatusesProject,
} from "../../features/projects/ProjectSelector";
import { useSelector } from "react-redux";
import {
  getProjectStatusLabel,
  getProjectPaymentStatusLabel,
  getDirectionLabel,
  getProjectSortByOptionsLabel,
} from "../../utils/getLabels";

const ProjectFilter = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionChange,
  filterStatus,
  onFilterStatusChange,
  filterPaymentStatus,
  onFilterPaymentStatusChange,
}) => {
  useGetAllProjectStatuses();
  useGetAllProjectPaymentStatuses();

  const statusOptions = useSelector(selectAllStatusesProject);
  const paymentOptions = useSelector(selectAllPaymentStatusesProject);
  const sortByOptions = ["start_date", "name", "end_date"];
  const directionOptions = ["desc", "asc"];
  const [showFilters, setShowFilters] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

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
          <div className="col-md-3 mb-2">
            <label className={styles.label}>Buscador:</label>
            <input
              type="text"
              className={`form-control ${styles.inputSearch}`}
              placeholder="Nombre..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="col-md-2 mb-2">
            <label className={styles.label}>Estado de pago:</label>
            <select
              className={`form-select ${styles.select}`}
              value={filterPaymentStatus}
              onChange={(e) => onFilterPaymentStatusChange(e.target.value)}
            >
              <option value="">Todos</option>
              {paymentOptions?.map((opt) => (
                <option key={opt} value={opt}>
                  {getProjectPaymentStatusLabel(opt)}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <label className={styles.label}>Ordenar por:</label>
            <select
              className={`form-select ${styles.select}`}
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              {sortByOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getProjectSortByOptionsLabel(opt)}
                </option>
              ))}
            </select>
          </div>

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

          <div className="col-md-2 mb-2">
            <label className={styles.label}>Estado:</label>
            <button
              className={styles.statusButton}
              onClick={() => setShowStatusModal(true)}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>

      {showStatusModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h5>Seleccionar Estado</h5>
              <button
                className={styles.modalClose}
                onClick={() => setShowStatusModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              {statusOptions?.map((status) => (
                <div className="form-check" key={status}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={status}
                    value={status}
                    checked={filterStatus?.includes(status)}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      onFilterStatusChange((prev) =>
                        prev?.includes(newValue)
                          ? prev.filter((s) => s !== newValue)
                          : [...prev, newValue]
                      );
                    }}
                  />
                  <label
                    className={`form-check-label ${styles.checkLabels}`}
                    htmlFor={status}
                  >
                    {getProjectStatusLabel(status)}
                  </label>
                </div>
              ))}
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setShowStatusModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectFilter;
