import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/clients/createClientForm.module.css";
import createClientValidator from "../../validators/clients/createClientValidator";

const CreateClientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createClientValidator),
  });

  const onSubmit = (data) => {
    console.log("Datos del cliente:", data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Nuevo Cliente</h2>

      <div className={styles.formGroup}>
        <label>Nombre / Empresa</label>
        <input type="text" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Teléfono</label>
        <input type="text" {...register("phone")} />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Dirección</label>
        <input type="text" {...register("address")} />
        {errors.address && <p className={styles.error}>{errors.address.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Detalles</label>
        <textarea rows="4" {...register("details")} />
        {errors.details && <p className={styles.error}>{errors.details.message}</p>}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Crear Cliente
      </button>
    </form>
  );
};

export default CreateClientForm;
