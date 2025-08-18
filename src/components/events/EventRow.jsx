/*import React from "react";
import styles from "../../styles/events/eventTable.module.css";
import { SquareArrowRight, Pencil, Trash } from "lucide-react";
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
          //onClick={() => navigate(`/event/${event.event_id}/edit`)}
        >
          <Trash size={20} />
        </button>
      </td>
    </tr>
  );
};

export default EventRow;*/


/*------------------------------------- */


/*import React, { useState } from "react";
import styles from "../../styles/events/eventTable.module.css";
import { SquareArrowRight, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getEnabledDisabledLabel,
  getEnabledDisabledBadgeClass,
} from "../../utils/getLabels";

const EventRow = ({ event }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = async () => {
    console.log("Eliminar evento:", event.event_id);
    setShowDeleteModal(false);
  };

  return (
    <>
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
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash size={20} />
          </button>
        </td>
      </tr>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Eliminar evento</h2>
            <p className={styles.modalText}>
              ¿Seguro/a que deseas eliminar este evento?{" "}
              <strong>Esta acción no se podrá deshacer.</strong>
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteModal(false)}
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
    </>
  );
};

export default EventRow;*/


/*------------------------------------- */


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
        >
          <Trash size={20} />
        </button>
      </td>
    </tr>
  );
};

export default EventRow;
