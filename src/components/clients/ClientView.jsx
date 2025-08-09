/*import React, { useState } from "react";
import ClientFilter from "./ClientFilter";
import ClientTable from "./ClientTable";
import ClientPagination from "./ClientPagination";
import styles from "../../styles/clients/clientView.module.css";

const ClientView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState([]);

  const mockClients = [
    {
      client_id: 1,
      name: "Empresa Uno",
      phone_number: "123456789",
      email: "contacto@empresauno.com",
      address: "Av. Siempre Viva 123",
      details: "Cliente premium",
      status: "ENABLED",
    },
    {
      client_id: 2,
      name: "Cliente Dos",
      phone_number: "987654321",
      email: "dos@cliente.com",
      address: "Calle Falsa 456",
      details: "Cliente nuevo",
      status: "DISABLED",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Clientes</h2>
        <button className={styles.createButton}>Crear cliente</button>
      </div>

      <div className={styles.filterWrapper}>
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
      </div>

      <div className={styles.tableWrapper}>
        <ClientTable clients={mockClients} />
      </div>

      <div className={styles.paginationWrapper}>
        <ClientPagination pageable={pageable} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ClientView;*/

/*--------------------------------------- */

import React, { useState, useEffect } from "react";
import ClientFilter from "./ClientFilter";
import ClientTable from "./ClientTable";
import ClientPagination from "./ClientPagination";
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
  const [filterStatus, setFilterStatus] = useState(""); // string, porque ahora es select
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
      <ClientPagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default ClientView;
