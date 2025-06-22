import React, { useEffect } from "react";
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
import updateItemSchema from "../../validators/itemUpdateValidator";

const UpdateItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ItemId del useParams:", id);

  const { updateItem } = useUpdateItem();

  // Obtener datos
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

  // Cuando cambie el item en store → poner valores iniciales
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
    <div className="text-light">
      <button
        className="btn-back-arrow mb-3"
        onClick={() => navigate(-1)}
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
            {statuses.status_list.map((status) => (
              <option key={status} value={status}>
                {status}
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

export default UpdateItemForm;
