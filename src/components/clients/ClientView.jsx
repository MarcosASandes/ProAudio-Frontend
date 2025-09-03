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
import { useNavigate } from "react-router-dom";

const ClientView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("ENABLED");
  const [page, setPage] = useState(1);
  const size = 10;
  const navigate = useNavigate();

  useGetAllClients(page, size, sortBy, direction, filterStatus, searchTerm);

  const clients = useSelector(selectClients);
  const pageable = useSelector(selectClientsPageable);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, filterStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Clientes</h2>
        <button className={styles.createButton} onClick={() => navigate("/client/create")}>Crear cliente</button>
      </div>

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

      <div className={styles.tableWrapper}>
        <ClientTable clients={clients} />
      </div>

      <Pagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default ClientView;
