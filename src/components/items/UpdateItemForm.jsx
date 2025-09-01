import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import useGetItemById from "../../hooks/items/useGetItemById";
import useUpdateItem from "../../hooks/items/useUpdateItem";
import {
  selectSelectedItem,
} from "../../features/items/ItemSelector";
import updateItemSchema from "../../validators/items/itemUpdateValidator";
import styles from "../../styles/items/updateItemForm.module.css";
import { getItemsStatusLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import useGetItemStatusesById from "../../hooks/items/useGetItemStatusesById";
import { selectStatusesById } from "../../features/items/ItemSelector";

const UpdateItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateItem } = useUpdateItem();
  const { fetchStatusesByItemId } = useGetItemStatusesById();

  useGetItemById(id);
  //useGetStatuses();

  const item = useSelector(selectSelectedItem);
  const statuses = useSelector(selectStatusesById);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateItemSchema),
  });

  useEffect(() => {
    fetchStatusesByItemId(id);
  }, [id]);

  useEffect(() => {
    if (item) {
      reset({
        description: item.description || "",
        status: item.status || "",
      });
    }
  }, [item, reset]);

  const onSubmit = async (data) => {
    const payload = { description: data.description, status: data.status };
    const response = await updateItem(id, payload);
    if (response) {
      navigate(`/item/${id}/details`);
    }
  };

  if (!item)
    return <p className={styles.loadingText}>Cargando datos del artículo...</p>;

  return (
    <div className={styles.formContainer}>
      <BackButton target={`/item/${id}/details`} />
      <h2 className={styles.title}>Modificar Artículo #{item.item_id}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Descripción</label>
          <input {...register("description")} />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Estado</label>
          <select {...register("status")}>
            <option disabled value={item.status}>{getItemsStatusLabel(item.status)}</option>
            {statuses?.length > 0 ? (
              statuses?.map((status) => (
                <option key={status} value={status}>
                  {getItemsStatusLabel(status)}
                </option>
              ))
            ) : (
              <option value="">Cargando estados...</option>
            )}
          </select>
          {errors.status && (
            <span className={styles.error}>{errors.status.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={`${styles.formButton} ${styles.submitBtn}`}
          disabled={!isDirty || isSubmitting}
        >
          <Pencil size={16} /> Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
