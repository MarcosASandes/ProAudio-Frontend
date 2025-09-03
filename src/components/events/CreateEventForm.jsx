import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/events/createEventForm.module.css";
import BackButton from "../global/BackButton";
import useCreateEvent from "../../hooks/events/useCreateEvent";
import createEventValidator from "../../validators/events/createEventValidator";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const { eventCreation } = useCreateEvent();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEventValidator),
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      address: data.address,
      distance: data.distance,
      description: data.description,
    };

    const response = await eventCreation(payload);
    if (response) {
      reset();
      setTimeout(() => {
        navigate("/events");
      }, 3000);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/events"} />
      <h2 className={styles.title}>Crear evento</h2>

      <div className={styles.formGroup}>
        <label htmlFor="txtName">Nombre del evento</label>
        <input id="txtName" type="text" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtAddress">Dirección</label>
        <input id="txtAddress" type="text" {...register("address")} />
        {errors.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="numDistance">Distancia (km)</label>
        <input
          id="numDistance"
          type="number"
          onWheel={(e) => e.target.blur()}
          {...register("distance")}
        />
        {errors.distance && (
          <p className={styles.error}>{errors.distance.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtDescription">Descripción</label>
        <textarea
          id="txtDescription"
          rows="4"
          {...register("description")}
        />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.clearBtn} ${styles.eventFormButtons}`}
          onClick={() => reset()}
        >
          Limpiar formulario
        </button>

        <button
          type="submit"
          className={`${styles.submitBtn} ${styles.eventFormButtons}`}
        >
          Crear evento
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;
