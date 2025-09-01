import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import createEventValidator from "../../validators/events/createEventValidator";
import styles from "../../styles/events/createEventForm.module.css";
import { showToast } from "../../utils/toastUtils";
import BackButton from "../global/BackButton";

const CreateEmbeddedEventForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEventValidator),
  });

  const onSubmit = (data) => {
    const newEventObject = {
      name: data.name,
      address: data.address,
      distance: data.distance,
      description: data.description,
    };

    showToast("Evento creado temporalmente.");
    const from = location.state?.from;
    const projectId = location.state?.projectId;

    if (projectId) {
      localStorage.setItem(
        `temporaryProjectEvent:${projectId}`,
        JSON.stringify(newEventObject)
      );
    }

    if (from === "create-project") {
      localStorage.setItem(
        "temporaryProjectEvent",
        JSON.stringify(newEventObject)
      );
    }

    reset();
    setTimeout(() => {
      if (from === "create-project") {
        navigate("/project/create");
      } else if (from === "update-project" && projectId) {
        navigate("/project/" + projectId + "/edit");
      } else {
        navigate("/");
      }
    }, 1000);
  };

  const backButtonDirection = () => {
    const from = location.state?.from;
    const projectId = location.state?.projectId;
    if (from === "create-project") {
      return "/project/create";
    } else if (from === "update-project" && projectId) {
      return `/project/${projectId}/edit`;
    } else {
      return "/";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <BackButton target={backButtonDirection()} />

      <h2 className={styles.title}>Crear Evento para Proyecto</h2>

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
        <textarea id="txtDescription" rows="4" {...register("description")} />
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
          Usar este evento
        </button>
      </div>
    </form>
  );
};

export default CreateEmbeddedEventForm;
