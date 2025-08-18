import React, { useState, useEffect } from "react";
import styles from "../../styles/events/eventView.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllEvents from "../../hooks/events/useGetAllEvents";
import EventFilter from "./EventFilter";
import EventTable from "./EventTable";
import EventPagination from "./EventPagination";
import { selectEvents, selectEventsPageable } from "../../features/events/EventSelector";
import BackButton from "../global/BackButton";

const EventView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("ENABLED");
  const [page, setPage] = useState(1);
  const size = 10;
  const navigate = useNavigate();

  useGetAllEvents(page, size, sortBy, direction, filterStatus, searchTerm);

  const events = useSelector(selectEvents);
  const pageable = useSelector(selectEventsPageable);


  // Cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, filterStatus]);

  return (
    <div className={styles.container}>
        <BackButton target={"/"}/>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Eventos</h2>
        <button className={styles.createButton} onClick={() => navigate("/event/create")}>Crear evento</button>
      </div>

      {/* Filtros */}
      <EventFilter
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
        <EventTable events={events} />
      </div>

      {/* Paginación */}
      <EventPagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default EventView;
