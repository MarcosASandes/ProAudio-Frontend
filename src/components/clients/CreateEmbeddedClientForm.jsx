import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import createClientValidator from "../../validators/clients/createClientValidator";
import styles from "../../styles/events/createEventForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
import { showToast, showToastError } from "../../utils/toastUtils";
import BackButton from "../global/BackButton";

const CreateEmbeddedClientForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createClientValidator),
  });

  const onSubmit = (data) => {
    const newClientObject = {
      name: data.name,
      address: data.address,
      email: data.email,
      phone: data.phone,
      details: data.details,
    };

    // Guardamos el evento temporal en localStorage
    localStorage.setItem("temporaryProjectClient", JSON.stringify(newClientObject));

    showToast("Cliente creado temporalmente.");
    const from = location.state?.from;
    const projectId = location.state?.projectId;

    reset();
    setTimeout(() => {
      if (from === "create-project"){
        navigate("/project/create");
      } else if (from === "update-project" && projectId){
        navigate("/project/" + projectId + "/edit");
      } else{
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

      <h2 className={styles.title}>Crear cliente para proyecto</h2>

      <div className={styles.formGroup}>
        <label htmlFor="txtName">Nombre</label>
        <input type="text" id="txtName" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtEmail">Email</label>
        <input type="email" id="txtEmail" {...register("email")} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtTel">Teléfono</label>
        <input type="text" id="txtTel" {...register("phone")} />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtAddress">Dirección</label>
        <input type="text" id="txtAddress" {...register("address")} />
        {errors.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtDetails">Detalles</label>
        <textarea rows="3" id="txtDetails" {...register("details")}></textarea>
        {errors.details && (
          <p className={styles.error}>{errors.details.message}</p>
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
          Usar este cliente
        </button>
      </div>
    </form>
  );
};

export default CreateEmbeddedClientForm;
