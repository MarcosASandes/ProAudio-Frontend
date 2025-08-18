import React from "react";
import styles from "../../styles/events/eventTable.module.css";
import { SquareArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEnabledDisabledLabel, getEnabledDisabledBadgeClass } from "../../utils/getLabels";

const EventRow = ({ event }) => {
  const navigate = useNavigate();

  return (
    <tr className={styles.row}>
      <td title={event.event_id}>{event.event_id}</td>
      <td title={event.name}>{event.name}</td>
      <td title={event.address}>{event.address}</td>
      <td title={event.description}>{event.description}</td>
      <td title={event.distance}>{event.distance}</td>
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
          aria-label={`Ver detalle de ${event.name}`}
          title={`Ver detalle de ${event.name}`}
          //onClick={() => navigate(`/client/${client.client_id}`)}
        >
          <SquareArrowRight size={22} />
        </button>
      </td>
    </tr>
  );
};

export default EventRow;
