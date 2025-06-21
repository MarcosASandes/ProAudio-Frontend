//Versión funcional pero solo con un form.
/*import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCreateItems from "../../hooks/items/useCreateItems";
import { useNavigate, useParams } from "react-router-dom";
import { createItemsSchema } from "../../validators/createItemValidator";

const CreateItemsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createItemsSchema),
  });

  const { itemsCreation } = useCreateItems();
  const navigate = useNavigate();
  const { productId } = useParams();

  const onSubmit = async (data) => {
    //const correctFormatDate = data.bought_at.toISOString().slice(0, 19);
    const payload = {
      items: [
        {
          product_id: productId,
          description: data.description,
          price_bought: data.purchase_price,
          bought_at: data.bought_at,
          amount_bought: data.quantity,
        },
      ],
    };

    const response = await itemsCreation(payload);
    if (response) {
      navigate(`/products/${productId}/items/created`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label>Descripción</label>
        <input className="form-control" {...register("description")} />
        <p className="text-danger">{errors.description?.message}</p>
      </div>
      <div className="mb-3">
        <label>Precio de compra</label>
        <input className="form-control" {...register("purchase_price")} />
        <p className="text-danger">{errors.purchase_price?.message}</p>
      </div>
      <div className="mb-3">
        <label>Fecha de compra</label>
        <input
          type="datetime-local"
          className="form-control"
          {...register("purchase_date")}
        />
        <p className="text-danger">{errors.purchase_date?.message}</p>
      </div>
      <div className="mb-3">
        <label>Cantidad comprada</label>
        <input className="form-control" {...register("quantity")} />
        <p className="text-danger">{errors.quantity?.message}</p>
      </div>
      <button className="btn btn-primary" type="submit">
        Crear artículos
      </button>
    </form>
  );
};

export default CreateItemsForm;*/

/*--------------- */

/*Versión funcional con el useFieldsArray funcionando pero con mal diseño */
/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useCreateItems from "../../hooks/items/useCreateItems";
import { createItemsSchemaArray } from "../../validators/createItemValidator";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";

const CreateItemsForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createItemsSchemaArray),
    defaultValues: {
      items: [
        {
          description: "",
          purchase_price: "",
          purchase_date: "",
          quantity: "",
          editMode: true,
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "items",
  });

  const { itemsCreation } = useCreateItems();
  const navigate = useNavigate();
  const { productId } = useParams();
  useGetProductById(productId);
  const productOfStore = useSelector(selectSelectedProduct);
  console.log(productOfStore);

  const onSubmit = async (data) => {
    if (data.items.length === 0) {
      setError("items", {
        message: "Debes agregar al menos un lote de artículos",
      });
      return;
    }

    const payload = {
      items: data.items.map((item) => ({
        product_id: productId,
        description: item.description,
        price_bought: item.purchase_price,
        bought_at: item.purchase_date,
        amount_bought: item.quantity,
      })),
    };

    const response = await itemsCreation(payload);
    if (response) {
      navigate(`/products/${productId}/items/created`);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn-back-arrow mb-3"
        onClick={() => navigate(`/product/${productId}`)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      {productOfStore?.model ? (
        <h2>Crear artículos para {productOfStore.model}</h2>
      ) : (
        <h2>Crear artículos</h2>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const isEditing = field.editMode ?? true;

          return (
            <div key={field.id} className="border p-3 mb-2 rounded bg-light">
              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label>Descripción</label>
                    <input
                      className="form-control"
                      {...register(`items.${index}.description`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.description?.message}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Precio de compra</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      {...register(`items.${index}.purchase_price`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.purchase_price?.message}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Fecha de compra</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      {...register(`items.${index}.purchase_date`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.purchase_date?.message}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Cantidad comprada</label>
                    <input
                      type="number"
                      className="form-control"
                      {...register(`items.${index}.quantity`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.quantity?.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-success btn-sm me-2"
                    onClick={() => {
                      const updated = getValues("items").map((item, i) =>
                        i === index ? { ...item, editMode: false } : item
                      );
                      replace(updated);
                    }}
                  >
                    Aceptar lote
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => remove(index)}
                  >
                    Eliminar lote
                  </button>
                </>
              ) : (
                <div className="d-flex justify-content-between align-items-center bg-secondary bg-opacity-25 p-2 rounded">
                  <div>
                    <strong>{field.description}</strong> — $
                    {field.purchase_price} — {field.purchase_date} —{" "}
                    {field.quantity} unidades
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        const updated = getValues("items").map((item, i) =>
                          i === index ? { ...item, editMode: true } : item
                        );
                        replace(updated);
                      }}
                    >
                      Modificar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => remove(index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          className="btn btn-primary btn-sm mb-3"
          onClick={() =>
            append({
              description: "",
              purchase_price: "",
              purchase_date: "",
              quantity: "",
              editMode: true,
            })
          }
        >
          Agregar lote de artículos
        </button>

        {errors.items && typeof errors.items.message === "string" && (
          <p className="text-danger">{errors.items.message}</p>
        )}

        <button className="btn btn-success" type="submit">
          Crear todos los artículos
        </button>
      </form>
    </div>
  );
};

export default CreateItemsForm;*/

/*----------------------------------------- */

/*Misma versión que la anterior pero mejorando el diseño. */

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useCreateItems from "../../hooks/items/useCreateItems";
import { createItemsSchemaArray } from "../../validators/createItemValidator";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import { toast } from "react-toastify";

const CreateItemsForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createItemsSchemaArray),
    defaultValues: {
      items: [
        {
          description: "",
          purchase_price: "",
          purchase_date: "",
          quantity: "",
          editMode: true,
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "items",
  });

  const { itemsCreation } = useCreateItems();
  const navigate = useNavigate();
  const { productId } = useParams();
  useGetProductById(productId);
  const productOfStore = useSelector(selectSelectedProduct);
  console.log(productOfStore);

  const onSubmit = async (data) => {
    if (data.items.length === 0) {
      setError("items", {
        message: "Debes agregar al menos un lote de artículos",
      });
      return;
    }

    const payload = {
      items: data.items.map((item) => ({
        product_id: productId,
        description: item.description,
        price_bought: item.purchase_price,
        bought_at: item.purchase_date,
        amount_bought: item.quantity,
      })),
    };

    const response = await itemsCreation(payload);
    if (response) {
      navigate(`/products/${productId}/items/created`);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn-back-arrow mb-3"
        onClick={() => navigate(`/product/${productId}`)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      {productOfStore?.model ? (
        <h2>Crear artículos para <span>{productOfStore.model}</span></h2>
      ) : (
        <h2>Crear artículos</h2>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
        {fields.map((field, index) => {
          const isEditing = field.editMode ?? true;

          return (
            <div key={field.id} className="create-items-card">
              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label>Descripción</label>
                    <input
                      className="form-control"
                      {...register(`items.${index}.description`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.description?.message}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Precio de compra</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      {...register(`items.${index}.purchase_price`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.purchase_price?.message}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Fecha de compra</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      {...register(`items.${index}.purchase_date`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.purchase_date?.message}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label>Cantidad comprada</label>
                    <input
                      type="number"
                      className="form-control"
                      {...register(`items.${index}.quantity`)}
                    />
                    <p className="text-danger">
                      {errors?.items?.[index]?.quantity?.message}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-purple btn-sm"
                      onClick={() => {
                        const currentItem = getValues(`items.${index}`);

                        // Verificar campos vacíos
                        if (
                          !currentItem.description?.trim() ||
                          !currentItem.purchase_price ||
                          !currentItem.purchase_date ||
                          !currentItem.quantity
                        ) {
                          toast.error(
                            "Debes llenar todos los campos del lote antes de aceptarlo"
                          );
                          return;
                        }

                        // Si pasa la validación, poner editMode: false
                        const updated = getValues("items").map((item, i) =>
                          i === index ? { ...item, editMode: false } : item
                        );
                        replace(updated);
                      }}
                    >
                      ✔ Aceptar lote
                    </button>

                    <button
                      type="button"
                      className="btn btn-red btn-sm"
                      onClick={() => remove(index)}
                    >
                      ✖ Eliminar lote
                    </button>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-between align-items-center bg-secondary bg-opacity-10 p-2 rounded">
                  <div>
                    <strong>{field.description}</strong> — $
                    {field.purchase_price} — {field.purchase_date} —{" "}
                    {field.quantity} unidades
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        const updated = getValues("items").map((item, i) =>
                          i === index ? { ...item, editMode: true } : item
                        );
                        replace(updated);
                      }}
                    >
                      ✎ Modificar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => remove(index)}
                    >
                      ✖ Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* <button
          type="button"
          className="btn btn-purple btn-sm mb-3"
          onClick={() =>
            append({
              description: "",
              purchase_price: "",
              purchase_date: "",
              quantity: "",
              editMode: true,
            })
          }
        >
          ➕ Agregar lote de artículos
        </button>

        {errors.items && typeof errors.items.message === "string" && (
          <p className="text-danger">{errors.items.message}</p>
        )}

        <button className="btn btn-success" type="submit">
          ✅ Crear todos los artículos
        </button>*/}

        <div className="d-flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              append({
                description: "",
                purchase_price: "",
                purchase_date: "",
                quantity: "",
                editMode: true,
              })
            }
          >
            ➕ Agregar lote de artículos
          </button>

          <button className="btn btn-success btn-sm" type="submit">
            ✅ Crear todos los artículos
          </button>
        </div>

        {errors.items && typeof errors.items.message === "string" && (
          <p className="text-danger">{errors.items.message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateItemsForm;
