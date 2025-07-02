import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateEvent from "../../hooks/events/useCreateEvent";
import createEventValidator from "../../validators/events/createEventValidator";
import styles from "../../styles/events/createEventForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
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
    if (response){
        reset();
        setTimeout(() => {
        navigate(`/`);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <button
        type="button"
        className={`mb-3 ${stylesBackButton.btnBackArrow}`}
        onClick={() => navigate(`/`)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <h2 className={styles.title}>Crear Nuevo Evento</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre del evento</label>
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

      <button type="submit" className={styles.submitBtn}>
        Crear evento
      </button>
    </form>
  );
};

export default CreateEventForm;
