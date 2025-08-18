/*import React, { useState, useEffect } from "react";
import styles from "../../styles/events/eventView.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllEvents from "../../hooks/events/useGetAllEvents";
import EventFilter from "./EventFilter";
import EventTable from "./EventTable";
import EventPagination from "./EventPagination";
import { selectEvents, selectEventsPageable } from "../../features/events/eventSelector";
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, filterStatus]);

  return (
    <div className={styles.container}>
        <BackButton target={"/"}/>
      <div className={styles.header}>
        <h2 className={styles.title}>Eventos</h2>
        <button className={styles.createButton} onClick={() => navigate("/event/create")}>Crear evento</button>
      </div>

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

      <div className={styles.tableWrapper}>
        <EventTable events={events} />
      </div>

      <EventPagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default EventView;*/


/*------------------------------------------- */


import React, { useState, useEffect } from "react";
import styles from "../../styles/events/eventView.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllEvents from "../../hooks/events/useGetAllEvents";
import EventFilter from "./EventFilter";
import EventTable from "./EventTable";
import EventPagination from "./EventPagination";
import { selectEvents, selectEventsPageable } from "../../features/events/eventSelector";
import BackButton from "../global/BackButton";
import useDeleteEvent from "../../hooks/events/useDeleteEvent";

const EventView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("ENABLED");
  const [page, setPage] = useState(1);
  const size = 10;
  const navigate = useNavigate();
  const deleteEvent = useDeleteEvent();

  const [deleteTarget, setDeleteTarget] = useState(null); // 👉 Evento a eliminar

  useGetAllEvents(page, size, sortBy, direction, filterStatus, searchTerm);

  const events = useSelector(selectEvents);
  const pageable = useSelector(selectEventsPageable);

  const handlePageChange = (newPage) => setPage(newPage);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, filterStatus]);

  const handleConfirmDelete = async () => {
    deleteEvent(deleteTarget.event_id);
    console.log("Eliminar evento:", deleteTarget.event_id);
    // 👉 Aquí dejas tu lógica de eliminación
    setDeleteTarget(null);
  };

  return (
    <div className={styles.container}>
      <BackButton target={"/"} />

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Eventos</h2>
        <button className={styles.createButton} onClick={() => navigate("/event/create")}>
          Crear evento
        </button>
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
        <EventTable events={events} onDeleteEvent={setDeleteTarget} />
      </div>

      {/* Paginación */}
      <EventPagination pageable={pageable} onPageChange={handlePageChange} />

      {/* Modal de confirmación */}
      {deleteTarget && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Eliminar evento</h2>
            <p className={styles.modalText}>
              ¿Seguro/a que deseas eliminar el evento{" "}
              <strong>{deleteTarget.name}</strong>? Esta acción no se podrá deshacer.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setDeleteTarget(null)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className={styles.confirmDeleteButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventView;
