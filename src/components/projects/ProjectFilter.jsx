/*import React from "react";
import useGetAllProjectStatuses from "../../hooks/projects/useGetAllProjectStatuses";
import useGetAllProjectPaymentStatuses from "../../hooks/projects/useGetAllProjectPaymentStatuses";
import { selectAllPaymentStatusesProject, selectAllStatusesProject } from "../../features/projects/ProjectSelector";
import { useSelector } from "react-redux";
import { getStatusLabel } from "../../utils/startingProjectStatusLabel";

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

  const sortByOptions = [
    { value: "start_date", label: "Fecha de inicio" },
    { value: "name", label: "Nombre" },
    { value: "status", label: "Estado" },
    { value: "payment_status", label: "Estado de pago" },
  ];

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="row">
        <div className="col-md-3 mb-2">
          <label>Ordenar por:</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            {sortByOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <label>Dirección:</label>
          <select
            className="form-select"
            value={direction}
            onChange={(e) => onDirectionChange(e.target.value)}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <label>Estado:</label>
          <div className="d-flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <div className="form-check form-check-inline" key={status}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={status}
                  value={status}
                  checked={filterStatus.includes(status)}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    onFilterStatusChange((prev) =>
                      prev.includes(newValue)
                        ? prev.filter((s) => s !== newValue)
                        : [...prev, newValue]
                    );
                  }}
                />
                <label className="form-check-label" htmlFor={status}>
                  {getStatusLabel(status)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <label>Estado de pago:</label>
          <select
            className="form-select"
            value={filterPaymentStatus}
            onChange={(e) => onFilterPaymentStatusChange(e.target.value)}
          >
            <option value="">Todos</option>
            {paymentOptions.map(opt => (
              <option key={opt} value={opt}>{getStatusLabel(opt)}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;*/








{/*<div className={styles.container}>
      <input
        type="text"
        className={`form-control ${styles.inputSearch}`}
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="row">
        <div className="col-md-3 mb-2">
          <label className={styles.label}>Ordenar por:</label>
          <select
            className={`form-select ${styles.select}`}
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            {sortByOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
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
                      prev.includes(newValue)
                        ? prev.filter((s) => s !== newValue)
                        : [...prev, newValue]
                    );
                  }}
                />
                <label
                  className={`form-check-label ${styles.checkboxLabel}`}
                  htmlFor={status}
                >
                  {getStatusLabel(status)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <label className={styles.label}>Estado de pago:</label>
          <select
            className={`form-select ${styles.select}`}
            value={filterPaymentStatus}
            onChange={(e) => onFilterPaymentStatusChange(e.target.value)}
          >
            <option value="">Todos</option>
            {paymentOptions?.map((opt) => (
              <option key={opt} value={opt}>
                {getStatusLabel(opt)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>*/}






/*------------------------------ */

import React from "react";
import styles from "../../styles/projects/projectFilter.module.css";
import useGetAllProjectStatuses from "../../hooks/projects/useGetAllProjectStatuses";
import useGetAllProjectPaymentStatuses from "../../hooks/projects/useGetAllProjectPaymentStatuses";
import {
  selectAllPaymentStatusesProject,
  selectAllStatusesProject,
} from "../../features/projects/ProjectSelector";
import { useSelector } from "react-redux";
import { getStatusLabel } from "../../utils/startingProjectStatusLabel";

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

  const sortByOptions = [
    { value: "start_date", label: "Fecha de inicio" },
    { value: "name", label: "Nombre" },
    { value: "end_date", label: "Fecha de fin" },
  ];

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
                {getStatusLabel(opt)}
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
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
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
                  {getStatusLabel(status)}
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
