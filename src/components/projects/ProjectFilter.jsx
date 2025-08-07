import React from "react";
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

  //ToDo: Consumir desde el backend
  const sortByOptions = ["start_date", "name", "end_date"];
  //ToDo: Consumir desde el backend
  const directionOptions = ["desc", "asc"];

  return (
    <div className={styles.container}>
      {/* Fila superior con buscador y estado de pago */}
      <div className="row">
        <div className="col-md-6 mb-2">
          <label className={styles.label}>Buscador:</label>
          <input
            type="text"
            className={`form-control ${styles.inputSearch}`}
            placeholder="nombre..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-2">
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
      </div>

      {/* Fila inferior con los demás filtros */}
      <div className="row">
        <div className="col-md-3 mb-2">
          <label className={styles.label}>Ordenar por:</label>
          <select
            className={`form-select ${styles.select}`}
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            {sortByOptions?.map((opt) => (
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
            {directionOptions?.map((opt) => (
              <option key={opt} value={opt}>
                {getDirectionLabel(opt)}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <label className={styles.label}>Estado:</label>
          <div className={styles.checkboxGroup}>
            {statusOptions?.map((status) => (
              <div className="form-check form-check-inline" key={status}>
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
                  className={`form-check-label ${styles.checkboxLabel}`}
                  htmlFor={status}
                >
                  {getProjectStatusLabel(status)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
