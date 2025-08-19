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

    const payload = {
      items: data?.items?.map((item) => ({
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

            
              <div className="mb-3">
                <label className="form-label">Precio de compra</label>
                <input
                  type="number"
                  {...register(`items[${index}].purchase_price`)}
                  className="form-control"
                  onWheel={(e) => e.target.blur()}
                />
                {errors.items?.[index]?.purchase_price && (
                  <p className="text-danger">
                    {errors.items[index].purchase_price.message}
                  </p>
                )}
              </div>

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

             
              <div className="mb-3">
                <label className="form-label">Cantidad comprada</label>
                <input
                  type="number"
                  {...register(`items[${index}].quantity`)}
                  className="form-control"
                  onWheel={(e) => e.target.blur()}
                />
                {errors.items?.[index]?.quantity && (
                  <p className="text-danger">
                    {errors.items[index].quantity.message}
                  </p>
                )}
              </div>

             
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

export default CreateItemsForm;*/

/*----------------------------------------------------- */

/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useCreateItems from "../../hooks/items/useCreateItems";
import { createItemsSchemaArray } from "../../validators/items/createItemValidator";
import { useSelector } from "react-redux";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import styles from "../../styles/items/createItemsForm.module.css";
import BackButton from "../global/BackButton";
import SerialNumbersForm from "./SerialNumbersForm";
import { showToastError } from "../../utils/toastUtils";

const CreateItemsForm = () => {
  const {
    register,
    handleSubmit,
    control,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const { itemsCreation } = useCreateItems();
  const navigate = useNavigate();
  const { productId } = useParams();
  useGetProductById(productId);
  const productOfStore = useSelector(selectSelectedProduct);

  const onSubmit = async (data) => {
    if (data.items.length === 0) {
      setError("items", {
        message: "Debes agregar al menos un lote de artículos",
      });
      return;
    }

    const payload = {
      items: data?.items?.map((item) => ({
        product_id: productId,
        description: item.description,
        price_bought: item.purchase_price,
        bought_at: item.purchase_date,
        amount_bought: item.quantity,
        serial_numbers: (item.serial_numbers ?? []).map(
          (snObj) => snObj.serial_number
        ),
        item_range: item.itemRange,
      })),
    };

    const response = await itemsCreation(payload);
    if (response) {
      navigate(`/products/${productId}/items/created`);
    }
  };

  const onError = (errors) => {
    if (errors.items) {
      errors.items.forEach((itemError, index) => {
        if (itemError?.serialNumbers?.message) {
          showToastError(
            `Lote ${index + 1}: ${itemError.serialNumbers.message}`
          );
        }
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
      <BackButton target={`/product/${productId}`} />
      {productOfStore?.model ? (
        <h2 className={styles.title}>
          Crear artículos para <span>{productOfStore.model}</span>
        </h2>
      ) : (
        <h2 className={styles.title}>Crear artículos</h2>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className={styles.lotCard}>
          <h5 className={styles.lotTitle}>Lote {index + 1}</h5>

          
          <div className={styles.formGroup}>
            <label>Descripción</label>
            <input type="text" {...register(`items[${index}].description`)} />
            {errors.items?.[index]?.description && (
              <p className={styles.error}>
                {errors.items[index].description.message}
              </p>
            )}
          </div>

         
          <div className={styles.formGroup}>
            <label>Precio de compra</label>
            <input
              type="number"
              {...register(`items[${index}].purchase_price`)}
              onWheel={(e) => e.target.blur()}
            />
            {errors.items?.[index]?.purchase_price && (
              <p className={styles.error}>
                {errors.items[index].purchase_price.message}
              </p>
            )}
          </div>

          
          <div className={styles.formGroup}>
            <label>Fecha de compra</label>
            <input type="date" {...register(`items[${index}].purchase_date`)} />
            {errors.items?.[index]?.purchase_date && (
              <p className={styles.error}>
                {errors.items[index].purchase_date.message}
              </p>
            )}
          </div>

        
          <div className={styles.formGroup}>
            <label>Cantidad comprada</label>
            <input
              type="number"
              {...register(`items[${index}].quantity`)}
              onWheel={(e) => e.target.blur()}
            />
            {errors.items?.[index]?.quantity && (
              <p className={styles.error}>
                {errors.items[index].quantity.message}
              </p>
            )}
          </div>

         
          <div className={styles.formGroup}>
            <label>Rango de transmisión (itemRange)</label>
            <input type="text" {...register(`items[${index}].itemRange`)} />
            {errors.items?.[index]?.itemRange && (
              <p className={styles.error}>
                {errors.items[index].itemRange.message}
              </p>
            )}
          </div>

        
          <SerialNumbersForm
            nestIndex={index}
            control={control}
            register={register}
            errors={errors}
          />

          <button
            type="button"
            className={`${styles.clearBtn} ${styles.lotDeleteBtn}`}
            onClick={() => remove(index)}
          >
            Eliminar lote
          </button>
        </div>
      ))}

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.submitBtn} ${styles.clientFormButtons}`}
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

        <button
          className={`${styles.submitBtn} ${styles.clientFormButtons}`}
          type="submit"
        >
          ✅ Crear todos los artículos
        </button>
      </div>

      {errors.items && typeof errors.items.message === "string" && (
        <p className={styles.error}>{errors.items.message}</p>
      )}
    </form>
  );
};

export default CreateItemsForm;*/

/*------------------------------------------------- */

/*import React, { useState } from "react";
import styles from "../../styles/items/createItemsForm.module.css";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import BackButton from "../global/BackButton";

const CreateItemsForm = () => {
  const [lotes, setLotes] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", cantidad: "", precio: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLote = () => {
    if (!formData.nombre || !formData.cantidad || !formData.precio) return;

    if (editingIndex !== null) {
      // Editando un lote
      const nuevosLotes = [...lotes];
      nuevosLotes[editingIndex] = formData;
      setLotes(nuevosLotes);
      setEditingIndex(null);
    } else {
      // Nuevo lote
      setLotes([...lotes, formData]);
    }

    setFormData({ nombre: "", cantidad: "", precio: "" });
  };

  const handleEdit = (index) => {
    setFormData(lotes[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setLotes(lotes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviar al backend:", lotes);
    // aquí se integrará con la API
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.formSection}>
        <BackButton icon={<ArrowLeft size={20} />} />
        <h2 className={styles.title}>Crear artículos para el proyecto</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Nombre del lote</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleAddLote}
              className={styles.addButton}
            >
              {editingIndex !== null ? "Actualizar lote" : "Agregar lote"}
            </button>
            <button type="submit" className={styles.submitButton}>
              Crear artículos
            </button>
          </div>
        </form>
      </div>

     
      <div className={styles.cartSection}>
        <h3 className={styles.cartTitle}>Carrito de lotes</h3>
        {lotes.length === 0 ? (
          <p className={styles.emptyCart}>No hay lotes agregados</p>
        ) : (
          <ul className={styles.cartList}>
            {lotes.map((lote, index) => (
              <li key={index} className={styles.cartItem}>
                <div>
                  <strong>{lote.nombre}</strong> - {lote.cantidad} unidades - $
                  {lote.precio}
                </div>
                <div className={styles.cartActions}>
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className={styles.iconButton}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className={styles.iconButton}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*-------------------------------------------------- */

/*import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useCreateItems from "../../hooks/items/useCreateItems";
import { createItemsSchemaArray } from "../../validators/items/createItemValidator";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import styles from "../../styles/items/createItemsForm.module.css";
import SerialNumbersForm from "./SerialNumbersForm";
import { showToastError } from "../../utils/toastUtils";
import BackButton from "../global/BackButton";

const CreateItemsForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { itemsCreation } = useCreateItems();
  const productOfStore = useSelector(selectSelectedProduct);
  useGetProductById(productId);

  const {
    register,
    handleSubmit,
    control,
    setError,
    getValues,
    setValue,
    watch,
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
          itemRange: "",
          serial_numbers: [],
          editMode: true,
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  const [editingIndex, setEditingIndex] = useState(null);

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
        serial_numbers: (item.serial_numbers ?? []).map((snObj) => snObj.serial_number),
        item_range: item.itemRange,
      })),
    };

    const response = await itemsCreation(payload);
    if (response) navigate(`/products/${productId}/items/created`);
  };

  const onError = (errors) => {
    if (errors.items) {
      errors.items.forEach((itemError, index) => {
        if (itemError?.serial_numbers?.message) {
          showToastError(`Lote ${index + 1}: ${itemError.serial_numbers.message}`);
        }
      });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    remove(index);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleAddOrUpdate = (index) => {
    if (editingIndex !== null) {
      setEditingIndex(null);
    } else {
      append({
        description: "",
        purchase_price: "",
        purchase_date: "",
        quantity: "",
        itemRange: "",
        serial_numbers: [],
        editMode: true,
      });
    }
  };

  return (
    <div className={styles.container}>
   
      <div className={styles.formSection}>
        <BackButton icon={<ArrowLeft size={20} />} />
        <h2 className={styles.title}>
          Crear artículos {productOfStore?.model ? `para ${productOfStore.model}` : ""}
        </h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.loteCard}>
              <h5>Lote {index + 1}</h5>

              <div className={styles.formGroup}>
                <label>Descripción</label>
                <input
                  type="text"
                  {...register(`items[${index}].description`)}
                  className={styles.input}
                />
                {errors.items?.[index]?.description && (
                  <p className={styles.error}>{errors.items[index].description.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Precio de compra</label>
                <input
                  type="number"
                  {...register(`items[${index}].purchase_price`)}
                  className={styles.input}
                  onWheel={(e) => e.target.blur()}
                />
                {errors.items?.[index]?.purchase_price && (
                  <p className={styles.error}>{errors.items[index].purchase_price.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Fecha de compra</label>
                <input
                  type="date"
                  {...register(`items[${index}].purchase_date`)}
                  className={styles.input}
                />
                {errors.items?.[index]?.purchase_date && (
                  <p className={styles.error}>{errors.items[index].purchase_date.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Cantidad comprada</label>
                <input
                  type="number"
                  {...register(`items[${index}].quantity`)}
                  className={styles.input}
                  onWheel={(e) => e.target.blur()}
                />
                {errors.items?.[index]?.quantity && (
                  <p className={styles.error}>{errors.items[index].quantity.message}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Rango de transmisión (itemRange)</label>
                <input
                  type="text"
                  {...register(`items[${index}].itemRange`)}
                  className={styles.input}
                />
                {errors.items?.[index]?.itemRange && (
                  <p className={styles.error}>{errors.items[index].itemRange.message}</p>
                )}
              </div>

              <SerialNumbersForm
                nestIndex={index}
                control={control}
                register={register}
                errors={errors}
              />

              <div className={styles.formButtons}>
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => handleAddOrUpdate(index)}
                >
                  {editingIndex === index ? "Actualizar lote" : "Agregar lote"}
                </button>
              </div>
            </div>
          ))}

          <div className={styles.submitWrapper}>
            <button type="submit" className={styles.submitButton}>
              ✅ Crear todos los artículos
            </button>
          </div>
        </form>
      </div>

     
      <div className={styles.cartSection}>
        <h3 className={styles.cartTitle}>Carrito de lotes</h3>
        {fields.length === 0 ? (
          <p className={styles.emptyCart}>No hay lotes agregados</p>
        ) : (
          <ul className={styles.cartList}>
            {fields.map((field, index) => (
              <li key={field.id} className={styles.cartItem}>
                <div>
                  <strong>{getValues(`items[${index}].description`)}</strong> -{" "}
                  {getValues(`items[${index}].quantity`)} unidades - $
                  {getValues(`items[${index}].purchase_price`)}
                </div>
                <div className={styles.cartActions}>
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className={styles.iconButton}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className={styles.iconButton}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*------------------------------------------------- */

/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { showToastError } from "../../utils/toastUtils";
import SerialNumbersForm from "./SerialNumbersForm";
import styles from "../../styles/items/createItemsForm.module.css";
import BackButton from "../global/BackButton";

const CreateItemsForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      items: [
        {
          description: "",
          purchase_price: "",
          purchase_date: "",
          quantity: "",
          itemRange: "",
          serial_numbers: []
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchItems = watch("items");

  // Agregar al carrito (mantiene lógica RHF)
  const handleAddToCart = (index) => {
    const currentItem = watchItems[index];
    if (!currentItem.description || !currentItem.quantity || !currentItem.purchase_price) {
      showToastError("Debes completar todos los campos obligatorios antes de agregar al carrito.");
      return;
    }
    // Se mueve el lote al final del array (simula carrito)
    append(currentItem);
    // Resetear ese índice
    setValue(`items[${index}]`, {
      description: "",
      purchase_price: "",
      purchase_date: "",
      quantity: "",
      itemRange: "",
      serial_numbers: []
    });
  };

  const handleEdit = (index) => {
    // No hace nada especial aquí, solo usa el formulario ya que RHF maneja los datos
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    console.log("Crear artículos:", data.items);
    // Aquí integras con la API
  };

  return (
    <div className={styles.container}>

      <div className={styles.formSection}>
        <BackButton icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <h2 className={styles.title}>Crear artículos para el producto</h2>

        {fields.map((field, index) => (
          <div key={field.id} className={styles.loteCard}>
            <div className="mb-3">
              <label>Descripción</label>
              <input
                type="text"
                {...register(`items[${index}].description`)}
                className={styles.input}
              />
            </div>

            <div className="mb-3">
              <label>Precio de compra</label>
              <input
                type="number"
                {...register(`items[${index}].purchase_price`)}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
            </div>

            <div className="mb-3">
              <label>Fecha de compra</label>
              <input
                type="date"
                {...register(`items[${index}].purchase_date`)}
                className={styles.input}
              />
            </div>

            <div className="mb-3">
              <label>Cantidad comprada</label>
              <input
                type="number"
                {...register(`items[${index}].quantity`)}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
            </div>

            <div className="mb-3">
              <label>Rango de frecuencia</label>
              <input
                type="text"
                {...register(`items[${index}].itemRange`)}
                className={styles.input}
              />
            </div>

            <SerialNumbersForm
              nestIndex={index}
              control={control}
              register={register}
              errors={errors}
            />

            <button
              type="button"
              className={styles.addButton}
              onClick={() => handleAddToCart(index)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>


      <div className={styles.cartSection}>
        <h3 className={styles.cartTitle}>Carrito de lotes</h3>
        {fields.length === 0 ? (
          <p className={styles.emptyCart}>No hay lotes agregados</p>
        ) : (
          <ul className={styles.cartList}>
            {fields.map((field, index) => (
              <li key={field.id} className={styles.cartItem}>
                <div>
                  <strong>{watchItems[index].description}</strong> - {watchItems[index].quantity} unidades - ${watchItems[index].purchase_price}
                </div>
                <div className={styles.cartActions}>
                  <button type="button" onClick={() => handleEdit(index)} className={styles.iconButton}>
                    <Pencil size={18} />
                  </button>
                  <button type="button" onClick={() => handleDelete(index)} className={styles.iconButton}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button type="button" className={styles.submitButton} onClick={handleSubmit(onSubmit)}>
          Crear artículos
        </button>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*------------------------------------------- */

/*import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import BackButton from "../global/BackButton";
import SerialNumbersForm from "./SerialNumbersForm";
import styles from "../../styles/items/createItemsForm.module.css";

// Validación Yup
const loteSchema = yup.object().shape({
  description: yup.string().required("La descripción es obligatoria"),
  purchase_price: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser positivo")
    .required("El precio es obligatorio"),
  purchase_date: yup.date().required("La fecha es obligatoria"),
  quantity: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser positivo")
    .required("La cantidad es obligatoria"),
  itemRange: yup.string(),
  serial_numbers: yup.array(),
});

const schema = yup.object({
  currentLote: loteSchema,
  carrito: yup.array().of(loteSchema),
});

const CreateItemsForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentLote: {
        description: "",
        purchase_price: "",
        purchase_date: "",
        quantity: "",
        itemRange: "",
        serial_numbers: [],
      },
      carrito: [],
    },
  });

  const { fields: carritoFields, append, remove, update } = useFieldArray({
    control,
    name: "carrito",
  });

  const currentLote = watch("currentLote");

  const agregarAlCarrito = () => {
    handleSubmit(
      (data) => {
        append(data.currentLote);
        reset({ currentLote: { description: "", purchase_price: "", purchase_date: "", quantity: "", itemRange: "", serial_numbers: [] }, carrito: data.carrito });
      },
      () => {}
    )();
  };

  const editarLote = (index) => {
    const lote = carritoFields[index];
    setValue("currentLote", lote);
    remove(index);
  };

  const eliminarLote = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    console.log("Enviar al backend:", data.carrito);
  };

  return (
    <div className={styles.container}>
    
      <BackButton icon={<ArrowLeft size={20} />} />

      <div className={styles.contentWrapper}>
      
        <div className={styles.formSection}>
          <h2 className={styles.title}>Crear artículos para el proyecto</h2>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label>Descripción</label>
              <input
                type="text"
                {...register("currentLote.description")}
                className={styles.input}
              />
              {errors.currentLote?.description && (
                <p className={styles.error}>{errors.currentLote.description.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Precio de compra</label>
              <input
                type="number"
                {...register("currentLote.purchase_price")}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
              {errors.currentLote?.purchase_price && (
                <p className={styles.error}>{errors.currentLote.purchase_price.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Fecha de compra</label>
              <input
                type="date"
                {...register("currentLote.purchase_date")}
                className={styles.input}
              />
              {errors.currentLote?.purchase_date && (
                <p className={styles.error}>{errors.currentLote.purchase_date.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Cantidad comprada</label>
              <input
                type="number"
                {...register("currentLote.quantity")}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
              {errors.currentLote?.quantity && (
                <p className={styles.error}>{errors.currentLote.quantity.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Rango de frecuencia</label>
              <input
                type="text"
                {...register("currentLote.itemRange")}
                className={styles.input}
              />
            </div>

            <Controller
              control={control}
              name="currentLote.serial_numbers"
              render={({ field }) => (
                <SerialNumbersForm
                  nestIndex={0}
                  control={control}
                  register={register}
                  errors={errors}
                />
              )}
            />

            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.addButton}
                onClick={agregarAlCarrito}
              >
                Agregar al carrito
              </button>
              <button
                type="button"
                className={styles.addButton}
                onClick={() => reset({ currentLote: { description: "", purchase_price: "", purchase_date: "", quantity: "", itemRange: "", serial_numbers: [] }, carrito: carritoFields })}
              >
                Resetear lote
              </button>
            </div>
          </form>
        </div>

      
        <div className={styles.cartSection}>
          <h3 className={styles.cartTitle}>Carrito de lotes</h3>
          {carritoFields.length === 0 ? (
            <p className={styles.emptyCart}>No hay lotes agregados</p>
          ) : (
            <ul className={styles.cartList}>
              {carritoFields.map((lote, index) => (
                <li key={lote.id} className={styles.cartItem}>
                  <div>
                    <strong>{lote.description}</strong> - {lote.quantity} unidades - $
                    {lote.purchase_price}
                  </div>
                  <div className={styles.cartActions}>
                    <button type="button" onClick={() => editarLote(index)} className={styles.iconButton}>
                      <Pencil size={18} />
                    </button>
                    <button type="button" onClick={() => eliminarLote(index)} className={styles.iconButton}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className={styles.submitButton} onClick={handleSubmit(onSubmit)}>
            Crear artículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*---------------------------------------------- */

/*import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import BackButton from "../global/BackButton";
import SerialNumbersForm from "./SerialNumbersForm";
import styles from "../../styles/items/createItemsForm.module.css";
import { createItemsSchemaArray } from "../../validators/items/createItemValidator";

const CreateItemsForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createItemsSchemaArray),
    defaultValues: {
      currentLote: {
        description: "",
        purchase_price: "",
        purchase_date: "",
        quantity: "",
        itemRange: "",
        serialNumbers: [],
      },
      carrito: [],
    },
  });

  const { fields: carritoFields, append, remove, update } = useFieldArray({
    control,
    name: "carrito",
  });

  const currentLote = watch("currentLote");

  const agregarAlCarrito = () => {
    handleSubmit(
      (data) => {
        append(data.currentLote);
        reset({
          currentLote: {
            description: "",
            purchase_price: "",
            purchase_date: "",
            quantity: "",
            itemRange: "",
            serialNumbers: [],
          },
          carrito: data.carrito,
        });
      },
      () => {}
    )();
  };

  const editarLote = (index) => {
    const lote = carritoFields[index];
    setValue("currentLote", lote);
    remove(index);
  };

  const eliminarLote = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    console.log("Enviar al backend:", data.carrito);
  };

  return (
    <div className={styles.container}>
 
      <BackButton icon={<ArrowLeft size={20} />} />

      <div className={styles.contentWrapper}>
      
        <div className={styles.formSection}>
          <h2 className={styles.title}>Crear artículos para el proyecto</h2>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label>Descripción</label>
              <input
                type="text"
                {...register("currentLote.description")}
                className={styles.input}
              />
              {errors.currentLote?.description && (
                <p className={styles.error}>{errors.currentLote.description.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Precio de compra</label>
              <input
                type="number"
                {...register("currentLote.purchase_price")}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
              {errors.currentLote?.purchase_price && (
                <p className={styles.error}>{errors.currentLote.purchase_price.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Fecha de compra</label>
              <input
                type="date"
                {...register("currentLote.purchase_date")}
                className={styles.input}
              />
              {errors.currentLote?.purchase_date && (
                <p className={styles.error}>{errors.currentLote.purchase_date.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Cantidad comprada</label>
              <input
                type="number"
                {...register("currentLote.quantity")}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
              {errors.currentLote?.quantity && (
                <p className={styles.error}>{errors.currentLote.quantity.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Rango de transmisión</label>
              <input
                type="text"
                {...register("currentLote.itemRange")}
                className={styles.input}
              />
              {errors.currentLote?.itemRange && (
                <p className={styles.error}>{errors.currentLote.itemRange.message}</p>
              )}
            </div>

            <Controller
              control={control}
              name="currentLote.serialNumbers"
              render={({ field }) => (
                <SerialNumbersForm
                  nestIndex={0}
                  control={control}
                  register={register}
                  errors={errors}
                />
              )}
            />

            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.addButton}
                onClick={agregarAlCarrito}
              >
                Agregar al carrito
              </button>
              <button
                type="button"
                className={styles.addButton}
                onClick={() =>
                  reset({
                    currentLote: {
                      description: "",
                      purchase_price: "",
                      purchase_date: "",
                      quantity: "",
                      itemRange: "",
                      serialNumbers: [],
                    },
                    carrito: carritoFields,
                  })
                }
              >
                Resetear lote
              </button>
            </div>
          </form>
        </div>

   
        <div className={styles.cartSection}>
          <h3 className={styles.cartTitle}>Carrito de lotes</h3>
          {carritoFields.length === 0 ? (
            <p className={styles.emptyCart}>No hay lotes agregados</p>
          ) : (
            <ul className={styles.cartList}>
              {carritoFields.map((lote, index) => (
                <li key={lote.id} className={styles.cartItem}>
                  <div>
                    <strong>{lote.description}</strong> - {lote.quantity} unidades - $
                    {lote.purchase_price}
                  </div>
                  <div className={styles.cartActions}>
                    <button type="button" onClick={() => editarLote(index)} className={styles.iconButton}>
                      <Pencil size={18} />
                    </button>
                    <button type="button" onClick={() => eliminarLote(index)} className={styles.iconButton}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className={styles.submitButton} onClick={handleSubmit(onSubmit)}>
            Crear artículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*------------------------------------------------------ */

/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import { createItemsSchemaArray } from "../../validators/items/createItemValidator";
import SerialNumbersForm from "./SerialNumbersForm";
import BackButton from "../global/BackButton";
import styles from "../../styles/items/createItemsForm.module.css";

const CreateItemsForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createItemsSchemaArray),
    defaultValues: {
      currentLote: {
        description: "",
        purchase_price: "",
        purchase_date: "",
        quantity: "",
        itemRange: "",
        serialNumbers: [],
      },
      cartLotes: [],
    },
  });

  const cartLotes = watch("cartLotes");
  const currentLote = watch("currentLote");

  const { append, remove } = useFieldArray({
    control,
    name: "cartLotes",
  });

  const handleAddToCart = () => {
    // Validar currentLote con react-hook-form
    handleSubmit(
      (data) => {
        append(data.currentLote);
        reset({ ...data, currentLote: { description: "", purchase_price: "", purchase_date: "", quantity: "", itemRange: "", serialNumbers: [] } });
      },
      (errors) => {
        // errores del lote actual
      }
    )();
  };

  const handleDeleteCartItem = (index) => {
    remove(index);
  };

  const handleEditCartItem = (index) => {
    const lote = cartLotes[index];
    // Seteamos currentLote con los datos del lote a editar
    Object.keys(lote).forEach((key) => setValue(`currentLote.${key}`, lote[key]));
    remove(index);
  };

  const onSubmit = (data) => {
    console.log("Enviar al backend:", data.cartLotes);
    // Aquí se integrará con la API
  };

  return (
    <div className={styles.container}>
     
      <div className={styles.formSection}>
        <BackButton icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <h2 className={styles.title}>Crear artículos</h2>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Descripción</label>
            <input
              type="text"
              {...register("currentLote.description")}
              className={styles.input}
            />
            {errors.currentLote?.description && (
              <p className="text-danger">{errors.currentLote.description.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Precio de compra</label>
            <input
              type="number"
              {...register("currentLote.purchase_price")}
              className={styles.input}
              onWheel={(e) => e.target.blur()}
            />
            {errors.currentLote?.purchase_price && (
              <p className="text-danger">{errors.currentLote.purchase_price.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Fecha de compra</label>
            <input
              type="date"
              {...register("currentLote.purchase_date")}
              className={styles.input}
            />
            {errors.currentLote?.purchase_date && (
              <p className="text-danger">{errors.currentLote.purchase_date.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Cantidad comprada</label>
            <input
              type="number"
              {...register("currentLote.quantity")}
              className={styles.input}
              onWheel={(e) => e.target.blur()}
            />
            {errors.currentLote?.quantity && (
              <p className="text-danger">{errors.currentLote.quantity.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Rango de transmisión</label>
            <input
              type="text"
              {...register("currentLote.itemRange")}
              className={styles.input}
            />
            {errors.currentLote?.itemRange && (
              <p className="text-danger">{errors.currentLote.itemRange.message}</p>
            )}
          </div>

          <SerialNumbersForm
            control={control}
            register={register}
            errors={errors}
          />

          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </form>
      </div>

     
      <div className={styles.cartSection}>
        <h3 className={styles.cartTitle}>Carrito de lotes</h3>
        {cartLotes.length === 0 ? (
          <p className={styles.emptyCart}>No hay lotes agregados</p>
        ) : (
          <ul className={styles.cartList}>
            {cartLotes.map((lote, index) => (
              <li key={index} className={styles.cartItem}>
                <div>
                  <strong>{lote.description}</strong> - {lote.quantity} unidades - ${lote.purchase_price}
                </div>
                <div className={styles.cartActions}>
                  <button
                    type="button"
                    onClick={() => handleEditCartItem(index)}
                    className={styles.iconButton}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCartItem(index)}
                    className={styles.iconButton}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className={styles.submitButton}
          onClick={handleSubmit(onSubmit)}
        >
          Crear artículos
        </button>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*------------------------------------------------- */

/*import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import BackButton from "../global/BackButton";
import SerialNumbersForm from "./SerialNumbersForm";
import { createItemsSchemaArray } from "../../validators/items/createItemValidator";
import styles from "../../styles/items/createItemsForm.module.css";

const CreateItemsForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
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
          itemRange: "",
          serialNumbers: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [cartLotes, setCartLotes] = useState([]);

  const addToCart = (index) => {
    const item = getValues(`items[${index}]`);
    // Validar usando React Hook Form
    handleSubmit(() => {
      setCartLotes([...cartLotes, item]);
      reset({ items: [{ description: "", purchase_price: "", purchase_date: "", quantity: "", itemRange: "", serialNumbers: [] }] });
    })();
  };

  const editCartLote = (index) => {
    const item = cartLotes[index];
    reset({ items: [item] });
    setCartLotes(cartLotes.filter((_, i) => i !== index));
  };

  const deleteCartLote = (index) => {
    setCartLotes(cartLotes.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    reset({
      items: [
        {
          description: "",
          purchase_price: "",
          purchase_date: "",
          quantity: "",
          itemRange: "",
          serialNumbers: [],
        },
      ],
    });
  };

  const onSubmit = (data) => {
    console.log("Enviar al backend:", cartLotes);
    // Aquí se integrará con la API
  };

  return (
    <div className={styles.container}>
  
      <div className={styles.formSection}>
        <BackButton icon={<ArrowLeft size={20} />} />
        <h2 className={styles.title}>Crear artículos para el proyecto</h2>

        {fields.map((field, index) => (
          <div key={field.id} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Descripción</label>
              <input
                type="text"
                {...register(`items[${index}].description`)}
                className={styles.input}
              />
              {errors.items?.[index]?.description && (
                <p className="text-danger">{errors.items[index].description.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Precio de compra</label>
              <input
                type="number"
                {...register(`items[${index}].purchase_price`)}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
              {errors.items?.[index]?.purchase_price && (
                <p className="text-danger">{errors.items[index].purchase_price.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Fecha de compra</label>
              <input
                type="date"
                {...register(`items[${index}].purchase_date`)}
                className={styles.input}
              />
              {errors.items?.[index]?.purchase_date && (
                <p className="text-danger">{errors.items[index].purchase_date.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Cantidad comprada</label>
              <input
                type="number"
                {...register(`items[${index}].quantity`)}
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
              {errors.items?.[index]?.quantity && (
                <p className="text-danger">{errors.items[index].quantity.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Rango de transmisión</label>
              <input
                type="text"
                {...register(`items[${index}].itemRange`)}
                className={styles.input}
              />
              {errors.items?.[index]?.itemRange && (
                <p className="text-danger">{errors.items[index].itemRange.message}</p>
              )}
            </div>

            <SerialNumbersForm
              nestIndex={index}
              control={control}
              register={register}
              errors={errors}
            />

            <div className={styles.buttons}>
              <button type="button" className={styles.addButton} onClick={() => addToCart(index)}>
                Agregar al carrito
              </button>
              <button type="button" className={styles.addButton} onClick={resetForm}>
                Resetear formulario
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartSection}>
        <h3 className={styles.cartTitle}>Carrito de lotes</h3>
        {cartLotes.length === 0 ? (
          <p className={styles.emptyCart}>No hay lotes agregados</p>
        ) : (
          <ul className={styles.cartList}>
            {cartLotes.map((lote, index) => (
              <li key={index} className={styles.cartItem}>
                <div>
                  <strong>{lote.description}</strong> - {lote.quantity} unidades - ${lote.purchase_price}
                </div>
                <div className={styles.cartActions}>
                  <button type="button" onClick={() => editCartLote(index)} className={styles.iconButton}>
                    <Pencil size={18} />
                  </button>
                  <button type="button" onClick={() => deleteCartLote(index)} className={styles.iconButton}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button type="button" onClick={handleSubmit(onSubmit)} className={styles.submitButton}>
          Crear artículos
        </button>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*------------------------------------------- */

/*import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createItemsSchemaArray } from "../../validators/items/createItemValidator";
import SerialNumbersForm from "./SerialNumbersForm";
import BackButton from "../global/BackButton";
import styles from "../../styles/items/createItemsForm.module.css";

const CreateItemsForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(createItemsSchemaArray),
    defaultValues: {
      items: [
        {
          description: "",
          purchase_price: "",
          purchase_date: "",
          quantity: "",
          itemRange: "",
          serialNumbers: [],
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "items",
  });

  const [cart, setCart] = useState([]);

  const currentLote = watch("items")[0]; // solo el primer lote

  



  const addToCart = async () => {
    const isValid = await trigger();
    console.log("Errores completos:", JSON.stringify(errors, null, 2));


    if (!isValid) return;

    // Convertir strings a números
    const loteNumbered = {
      ...currentLote,
      purchase_price: Number(currentLote.purchase_price),
      quantity: Number(currentLote.quantity),
    };

    setCart([...cart, loteNumbered]);

    replace([
      {
        description: "",
        purchase_price: "",
        purchase_date: "",
        quantity: "",
        itemRange: "",
        serialNumbers: [],
      },
    ]);
  };

  const editCartItem = (index) => {
    const lote = cart[index];
    replace([lote]);
    setCart(cart.filter((_, i) => i !== index));
  };

  const deleteCartItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    replace([
      {
        description: "",
        purchase_price: "",
        purchase_date: "",
        quantity: "",
        itemRange: "",
        serialNumbers: [],
      },
    ]);
  };

  const onSubmit = (data) => {
    console.log("Crear artículos:", cart);
  };

  return (
    <div className={styles.container}>

      <BackButton icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />

      <div className={styles.formCartWrapper}>
      
        <div className={styles.formSection}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Descripción</label>
              <input
                type="text"
                {...register("items[0].description")}
                className={styles.input}
              />
              {errors.items?.[0]?.description && (
                <p className={styles.error}>
                  {errors.items[0].description.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Precio de compra</label>
              <input
                type="number"
                {...register("items[0].purchase_price")}
                className={styles.input}
              />
              {errors.items?.[0]?.purchase_price && (
                <p className={styles.error}>
                  {errors.items[0].purchase_price.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Fecha de compra</label>
              <input
                type="date"
                {...register("items[0].purchase_date")}
                className={styles.input}
              />
              {errors.items?.[0]?.purchase_date && (
                <p className={styles.error}>
                  {errors.items[0].purchase_date.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Cantidad comprada</label>
              <input
                type="number"
                {...register("items[0].quantity")}
                className={styles.input}
              />
              {errors.items?.[0]?.quantity && (
                <p className={styles.error}>
                  {errors.items[0].quantity.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Rango de transmisión</label>
              <input
                type="text"
                {...register("items[0].itemRange")}
                className={styles.input}
              />
              {errors.items?.[0]?.itemRange && (
                <p className={styles.error}>
                  {errors.items[0].itemRange.message}
                </p>
              )}
            </div>

            <SerialNumbersForm
              nestIndex={0}
              control={control}
              register={register}
              errors={errors}
            />

            <div className={styles.formButtons}>
              <button
                type="button"
                onClick={addToCart}
                className={styles.addButton}
              >
                Agregar al carrito
              </button>
              <button
                type="button"
                onClick={resetForm}
                className={styles.resetButton}
              >
                Resetear formulario
              </button>
            </div>
          </form>
        </div>

        <div className={styles.cartSection}>
          <h3 className={styles.cartTitle}>Carrito de lotes</h3>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>No hay lotes agregados</p>
          ) : (
            <ul className={styles.cartList}>
              {cart.map((lote, index) => (
                <li key={index} className={styles.cartItem}>
                  <div>
                    <strong>{lote.description}</strong> - {lote.quantity}{" "}
                    unidades - ${lote.purchase_price}
                  </div>
                  <div className={styles.cartActions}>
                    <button
                      type="button"
                      onClick={() => editCartItem(index)}
                      className={styles.iconButton}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCartItem(index)}
                      className={styles.iconButton}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSubmit(onSubmit)}
            className={styles.submitButton}
          >
            Crear artículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*---------------------------------------- */

/*import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createItemsSchema, createItemsSchemaArray } from "../../validators/items/createItemValidator";
import SerialNumbersForm from "./SerialNumbersForm";
import BackButton from "../global/BackButton";
import styles from "../../styles/items/createItemsForm.module.css";

const CreateItemsForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(createItemsSchemaArray),
    defaultValues: {
      items: [
        {
          description: "",
          purchase_price: null,
          purchase_date: "",
          quantity: null,
          itemRange: "",
          serialNumbers: [{ serial_numbers: [] }],
        },
      ],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "items",
  });

  const [cart, setCart] = useState([]);

  const currentLote = watch("items")[0];

  const addToCart = async () => {
    try {
      // Validar lote individual
      const loteNumbered = {
        ...currentLote,
        purchase_price: Number(currentLote.purchase_price),
        quantity: Number(currentLote.quantity),
      };

      await createItemsSchema.validate(loteNumbered, { abortEarly: false });

      setCart([...cart, loteNumbered]);

      // Reset formulario
      replace([
        {
          description: "",
          purchase_price: null,
          purchase_date: "",
          quantity: null,
          itemRange: "",
          serialNumbers: [{ serial_numbers: [] }],
        },
      ]);
    } catch (err) {
      console.log("Errores de Yup:", err.inner);
    }
  };

  const editCartItem = (index) => {
    const lote = cart[index];
    replace([
      {
        ...lote,
        serialNumbers: lote.serialNumbers.length
          ? lote.serialNumbers
          : [{ serial_numbers: [] }],
      },
    ]);
    setCart(cart.filter((_, i) => i !== index));
  };

  const deleteCartItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    replace([
      {
        description: "",
        purchase_price: null,
        purchase_date: "",
        quantity: null,
        itemRange: "",
        serialNumbers: [{ serial_numbers: [] }],
      },
    ]);
  };

  const onSubmit = (data) => {
    console.log("Crear artículos:", cart);
  };

  return (
    <div className={styles.container}>
      <BackButton icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />

      <div className={styles.formCartWrapper}>
       
        <div className={styles.formSection}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Descripción</label>
              <input
                type="text"
                {...register("items[0].description")}
                className={styles.input}
              />
              {errors.items?.[0]?.description && (
                <p className={styles.error}>{errors.items[0].description.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Precio de compra</label>
              <input
                type="number"
                {...register("items[0].purchase_price", { valueAsNumber: true })}
                className={styles.input}
              />
              {errors.items?.[0]?.purchase_price && (
                <p className={styles.error}>{errors.items[0].purchase_price.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Fecha de compra</label>
              <input
                type="date"
                {...register("items[0].purchase_date")}
                className={styles.input}
              />
              {errors.items?.[0]?.purchase_date && (
                <p className={styles.error}>{errors.items[0].purchase_date.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Cantidad comprada</label>
              <input
                type="number"
                {...register("items[0].quantity", { valueAsNumber: true })}
                className={styles.input}
              />
              {errors.items?.[0]?.quantity && (
                <p className={styles.error}>{errors.items[0].quantity.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Rango de transmisión</label>
              <input
                type="text"
                {...register("items[0].itemRange")}
                className={styles.input}
              />
              {errors.items?.[0]?.itemRange && (
                <p className={styles.error}>{errors.items[0].itemRange.message}</p>
              )}
            </div>

            <SerialNumbersForm
              nestIndex={0}
              control={control}
              register={register}
              errors={errors}
            />

            <div className={styles.formButtons}>
              <button
                type="button"
                onClick={addToCart}
                className={styles.addButton}
              >
                Agregar al carrito
              </button>
              <button
                type="button"
                onClick={resetForm}
                className={styles.resetButton}
              >
                Resetear formulario
              </button>
            </div>
          </form>
        </div>

        <div className={styles.cartSection}>
          <h3 className={styles.cartTitle}>Carrito de lotes</h3>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>No hay lotes agregados</p>
          ) : (
            <ul className={styles.cartList}>
              {cart.map((lote, index) => (
                <li key={index} className={styles.cartItem}>
                  <div>
                    <strong>{lote.description}</strong> - {lote.quantity} unidades - ${lote.purchase_price}
                  </div>
                  <div className={styles.cartActions}>
                    <button
                      type="button"
                      onClick={() => editCartItem(index)}
                      className={styles.iconButton}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCartItem(index)}
                      className={styles.iconButton}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSubmit(onSubmit)}
            className={styles.submitButton}
          >
            Crear artículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/

/*---------------------------------------- */

/*import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  createItemsSchemaArray,
  createItemsSchema,
} from "../../validators/items/createItemValidator";
import SerialNumbersForm from "./SerialNumbersForm";
import BackButton from "../global/BackButton";
import styles from "../../styles/items/createItemsForm.module.css";

const CreateItemsForm = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset, // ✅ Aquí está el reset correcto
    trigger,
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
          itemRange: "",
          serialNumbers: [{ serial_numbers: [] }],
        },
      ],
    },
  });

  const currentLote = watch("items")[0];

  const addToCart = async () => {
    console.log("=== Intentando agregar al carrito ===");

    const currentLote = watch("items")[0]; // solo el primer lote
    console.log("Current lote raw:", currentLote);

    try {
      // Ejecutar validación completa con Yup manualmente
      await createItemsSchema.validate(currentLote, { abortEarly: false });
      console.log("Validación Yup pasó ✅");

      // Convertir strings a números
      const loteNumbered = {
        ...currentLote,
        purchase_price: Number(currentLote.purchase_price),
        quantity: Number(currentLote.quantity),
      };

      console.log("Lote convertido listo para agregar:", loteNumbered);

      // Agregar al carrito
      setCart([...cart, loteNumbered]);

      resetForm();
    } catch (err) {
      console.log("Error de validación Yup:", err);
      if (err.inner) {
        err.inner.forEach((e) => {
          console.log(`Path: ${e.path}, Message: ${e.message}`);
        });
      }
    }

    console.log("Cart actual:", cart);
  };

  const resetForm = () => {
    reset({
      items: [
        {
          description: "",
          purchase_price: "",
          purchase_date: "",
          quantity: "",
          itemRange: "",
          serialNumbers: [{ serial_numbers: [] }],
        },
      ],
    });
  };

  const editCartItem = (index) => {
    const lote = cart[index];

    // Resetear el formulario con los valores del lote que queremos editar
    reset({
      items: [
        {
          ...lote,
          // asegurate de mantener serialNumbers correctamente
          serialNumbers: lote.serialNumbers || [{ serial_numbers: [] }],
        },
      ],
    });

    // Sacar el lote del carrito mientras se edita
    setCart(cart.filter((_, i) => i !== index));
  };

  const deleteCartItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const onSubmit = () => {
    console.log("Crear artículos:", cart);
  };

  return (
    <div className={styles.container}>
      <BackButton icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />

      <div className={styles.formCartWrapper}>
        <div className={styles.formSection}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Descripción</label>
              <input
                type="text"
                {...register("items[0].description")}
                className={styles.input}
              />
              {errors.items?.[0]?.description && (
                <p className={styles.error}>
                  {errors.items[0].description.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Precio de compra</label>
              <input
                type="number"
                {...register("items[0].purchase_price")}
                className={styles.input}
              />
              {errors.items?.[0]?.purchase_price && (
                <p className={styles.error}>
                  {errors.items[0].purchase_price.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Fecha de compra</label>
              <input
                type="date"
                {...register("items[0].purchase_date")}
                className={styles.input}
              />
              {errors.items?.[0]?.purchase_date && (
                <p className={styles.error}>
                  {errors.items[0].purchase_date.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Cantidad comprada</label>
              <input
                type="number"
                {...register("items[0].quantity")}
                className={styles.input}
              />
              {errors.items?.[0]?.quantity && (
                <p className={styles.error}>
                  {errors.items[0].quantity.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Rango de transmisión</label>
              <input
                type="text"
                {...register("items[0].itemRange")}
                className={styles.input}
              />
              {errors.items?.[0]?.itemRange && (
                <p className={styles.error}>
                  {errors.items[0].itemRange.message}
                </p>
              )}
            </div>

            <SerialNumbersForm
              nestIndex={0}
              control={control}
              register={register}
            />

            <div className={styles.formButtons}>
              <button
                type="button"
                className={styles.addButton}
                onClick={addToCart}
              >
                Agregar al carrito
              </button>
              <button
                type="button"
                className={styles.resetButton}
                onClick={resetForm}
              >
                Resetear formulario
              </button>
            </div>
          </form>
        </div>

        <div className={styles.cartSection}>
          <h3 className={styles.cartTitle}>Carrito de lotes</h3>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>No hay lotes agregados</p>
          ) : (
            <ul className={styles.cartList}>
              {cart.map((lote, index) => (
                <li key={index} className={styles.cartItem}>
                  <div>
                    <strong>{lote.description}</strong> - {lote.quantity}{" "}
                    unidades - ${lote.purchase_price}
                  </div>
                  <div className={styles.cartActions}>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => editCartItem(index)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => deleteCartItem(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            className={styles.submitButton}
            onClick={handleSubmit(onSubmit)}
          >
            Crear artículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemsForm;*/




























/*------------------------------------------------------------- */


import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  createItemsSchemaArray,
  createItemsSchema,
} from "../../validators/items/createItemValidator";
import SerialNumbersForm from "./SerialNumbersForm";
import BackButton from "../global/BackButton";
import styles from "../../styles/items/createItemsForm.module.css";
import useCreateItems from "../../hooks/items/useCreateItems";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showToastError } from "../../utils/toastUtils";

const CreateItemsForm = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { itemsCreation } = useCreateItems();
  const { productId } = useParams();
  useGetProductById(productId);
  const productOfStore = useSelector(selectSelectedProduct);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset, // ✅ Para resetear formulario
    trigger,
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
          itemRange: "",
          serialNumbers: [{ serial_numbers: [] }],
        },
      ],
    },
  });

  const currentLote = watch("items")[0];

  const addToCart = async () => {
    console.log("=== Intentando agregar al carrito ===");
    const currentLote = watch("items")[0];
    console.log("Current lote raw:", currentLote);

    try {
      await createItemsSchema.validate(currentLote, { abortEarly: false });
      console.log("Validación Yup pasó ✅");

      const loteNumbered = {
        ...currentLote,
        purchase_price: Number(currentLote.purchase_price),
        quantity: Number(currentLote.quantity),
      };

      console.log("Lote convertido listo para agregar:", loteNumbered);

      setCart([...cart, loteNumbered]);
      resetForm();
    } catch (err) {
      console.log("Error de validación Yup:", err);
      if (err.inner) {
        err.inner.forEach((e) => {
          console.log(`Path: ${e.path}, Message: ${e.message}`);
        });
      }
    }

    console.log("Cart actual:", cart);
  };

  const resetForm = () => {
    reset({
      items: [
        {
          description: "",
          purchase_price: "",
          purchase_date: "",
          quantity: "",
          itemRange: "",
          serialNumbers: [{ serial_numbers: [] }],
        },
      ],
    });
  };

  const editCartItem = (index) => {
    const lote = cart[index];
    reset({
      items: [
        {
          ...lote,
          serialNumbers: lote.serialNumbers || [{ serial_numbers: [] }],
        },
      ],
    });
    setCart(cart.filter((_, i) => i !== index));
  };

  const deleteCartItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
  if (cart.length === 0) {
    // Si no hay lotes en el carrito, mostramos error
    showToastError("Debes agregar al menos un lote de artículos");
    return;
  }

  const payload = {
    items: cart.map((item) => ({
      product_id: productId,
      description: item.description,
      price_bought: item.purchase_price,
      bought_at: item.purchase_date,
      amount_bought: item.quantity,
      serial_numbers: (item.serialNumbers ?? []).flatMap(snObj =>
        snObj.serial_numbers.map(sn => sn.serial_number)
      ),
      item_range: item.itemRange,
    })),
  };

  console.log("Este es el payload:", payload);

  const response = await itemsCreation(payload);
  if (response) {
    navigate(`/products/${productId}/items/created`);
  }
};

  return (
    <div className={styles.container}>
      <BackButton target={`/product/${productId}`} />

      <div className={styles.formCartWrapper}>
        {/* Formulario */}
        <div className={styles.formSection}>
          <form className={styles.form}>
            {/* Descripción */}
            <div className={styles.formGroup}>
              <label htmlFor="txtDescription">Descripción</label>
              <input
              id="txtDescription"
                type="text"
                {...register("items[0].description")}
                className={styles.input}
              />
              {errors.items?.[0]?.description && (
                <p className={styles.error}>{errors.items[0].description.message}</p>
              )}
            </div>

            {/* Precio y fecha en la misma fila */}
            <div className={styles.formRow}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label htmlFor="numPrice">Precio de compra</label>
                <input
                id="numPrice"
                  type="number"
                  {...register("items[0].purchase_price")}
                  className={styles.input}
                />
                {errors.items?.[0]?.purchase_price && (
                  <p className={styles.error}>{errors.items[0].purchase_price.message}</p>
                )}
              </div>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label htmlFor="dateBought">Fecha de compra</label>
                <input
                id="dateBought"
                  type="date"
                  {...register("items[0].purchase_date")}
                  className={styles.input}
                />
                {errors.items?.[0]?.purchase_date && (
                  <p className={styles.error}>{errors.items[0].purchase_date.message}</p>
                )}
              </div>
            </div>

            {/* Cantidad y rango en la misma fila */}
            <div className={styles.formRow}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label htmlFor="numAmountBought">Cantidad comprada</label>
                <input
                id="numAmountBought"
                  type="number"
                  {...register("items[0].quantity")}
                  className={styles.input}
                />
                {errors.items?.[0]?.quantity && (
                  <p className={styles.error}>{errors.items[0].quantity.message}</p>
                )}
              </div>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label htmlFor="numRange">Rango de transmisión</label>
                <input
                id="numRange"
                  type="text"
                  {...register("items[0].itemRange")}
                  className={styles.input}
                />
                {errors.items?.[0]?.itemRange && (
                  <p className={styles.error}>{errors.items[0].itemRange.message}</p>
                )}
              </div>
            </div>

            <SerialNumbersForm nestIndex={0} control={control} register={register} />

            <div className={styles.formButtons}>
              <button
                type="button"
                className={styles.addButton}
                onClick={addToCart}
              >
                Agregar al carrito
              </button>
              <button
                type="button"
                className={styles.resetButton}
                onClick={resetForm}
              >
                Resetear formulario
              </button>
            </div>
          </form>
        </div>

        {/* Carrito */}
        <div className={styles.cartSection}>
          <h3 className={styles.cartTitle}>Carrito de lotes</h3>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>No hay lotes agregados</p>
          ) : (
            <ul className={styles.cartList}>
              {cart.map((lote, index) => (
                <li key={index} className={styles.cartItem}>
                  <div>
                    <strong>{lote.description}</strong> - {lote.quantity} unidades - ${lote.purchase_price}
                  </div>
                  <div className={styles.cartActions}>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => editCartItem(index)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => deleteCartItem(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            className={styles.submitButton}
            onClick={onSubmit}
          >
            Crear artículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemsForm;

