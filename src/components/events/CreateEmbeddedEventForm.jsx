/*import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import createEventValidator from "../../validators/events/createEventValidator";
import styles from "../../styles/events/createEventForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
import { showToast, showToastError } from "../../utils/toastUtils";

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

    // Guardamos el evento temporal en localStorage
    localStorage.setItem(
      "temporaryProjectEvent",
      JSON.stringify(newEventObject)
    );

    showToast("Evento creado temporalmente.");
    const from = location.state?.from;
    const projectId = location.state?.projectId;

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
      <button
        type="button"
        className={`mb-3 ${stylesBackButton.btnBackArrow}`}
        onClick={() => navigate(backButtonDirection())}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <h2 className={styles.title}>Crear Evento para Proyecto</h2>

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
        Usar este evento
      </button>
    </form>
  );
};

export default CreateEmbeddedEventForm;*/

/*-------------------------------- */

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import createEventValidator from "../../validators/events/createEventValidator";
import styles from "../../styles/events/createEventForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
import { showToast, showToastError } from "../../utils/toastUtils";
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

    // Guardamos el evento temporal en localStorage
    localStorage.setItem(
      "temporaryProjectEvent",
      JSON.stringify(newEventObject)
    );

    showToast("Evento creado temporalmente.");
    const from = location.state?.from;
    const projectId = location.state?.projectId;

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
