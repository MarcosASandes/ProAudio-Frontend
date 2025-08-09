import React from "react";
import styles from "../../styles/clients/clientFilter.module.css";
//import useGetAllClientStatuses from "../../hooks/clients/useGetAllClientStatuses";
import { useSelector } from "react-redux";
//import { selectAllStatusesClient } from "../../features/clients/clientSelectors";
import {
  getEnabledDisabledLabel,
  getDirectionLabel,
  getClientSortByOptionsLabel,
} from "../../utils/getLabels";

const ClientFilter = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionChange,
  filterStatus,
  onFilterStatusChange,
}) => {
  /*useGetAllClientStatuses();

  const statusOptions = useSelector(selectAllStatusesClient);*/

  const statusOptions = ["ENABLED", "DISABLED"];
  const sortByOptions = ["id", "name", "phone_number"];
  const directionOptions = ["desc", "asc"];

  return (
    <div className={styles.container}>
      <div className="row align-items-end">
        <div className="col-md-4 mb-2">
          <label className={styles.label}>Buscador:</label>
          <input
            type="text"
            className={`form-control ${styles.inputSearch}`}
            placeholder="nombre..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="col-md-2 mb-2">
          <label className={styles.label}>Ordenar por:</label>
          <select
            className={`form-select ${styles.select}`}
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            {sortByOptions.map((opt) => (
              <option key={opt} value={opt}>
                {getClientSortByOptionsLabel(opt)}
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
          <select
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
  );
};

export default ClientFilter;
