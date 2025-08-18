/*import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import useGetItemById from "../../hooks/items/useGetItemById";
import useGetStatuses from "../../hooks/items/useGetStatuses";
import useUpdateItem from "../../hooks/items/useUpdateItem";
import { selectSelectedItem } from "../../features/items/ItemSelector";
import { selectStatuses } from "../../features/items/ItemSelector";
import updateItemSchema from "../../validators/items/itemUpdateValidator";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import { getItemsStatusLabel } from "../../utils/getLabels";

const UpdateItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateItem } = useUpdateItem();

  useGetItemById(id);
  useGetStatuses();

  const item = useSelector(selectSelectedItem);
  const statuses = useSelector(selectStatuses);

  console.log("Item en el form:", item);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateItemSchema),
  });

  useEffect(() => {
    if (item) {
      reset({
        description: item.description || "",
        status: item.status || "",
      });
    }
  }, [item, reset]);

  const onSubmit = async (data) => {
    const payload = {
      description: data.description,
      status: data.status,
    };

    const response = await updateItem(id, payload);
    if (response) {
      navigate(`/product/${item.product_id}`);
    }
  };

  if (!item) {
    return <p className="text-light">Cargando datos del artículo...</p>;
  }

  return (
    <div className={`text-light ${stylesSectionContainer.sectionContainerDark}`}>
      <button
        className={`pb-2 ${stylesBackButtom.btnBackArrow}`}
        onClick={() => navigate("/item/" + id + "/details")}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <h2>Modificar Artículo #{item.item_id}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="mb-3">
          <label>Descripción</label>
          <input
            className="form-control"
            {...register("description")}
          />
          <p className="text-danger">{errors.description?.message}</p>
        </div>

        <div className="mb-3">
          <label>Estado</label>
          <select
            className="form-select"
            {...register("status")}
          >
            <option value="">Selecciona un estado</option>
            {statuses?.status_list?.map((status) => (
              <option key={status} value={status}>
                {getItemsStatusLabel(status)}
              </option>
            ))}
          </select>
          <p className="text-danger">{errors.status?.message}</p>
        </div>

        <button type="submit" className="btn btn-purple">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default UpdateItemForm;*/


/*----------------------------------------------- */


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { ArrowLeft, Pencil } from "lucide-react";
import useGetItemById from "../../hooks/items/useGetItemById";
import useGetStatuses from "../../hooks/items/useGetStatuses";
import useUpdateItem from "../../hooks/items/useUpdateItem";
import { selectSelectedItem, selectStatuses } from "../../features/items/ItemSelector";
import updateItemSchema from "../../validators/items/itemUpdateValidator";
import styles from "../../styles/items/updateItemForm.module.css";
import { getItemsStatusLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";

const UpdateItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateItem } = useUpdateItem();

  useGetItemById(id);
  useGetStatuses();

  const item = useSelector(selectSelectedItem);
  const statuses = useSelector(selectStatuses);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateItemSchema),
  });

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

  if (!item) return <p className={styles.loadingText}>Cargando datos del artículo...</p>;

  return (
    <div className={styles.formContainer}>
      <BackButton target={`/item/${id}/details`} />
      <h2 className={styles.title}>Modificar Artículo #{item.item_id}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Descripción</label>
          <input {...register("description")} />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Estado</label>
          <select {...register("status")}>
            <option value="">Selecciona un estado</option>
            {statuses?.status_list?.map((status) => (
              <option key={status} value={status}>
                {getItemsStatusLabel(status)}
              </option>
            ))}
          </select>
          {errors.status && <span className={styles.error}>{errors.status.message}</span>}
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
