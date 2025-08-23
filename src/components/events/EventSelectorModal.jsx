/*import React, { useState } from "react";
import { useSelector } from "react-redux";
import useGetAllEvents from "../../hooks/events/useGetAllEvents";
import Pagination from "../global/Pagination";
import {
  selectEvents,
  selectEventsPageable,
  selectEventsLoading,
  selectEventsError,
} from "../../features/events/eventSelector";

const EventSelectorModal = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const size = 10;

  useGetAllEvents(page, size);

  const events = useSelector(selectEvents);
  const pageable = useSelector(selectEventsPageable);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  return (
    <>
      {loading && <p>Cargando eventos...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Distancia</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event) => (
                  <tr key={event.event_id}>
                    <td>{event.event_id}</td>
                    <td>{event.name}</td>
                    <td>{event.address}</td>
                    <td>{event.distance} km</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onSelect(event)}
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination pageable={pageable} onPageChange={setPage} />
        </>
      )}
    </>
  );
};

export default EventSelectorModal;*/




/*------------------------------------------------ */



import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetAllEvents from "../../hooks/events/useGetAllEvents";
import Pagination from "../global/Pagination";
import {
  selectEvents,
  selectEventsPageable,
  selectEventsLoading,
  selectEventsError,
} from "../../features/events/eventSelector";
import styles from "../../styles/events/eventSelectorModal.module.css";
import { Target } from "lucide-react";

const EventSelectorModal = ({ onSelect, onClose }) => {
  const [page, setPage] = useState(1);
  const size = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const statusSelected = "ENABLED";
  const [selectedEvent, setSelectedEvent] = useState(null);
  useGetAllEvents(page, size, sortBy, direction, statusSelected, searchTerm);

  const events = useSelector(selectEvents);
  const pageable = useSelector(selectEventsPageable);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction]);

  const handleSelect = () => {
    if (!selectedEvent) return;
    onSelect(selectedEvent);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Seleccionar evento</h5>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Filtros */}
          <div className={styles.filters}>
            <input
              type="text"
              className={styles.inputSearch}
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="id">ID</option>
              <option value="name">Nombre</option>
              <option value="distance">Distancia</option>
            </select>

            <select
              className={styles.select}
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          {/* Contenido */}
          {loading && <p className={styles.loadingText}>Cargando eventos...</p>}
          {error && <p className={styles.errorText}>{error}</p>}

          {!loading && !error && (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events?.map((event) => (
                      <tr
                        key={event.event_id}
                        className={
                          selectedEvent?.event_id === event.event_id
                            ? styles.selectedRow
                            : ""
                        }
                      >
                        <td>{event.event_id}</td>
                        <td>{event.name}</td>
                        <td>{event.address}</td>
                        <td>
                          <button
                            className={styles.selectRowButton}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <Target size={16} /> Seleccionar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination pageable={pageable} onPageChange={setPage} />
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.confirmButton}
            disabled={!selectedEvent}
            onClick={handleSelect}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventSelectorModal;
