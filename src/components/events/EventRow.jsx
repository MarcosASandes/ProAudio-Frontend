import React from "react";
import styles from "../../styles/events/eventTable.module.css";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getEnabledDisabledLabel,
  getEnabledDisabledBadgeClass,
} from "../../utils/getLabels";

const EventRow = ({ event, onDeleteEvent }) => {
  const navigate = useNavigate();

  return (
    <tr className={styles.row}>
      <td title={event.event_id}>{event.event_id}</td>
      <td title={event.name}>{event.name}</td>
      <td title={event.address}>{event.address}</td>
      <td title={event.description}>
        {event.description ? event.description : "-"}
      </td>
      <td title={event.distance}>{event.distance} KM</td>
      <td title={getEnabledDisabledLabel(event.status)}>
        <span
          className={`${styles.badge} ${
            styles[getEnabledDisabledBadgeClass(event.status)]
          }`}
        >
          {getEnabledDisabledLabel(event.status)}
        </span>
      </td>
      <td className={styles.actions}>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Editar ${event.name}`}
          title={`Editar ${event.name}`}
          onClick={() => navigate(`/event/${event.event_id}/edit`)}
        >
          <Pencil size={20} />
        </button>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Eliminar ${event.name}`}
          title={`Eliminar ${event.name}`}
          onClick={() => onDeleteEvent(event)}
          disabled={event.status === "DISABLED"}
        >
          <Trash
            size={20}
            color={event.status === "DISABLED" ? "#aaa" : "currentColor"}
          />
        </button>
      </td>
    </tr>
  );
};

export default EventRow;
