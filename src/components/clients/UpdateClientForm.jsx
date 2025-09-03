import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/clients/updateClientForm.module.css";
import useUpdateClient from "../../hooks/clients/useUpdateClient";
import useGetClientById from "../../hooks/clients/useGetClientById";
import { selectSelectedClient } from "../../features/clients/ClientSelector";
import { updateClientValidator } from "../../validators/clients/updateClientValidator";
import { useNavigate } from "react-router-dom";
import BackButton from "../global/BackButton";

const UpdateClientForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { fetchClientById } = useGetClientById();
  const { updateClientFetch } = useUpdateClient();
  const navigate = useNavigate();

  const client = useSelector(selectSelectedClient);
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(updateClientValidator),
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
      address: "",
      details: "",
    },
  });

  useEffect(() => {
    fetchClientById(id);
  }, [id]);

  useEffect(() => {
    if (client) {
      const data = {
        name: client.name || "",
        phone_number: client.phone_number || "",
        email: client.email || "",
        address: client.address || "",
        details: client.details || "",
      };
      setInitialData(data);
      reset(data);
    }
  }, [client, reset]);

  const onSubmit = async (data) => {
    await updateClientFetch(id, data);
    setTimeout(() => {
      navigate(`/client/${id}`);
    }, 3000);
  };

  const handleReset = () => {
    if (initialData) {
      reset(initialData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={`/client/${id}`} />
      <h2 className={styles.title}>Actualizar Cliente</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input id="name" {...register("name")} />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone_number">Teléfono</label>
        <input id="phone_number" {...register("phone_number")} />
        {errors.phone_number && (
          <span className={styles.error}>{errors.phone_number.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" {...register("email")} />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address">Dirección</label>
        <input id="address" {...register("address")} />
        {errors.address && (
          <span className={styles.error}>{errors.address.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="details">Detalles</label>
        <textarea id="details" {...register("details")} />
        {errors.details && (
          <span className={styles.error}>{errors.details.message}</span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={`${styles.clientFormButtons} ${styles.submitBtn}`}
          disabled={isSubmitting || !isDirty}
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`${styles.clientFormButtons} ${styles.clearBtn}`}
        >
          Restablecer formulario
        </button>
      </div>
    </form>
  );
};

export default UpdateClientForm;
