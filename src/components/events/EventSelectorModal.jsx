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
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Seleccionar evento</h5>
        </div>

        <div className={styles.modalBody}>
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
              <option className={styles.selectOption} value="id">
                ID
              </option>
              <option className={styles.selectOption} value="name">
                Nombre
              </option>
              <option className={styles.selectOption} value="distance">
                Distancia
              </option>
            </select>

            <select
              className={styles.select}
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option className={styles.selectOption} value="asc">
                Asc
              </option>
              <option className={styles.selectOption} value="desc">
                Desc
              </option>
            </select>
          </div>

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
                            className={`${styles.selectRowButton} ${
                              selectedEvent?.event_id === event.event_id
                                ? styles.selectedButtonStyle
                                : ""
                            }`}
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
