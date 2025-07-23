import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import updateEventValidator from "../../validators/events/updateEventValidator";
import useUpdateEvent from "../../hooks/events/useUpdateEvent";
import { selectSelectedEvent } from "../../features/events/eventSelector";
import { useParams } from "react-router-dom";
import styles from "../../styles/events/updateEventForm.module.css";
import useGetEventById from "../../hooks/events/useGetEventById";
import { useNavigate } from "react-router-dom";

const UpdateEventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useGetEventById(id);
  const selectedEvent = useSelector(selectSelectedEvent);
  const { updateEventHook } = useUpdateEvent();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateEventValidator),
  });

  useEffect(() => {
    if (selectedEvent) {
      setValue("name", selectedEvent.name);
      setValue("address", selectedEvent.address);
      setValue("distance", selectedEvent.distance);
      setValue("description", selectedEvent.description);
      setValue("status", selectedEvent.status);
    }
  }, [selectedEvent, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
    };

    updateEventHook(id, payload, () => {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    });

    //await updateEvent(payload, id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Modificar Evento</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre</label>
        <input type="text" className={styles.input} {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Dirección</label>
        <input type="text" className={styles.input} {...register("address")} />
        {errors.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Distancia (km)</label>
        <input
          type="number"
          className={styles.input}
          onWheel={(e) => e.target.blur()}
          {...register("distance")}
        />
        {errors.distance && (
          <p className={styles.error}>{errors.distance.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Descripción</label>
        <textarea
          rows="3"
          className={styles.textarea}
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Estado</label>
        <select className={styles.input} {...register("status")}>
          <option value="ENABLED">Habilitado</option>
          <option value="DISABLED">Deshabilitado</option>
        </select>
        {errors.status && (
          <p className={styles.error}>{errors.status.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Guardar cambios
      </button>
    </form>
  );
};

export default UpdateEventForm;
