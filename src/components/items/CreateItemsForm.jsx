/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useCreateItems from "../../hooks/items/useCreateItems";
import { createItemsSchemaArray } from "../../validators/items/createItemValidator";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import { toast } from "react-toastify";
import styles from "../../styles/items/createItemsForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";

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
    <>
      <button
        type="button"
        className={`mb-3 ${stylesBackButton.btnBackArrow}`}
        onClick={() => navigate(`/product/${productId}`)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>
      <div className={stylesSectionContainer.sectionContainerSoft}>
        {productOfStore?.model ? (
          <h2>
            Crear artículos para <span>{productOfStore.model}</span>
          </h2>
        ) : (
          <h2>Crear artículos</h2>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          {fields.map((field, index) => {
            const isEditing = field.editMode ?? true;

            return (
              <div key={field.id} className={styles.card}>
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
                        onWheel={(e) => e.target.blur()}
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
                        onWheel={(e) => e.target.blur()}
                        {...register(`items.${index}.quantity`)}
                      />
                      <p className="text-danger">
                        {errors?.items?.[index]?.quantity?.message}
                      </p>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className={`btn ${styles.btnPurple} btn-sm`}
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
                        className={`btn ${styles.btnRed} btn-sm`}
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
    </>
  );
};

export default CreateItemsForm;*/

/*-------------------------------------------------------------------------- */

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useCreateItems from "../../hooks/items/useCreateItems";
import { createItemsSchemaArray } from "../../validators/items/createItemValidator";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import { toast } from "react-toastify";
import styles from "../../styles/items/createItemsForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import SerialNumbersForm from "./SerialNumbersForm";
import { showToast, showToastError } from "../../utils/toastUtils";

const CreateItemsForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
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

    /*const payload = {
      items: data.items.map((item) => ({
        product_id: productId,
        description: item.description,
        price_bought: item.purchase_price,
        bought_at: item.purchase_date,
        amount_bought: item.quantity,
      })),
    };*/

    const payload = {
      items: data.items.map((item) => ({
        product_id: productId,
        description: item.description,
        price_bought: item.purchase_price,
        bought_at: item.purchase_date,
        amount_bought: item.quantity,
        serial_numbers: (item.serial_numbers ?? []).map(snObj => snObj.serial_number),
        item_range: item.itemRange,
      })),
    };

    const response = await itemsCreation(payload);
    if (response) {
      navigate(`/products/${productId}/items/created`);
    }
  };

  const onError = (errors) => {
    // Buscás el error específico del test
    // Por ejemplo, buscando el error en cada item:
    if (errors.items) {
      errors.items.forEach((itemError, index) => {
        if (itemError?.serialNumbers?.message) {
          showToastError(`Lote ${index + 1}: ${itemError.serialNumbers.message}`);
        }
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className={`mb-3 ${stylesBackButton.btnBackArrow}`}
        onClick={() => navigate(`/product/${productId}`)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>
      <div className={stylesSectionContainer.sectionContainerSoft}>
        {productOfStore?.model ? (
          <h2>
            Crear artículos para <span>{productOfStore.model}</span>
          </h2>
        ) : (
          <h2>Crear artículos</h2>
        )}

        <form onSubmit={handleSubmit(onSubmit, onError)} className="w-100">
          {fields.map((field, index) => (
            <div key={field.id} className="border p-3 mb-4 rounded">
              <h5>Lote {index + 1}</h5>

              {/* Descripción */}
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  {...register(`items[${index}].description`)}
                  className="form-control"
                />
                {errors.items?.[index]?.description && (
                  <p className="text-danger">
                    {errors.items[index].description.message}
                  </p>
                )}
              </div>

              {/* Precio de compra */}
              <div className="mb-3">
                <label className="form-label">Precio de compra</label>
                <input
                  type="number"
                  {...register(`items[${index}].purchase_price`)}
                  className="form-control"
                />
                {errors.items?.[index]?.purchase_price && (
                  <p className="text-danger">
                    {errors.items[index].purchase_price.message}
                  </p>
                )}
              </div>

              {/* Fecha de compra */}
              <div className="mb-3">
                <label className="form-label">Fecha de compra</label>
                <input
                  type="date"
                  {...register(`items[${index}].purchase_date`)}
                  className="form-control"
                />
                {errors.items?.[index]?.purchase_date && (
                  <p className="text-danger">
                    {errors.items[index].purchase_date.message}
                  </p>
                )}
              </div>

              {/* Cantidad */}
              <div className="mb-3">
                <label className="form-label">Cantidad comprada</label>
                <input
                  type="number"
                  {...register(`items[${index}].quantity`)}
                  className="form-control"
                />
                {errors.items?.[index]?.quantity && (
                  <p className="text-danger">
                    {errors.items[index].quantity.message}
                  </p>
                )}
              </div>

              {/* Rango de transmisión */}
              <div className="mb-3">
                <label className="form-label">
                  Rango de transmisión (itemRange)
                </label>
                <input
                  type="text"
                  {...register(`items[${index}].itemRange`)}
                  className="form-control"
                />
                {errors.items?.[index]?.itemRange && (
                  <p className="text-danger">
                    {errors.items[index].itemRange.message}
                  </p>
                )}
              </div>

              {/* Serial Numbers */}
              <SerialNumbersForm
                nestIndex={index}
                control={control}
                register={register}
                errors={errors}
              />

              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={() => remove(index)}
              >
                Eliminar lote
              </button>
            </div>
          ))}

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
    </>
  );
};

export default CreateItemsForm;
