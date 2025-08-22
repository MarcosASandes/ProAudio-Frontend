import React, { useState, useEffect } from "react";
import ClientFilter from "./ClientFilter";
import ClientTable from "./ClientTable";
import Pagination from "../global/Pagination";
import styles from "../../styles/clients/clientView.module.css";
import useGetAllClients from "../../hooks/clients/useGetAllClients";
import { useSelector } from "react-redux";
import {
  selectClients,
  selectClientsPageable,
} from "../../features/clients/ClientSelector";
import {
  getClientSortByOptionsLabel,
  getDirectionLabel,
  getEnabledDisabledLabel,
} from "../../utils/getLabels";
import { useNavigate } from "react-router-dom";

const ClientView = () => {
  // Estados de filtros y paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("ENABLED"); // string, porque ahora es select
  const [page, setPage] = useState(1);
  const size = 10; // fijo para la paginación
  const navigate = useNavigate();

  // Llamada al hook para obtener clientes según filtros
  useGetAllClients(page, size, sortBy, direction, filterStatus, searchTerm);

  // Obtener datos desde el store
  const clients = useSelector(selectClients);
  const pageable = useSelector(selectClientsPageable);

  // Opciones para selects (puedes ajustarlas o consumir desde el backend)
  const sortByOptions = ["id", "name", "phone_number"];
  const directionOptions = ["desc", "asc"];
  const statusOptions = ["ENABLED", "DISABLED"];

  // Cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, filterStatus]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Clientes</h2>
        <button className={styles.createButton} onClick={() => navigate("/client/create")}>Crear cliente</button>
      </div>

      {/* Filtros */}
      <ClientFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
      />

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        <ClientTable clients={clients} />
      </div>

      {/* Paginación */}
      <Pagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default ClientView;
