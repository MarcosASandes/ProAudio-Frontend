import React from "react";
import styles from "../../styles/events/eventTable.module.css";
import EventRow from "./EventRow";

const EventTable = ({ events = [], onDeleteEvent }) => {
  if (!events.length) {
    return <div className={styles.noData}>No hay eventos para mostrar.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="Listado de eventos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección del evento</th>
              <th>Descripción</th>
              <th>Distancia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <EventRow key={event.event_id} event={event} onDeleteEvent={onDeleteEvent} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
