import React, { useState, useEffect } from "react";
//import ClientFilter from "./ClientFilter";
//import ClientTable from "./ClientTable";
import NotificationPagination from "./NotificationPagination";
import styles from "../../styles/clients/clientView.module.css";
//import useGetAllClients from "../../hooks/clients/useGetAllClients";
import { useSelector } from "react-redux";
/*import {
  selectClients,
  selectClientsPageable,
} from "../../features/clients/ClientSelector";*/
import { useNavigate } from "react-router-dom";

const NotificationView = () => {
  // Estados de filtros y paginación
  const [searchTerm, setSearchTerm] = useState("");
  //const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("ENABLED"); // string, porque ahora es select
  const [page, setPage] = useState(1);
  const size = 10; // fijo para la paginación
  const navigate = useNavigate();

  // Llamada al hook para obtener clientes según filtros
  //useGetAllClients(page, size, sortBy, direction, filterStatus, searchTerm);

  // Obtener datos desde el store
  //const clients = useSelector(selectClients);
  //const pageable = useSelector(selectClientsPageable);

  // Cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, direction, filterStatus]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Notificaciones</h2>
        <button className={styles.createButton}>Marcar como leídas</button>
      </div>

      {/* Filtros 
      <ClientFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
      />*/}

      {/* Tabla 
      <div className={styles.tableWrapper}>
        <ClientTable clients={clients} />
      </div>*/}

      {/* Paginación */}
      <NotificationPagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default NotificationView;
