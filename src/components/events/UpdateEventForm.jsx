/*import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/events/updateEventForm.module.css";
import updateEventValidator from "../../validators/events/updateEventValidator";
import useUpdateEvent from "../../hooks/events/useUpdateEvent";
import useGetEventById from "../../hooks/events/useGetEventById";
import { selectSelectedEvent } from "../../features/events/eventSelector";
import { getEnabledDisabledLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";

const UpdateEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateEventHook } = useUpdateEvent();
  const selectedEvent = useSelector(selectSelectedEvent);
  useGetEventById(id);

  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(updateEventValidator),
    defaultValues: {
      name: "",
      address: "",
      distance: "",
      description: "",
      status: "",
    },
  });

  useEffect(() => {
    if (selectedEvent) {
      const data = {
        name: selectedEvent.name || "",
        address: selectedEvent.address || "",
        distance: selectedEvent.distance || "",
        description: selectedEvent.description || "",
        status: selectedEvent.status || "",
      };
      setInitialData(data);
      reset(data);
    }
  }, [selectedEvent, reset]);

  const onSubmit = async (data) => {
    await updateEventHook(id, data, () => {
      setTimeout(() => {
        navigate(`/events`);
      }, 3000);
    });
  };

  const handleReset = () => {
    if (initialData) {
      reset(initialData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={`/events`} />
      <h2 className={styles.title}>Actualizar Evento</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input id="name" {...register("name")} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address">Dirección</label>
        <input id="address" {...register("address")} />
        {errors.address && <span className={styles.error}>{errors.address.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="distance">Distancia (km)</label>
        <input
          id="distance"
          type="number"
          onWheel={(e) => e.target.blur()}
          {...register("distance")}
        />
        {errors.distance && <span className={styles.error}>{errors.distance.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <textarea id="description" {...register("description")} />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">Estado</label>
        <select id="status" {...register("status")}>
          <option value="">Seleccionar estado</option>
          {["ENABLED", "DISABLED"].map((status) => (
            <option key={status} value={status}>
              {getEnabledDisabledLabel(status)}
            </option>
          ))}
        </select>
        {errors.status && <span className={styles.error}>{errors.status.message}</span>}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={`${styles.eventFormButtons} ${styles.submitBtn}`}
          disabled={isSubmitting || !isDirty}
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`${styles.eventFormButtons} ${styles.clearBtn}`}
        >
          Restablecer formulario
        </button>
      </div>
    </form>
  );
};

export default UpdateEventForm;*/



/*---------------------------------------------------- */


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/events/updateEventForm.module.css";
import updateEventValidator from "../../validators/events/updateEventValidator";
import useUpdateEvent from "../../hooks/events/useUpdateEvent";
import useGetEventById from "../../hooks/events/useGetEventById";
import { selectSelectedEvent } from "../../features/events/eventSelector";
import BackButton from "../global/BackButton";

const UpdateEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateEventHook } = useUpdateEvent();
  const selectedEvent = useSelector(selectSelectedEvent);
  useGetEventById(id);

  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(updateEventValidator),
    defaultValues: {
      name: "",
      address: "",
      distance: "",
      description: "",
    },
  });

  useEffect(() => {
    if (selectedEvent) {
      const data = {
        name: selectedEvent.name || "",
        address: selectedEvent.address || "",
        distance: selectedEvent.distance || "",
        description: selectedEvent.description || "",
      };
      setInitialData(data);
      reset(data);
    }
  }, [selectedEvent, reset]);

  const onSubmit = async (data) => {
    await updateEventHook(id, data, () => {
      setTimeout(() => {
        navigate(`/events`);
      }, 3000);
    });
  };

  const handleReset = () => {
    if (initialData) {
      reset(initialData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={`/events`} />
      <h2 className={styles.title}>Actualizar Evento</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input id="name" {...register("name")} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address">Dirección</label>
        <input id="address" {...register("address")} />
        {errors.address && <span className={styles.error}>{errors.address.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="distance">Distancia (km)</label>
        <input
          id="distance"
          type="number"
          onWheel={(e) => e.target.blur()}
          {...register("distance")}
        />
        {errors.distance && <span className={styles.error}>{errors.distance.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <textarea id="description" {...register("description")} />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={`${styles.eventFormButtons} ${styles.submitBtn}`}
          disabled={isSubmitting || !isDirty}
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`${styles.eventFormButtons} ${styles.clearBtn}`}
        >
          Restablecer formulario
        </button>
      </div>
    </form>
  );
};

export default UpdateEventForm;
