import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/clients/createClientForm.module.css";
import createClientValidator from "../../validators/clients/createClientValidator";
import BackButton from "../global/BackButton";
import useCreateClient from "../../hooks/clients/useCreateClient";
import { useNavigate } from "react-router-dom";

const CreateClientForm = () => {
  const { clientCreation } = useCreateClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createClientValidator),
  });

  const onSubmit = (data) => {
    clientCreation(data);
    reset();
    setTimeout(() => {
        navigate("/clients");
      }, 3000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/clients"} />
      <h2 className={styles.title}>Crear cliente</h2>

      <div className={styles.formGroup}>
        <label htmlFor="txtName">Nombre (Persona / Empresa)</label>
        <input id="txtName" type="text" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="numPhone">Teléfono</label>
        <input id="numPhone" type="text" {...register("phone")} />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtEmail">Email</label>
        <input id="txtEmail" type="email" {...register("email")} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtAddress">Dirección</label>
        <input id="txtAddress" type="text" {...register("address")} />
        {errors.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtDetails">Detalles</label>
        <textarea id="txtDetails" rows="4" {...register("details")} />
        {errors.details && (
          <p className={styles.error}>{errors.details.message}</p>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.clearBtn} ${styles.clientFormButtons}`}
          onClick={() => reset()}
        >
          Limpiar formulario
        </button>

        <button
          type="submit"
          className={`${styles.submitBtn} ${styles.clientFormButtons}`}
        >
          Crear Cliente
        </button>
      </div>
    </form>
  );
};

export default CreateClientForm;
