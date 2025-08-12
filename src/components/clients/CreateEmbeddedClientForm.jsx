import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/events/createEventForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
import { showToast, showToastError } from "../../utils/toastUtils";
import createClientValidator from "../../validators/clients/createClientValidator";

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
      phone_number: data.phone,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <button
        type="button"
        className={`mb-3 ${stylesBackButton.btnBackArrow}`}
        onClick={() => navigate("/project/create")}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <h2 className={styles.title}>Crear cliente para proyecto</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre</label>
        <input type="text" className={styles.input} {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <input type="email" className={styles.input} {...register("email")} />
        {errors.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Teléfono</label>
        <input type="text" className={styles.input} {...register("phone")} />
        {errors.phone && (
          <p className={styles.error}>{errors.phone.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Dirección</label>
        <input type="text" className={styles.input} {...register("address")} />
        {errors.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Detalles</label>
        <textarea
          rows="3"
          className={styles.textarea}
          {...register("details")}
        ></textarea>
        {errors.details && (
          <p className={styles.error}>{errors.details.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Usar este cliente
      </button>
    </form>
  );
};

export default CreateEmbeddedClientForm;
