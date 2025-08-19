/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { useAddProductPrice } from "../../hooks/products/useAddProductPrice";
import useDeleteProductPrice from "../../hooks/products/useDeleteProductPrice";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import styles from "../../styles/products/addProductPricesForm.module.css";
import { showToast, showToastError } from "../../utils/toastUtils";

const AddProductPricesForm = ({ productId }) => {
  const product = useSelector(selectSelectedProductDetails);
  const addProductPrice = useAddProductPrice();
  const { deleteProductPrice } = useDeleteProductPrice();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [],
    },
  });

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
    replace: replacePrices,
  } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = async (data) => {
    try {
      if (data.prices.length === 0) {
        showToastError("Agrega al menos un precio antes de enviar.");
        return;
      }

      // 👉 Iterar sobre cada precio y enviarlo individualmente
      for (const price of data.prices) {
        await addProductPrice(productId, price);
      }

      // Limpiar campos locales
      reset({ prices: [] });
    } catch (error) {
      console.error("Error agregando precios:", error);
      showToastError("Error agregando precios:", error);
    }
  };

  const handleDeleteExistingPrice = async (priceId) => {
    try {
      await deleteProductPrice(priceId);
    } catch (error) {
      console.error("Error eliminando precio:", error);
      //toast.error("Error eliminando precio.");
    }
  };

  if (!product) {
    return <p className="text-light">Cargando información del producto...</p>;
  }

  return (
    <div className={`p-4 rounded text-light ${styles.sectionContainer}`}>
      <button
        type="button"
        className={stylesBackButton.btnBackArrow}
        onClick={() => navigate("/product/" + productId)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className={`p-4 rounded text-light ${styles.sectionContainer}`}>
        <h1 className="pb-3">Agregar precios</h1>
       
        <div className="mb-4">
          <h5 className="text-light">Precios actuales del producto</h5>
          {product?.prices?.length === 0 ? (
            <p className="text-light">No hay precios registrados.</p>
          ) : (
            <ul className="list-group">
              {product?.prices?.map((price) => (
                <li
                  key={price.rent_price_id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${styles.priceSection}`}
                >
                  <span>
                    ${price.value} — {price.description}
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDeleteExistingPrice(price.rent_price_id)
                    }
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <h5 className="text-light">Agregar nuevos precios</h5>

          {priceFields.map((field, index) => (
            <div
              key={field.id}
              className="border p-3 mb-2 rounded bg-secondary bg-opacity-10"
            >
              <div className="mb-2">
                <label className="form-label text-light">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  onWheel={(e) => e.target.blur()}
                  {...register(`prices.${index}.value`, { required: true })}
                />
                {errors.prices?.[index]?.value && (
                  <span className="text-danger">Campo requerido</span>
                )}
              </div>
              <div className="mb-2">
                <label className="form-label text-light">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  {...register(`prices.${index}.description`, {
                    required: true,
                  })}
                />
                {errors.prices?.[index]?.description && (
                  <span className="text-danger">Campo requerido</span>
                )}
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removePrice(index)}
              >
                Eliminar
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              appendPrice({
                value: "",
                description: "",
              })
            }
          >
            Agregar precio
          </button>
        </div>

       
        <button type="submit" className={`btn ${styles.btnPurple}`}>
          Guardar nuevos precios
        </button>
      </form>
    </div>
  );
};

export default AddProductPricesForm;*/

/*-------------------------------------------------- */

/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { useAddProductPrice } from "../../hooks/products/useAddProductPrice";
import useDeleteProductPrice from "../../hooks/products/useDeleteProductPrice";
import { useNavigate } from "react-router-dom";
import BackButton from "../global/BackButton";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/products/addProductPricesForm.module.css";
import { useParams } from "react-router-dom";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";

const AddProductPricesForm = () => {
  const { id } = useParams();
  const productId = id;
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);
  const addProductPrice = useAddProductPrice();
  const { deleteProductPrice } = useDeleteProductPrice();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [],
    },
  });

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = async (data) => {
    try {
      if (data.prices.length === 0) {
        showToastError("Agrega al menos un precio antes de enviar.");
        return;
      }

      for (const price of data.prices) {
        await addProductPrice(productId, price);
      }

      reset({ prices: [] });
    } catch (error) {
      console.error("Error agregando precios:", error);
      showToastError("Error agregando precios.");
    }
  };

  const handleDeleteExistingPrice = async (priceId) => {
    try {
      await deleteProductPrice(priceId);
    } catch (error) {
      console.error("Error eliminando precio:", error);
    }
  };

  if (!product) {
    return <p className={styles.loading}>Cargando información del producto...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/product/" + productId} />

      <h2 className={styles.title}>Agregar precios</h2>

      <div className={styles.twoColumnLayout}>
       
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Precios actuales</h3>
          {product?.prices?.length === 0 ? (
            <p className={styles.noTags}>No hay precios registrados.</p>
          ) : (
            <div className={styles.priceList}>
              {product?.prices?.map((price) => (
                <div key={price.rent_price_id} className={styles.row}>
                  <span className={styles.cell}>
                    ${price.value} — {price.description}
                  </span>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.removeBadgeBtn}
                      onClick={() => handleDeleteExistingPrice(price.rent_price_id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Agregar nuevos precios</h3>

          {priceFields.map((field, index) => (
            <div key={field.id} className={styles.priceCard}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Valor</label>
                <input
                  type="number"
                  step="0.01"
                  className={styles.input}
                  onWheel={(e) => e.target.blur()}
                  {...register(`prices.${index}.value`, { required: true })}
                />
                {errors.prices?.[index]?.value && (
                  <span className={styles.error}>Campo requerido</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Descripción</label>
                <input
                  type="text"
                  className={styles.input}
                  {...register(`prices.${index}.description`, {
                    required: true,
                  })}
                />
                {errors.prices?.[index]?.description && (
                  <span className={styles.error}>Campo requerido</span>
                )}
              </div>

              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removePrice(index)}
              >
                Eliminar
              </button>
            </div>
          ))}

          <button
            type="button"
            className={styles.addBtn}
            onClick={() => appendPrice({ value: "", description: "" })}
          >
            Agregar precio
          </button>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={priceFields.length === 0}
            >
              Guardar nuevos precios
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductPricesForm;*/

/*------------------------------------------------------ */

/*import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { useAddProductPrice } from "../../hooks/products/useAddProductPrice";
import useDeleteProductPrice from "../../hooks/products/useDeleteProductPrice";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/products/addProductPricesForm.module.css";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";

const AddProductPricesForm = () => {
  const { id } = useParams();
  const productId = id;
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);
  const addProductPrice = useAddProductPrice();
  const { deleteProductPrice } = useDeleteProductPrice();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [],
      newPrice: { value: "", description: "" },
    },
  });

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = async (data) => {
    try {
      if (data.prices.length === 0) {
        showToastError("Agrega al menos un precio antes de enviar.");
        return;
      }

      for (const price of data.prices) {
        await addProductPrice(productId, price);
      }

      reset({ prices: [], newPrice: { value: "", description: "" } });
    } catch (error) {
      console.error("Error agregando precios:", error);
      showToastError("Error agregando precios.");
    }
  };

  const handleDeleteExistingPrice = async (priceId) => {
    try {
      await deleteProductPrice(priceId);
    } catch (error) {
      console.error("Error eliminando precio:", error);
    }
  };

  const handleAddLocalPrice = (data) => {
    if (!data.newPrice.value || !data.newPrice.description) {
      showToastError("Completa ambos campos antes de aceptar.");
      return;
    }

    appendPrice({ ...data.newPrice });

    // resetea solo el formulario de newPrice
    setValue("newPrice", { value: "", description: "" });
  };

  if (!product) {
    return <p className={styles.loading}>Cargando información del producto...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/product/" + productId} />

      <h2 className={styles.title}>Agregar precios</h2>

      <div className={styles.twoColumnLayout}>
        
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Precios actuales</h3>
          <div className={styles.priceList}>
            {product?.prices?.length === 0 ? (
              <p className={styles.noTags}>No hay precios registrados.</p>
            ) : (
              product?.prices?.map((price) => (
                <div key={price.rent_price_id} className={styles.row}>
                  <span className={styles.cell}>
                    ${price.value} — {price.description}
                  </span>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.removeBadgeBtn}
                      onClick={() => handleDeleteExistingPrice(price.rent_price_id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}

            {priceFields.map((price, index) => (
              <div key={price.id} className={styles.badge}>
                ${price.value} — {price.description}
                <button
                  type="button"
                  className={styles.removeBadgeBtn}
                  onClick={() => removePrice(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Nuevo precio</h3>

          <div className={styles.priceCard}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Valor</label>
              <input
                type="number"
                step="0.01"
                className={styles.input}
                onWheel={(e) => e.target.blur()}
                {...register("newPrice.value", { required: true })}
              />
              {errors.newPrice?.value && (
                <span className={styles.error}>Campo requerido</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción</label>
              <input
                type="text"
                className={styles.input}
                {...register("newPrice.description", { required: true })}
              />
              {errors.newPrice?.description && (
                <span className={styles.error}>Campo requerido</span>
              )}
            </div>

            <button
              type="button"
              className={styles.addBtn}
              onClick={handleSubmit(handleAddLocalPrice)}
            >
              Aceptar
            </button>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={priceFields.length === 0}
            >
              Guardar precios
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductPricesForm;*/

/*------------------------------------------- */

/*import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { useAddProductPrice } from "../../hooks/products/useAddProductPrice";
import useDeleteProductPrice from "../../hooks/products/useDeleteProductPrice";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/products/addProductPricesForm.module.css";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";

const AddProductPricesForm = () => {
  const { id } = useParams();
  const productId = id;
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);
  const addProductPrice = useAddProductPrice();
  const { deleteProductPrice } = useDeleteProductPrice();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { value: "", description: "" },
  });

  // Precios "en memoria" agregados con aceptar
  const [localPrices, setLocalPrices] = useState([]);

  const handleAddLocalPrice = () => {
    const value = parseFloat(errors.value ? "" : document.getElementById("priceValue").value);
    const description = document.getElementById("priceDescription").value.trim();

    if (!value || !description) {
      showToastError("Completa ambos campos correctamente.");
      return;
    }

    setLocalPrices([...localPrices, { value, description }]);
    reset(); // Limpia el formulario
  };

  const handleDeleteLocalPrice = (index) => {
    setLocalPrices(localPrices.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (localPrices.length === 0) {
      showToastError("Agrega al menos un precio antes de guardar.");
      return;
    }

    try {
      for (const price of localPrices) {
        await addProductPrice(productId, price);
      }
      setLocalPrices([]);
    } catch (error) {
      console.error("Error agregando precios:", error);
      showToastError("Error agregando precios.");
    }
  };

  const handleDeleteExistingPrice = async (priceId) => {
    try {
      await deleteProductPrice(priceId);
    } catch (error) {
      console.error("Error eliminando precio:", error);
    }
  };

  if (!product) return <p className={styles.loading}>Cargando información del producto...</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/product/" + productId} />
      <h2 className={styles.title}>Agregar precios</h2>

      <div className={styles.twoColumnLayout}>
        
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Precios actuales</h3>
          {product?.prices?.length === 0 ? (
            <p className={styles.noTags}>No hay precios registrados.</p>
          ) : (
            <div className={styles.priceList}>
              {product?.prices?.map((price) => (
                <div key={price.rent_price_id} className={styles.row}>
                  <span className={styles.cell}>
                    ${price.value} — {price.description}
                  </span>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.removeBadgeBtn}
                      onClick={() => handleDeleteExistingPrice(price.rent_price_id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Agregar nuevos precios</h3>

          <div className={styles.badgeScrollContainer}>
            {localPrices.map((price, index) => (
              <div key={index} className={styles.badge}>
                ${price.value} — {price.description}
                <button
                  type="button"
                  className={styles.removeBadgeBtn}
                  onClick={() => handleDeleteLocalPrice(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className={styles.priceCard}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Valor</label>
              <input
                type="number"
                step="0.01"
                id="priceValue"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción</label>
              <input
                type="text"
                id="priceDescription"
                className={styles.input}
              />
            </div>

            <button type="button" className={styles.addBtn} onClick={handleAddLocalPrice}>
              Aceptar
            </button>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn}>
              Guardar precios
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductPricesForm;*/

/*------------------------------------- */

/*import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { useAddProductPrice } from "../../hooks/products/useAddProductPrice";
import useDeleteProductPrice from "../../hooks/products/useDeleteProductPrice";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/products/addProductPricesForm.module.css";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";
import { rentPriceValidator } from "../../validators/products/rentPriceValidator";

const AddProductPricesForm = () => {
  const { id } = useParams();
  const productId = id;
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);
  const addProductPrice = useAddProductPrice();
  const { deleteProductPrice } = useDeleteProductPrice();
  const navigate = useNavigate();

  // Formulario único
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { value: "", description: "" },
  });

  const [localPrices, setLocalPrices] = useState([]);

  const handleAddLocalPrice = async () => {
    const { value, description } = getValues();

    const parsedValue = parseFloat(value);

    try {
      // Validación con Yup
      await rentPriceValidator.validate({
        value: parsedValue,
        description: description.trim(),
      });

      // Agregar precio local solo si es válido
      setLocalPrices([
        ...localPrices,
        { value: parsedValue, description: description.trim() },
      ]);

      // Resetear formulario
      reset({ value: "", description: "" });
    } catch (error) {
      showToastError(error.message);
    }
  };

  const handleDeleteLocalPrice = (index) => {
    setLocalPrices(localPrices.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (localPrices.length === 0) {
      showToastError("Agrega al menos un precio antes de guardar.");
      return;
    }

    try {
      console.error("llego al try");
      for (const price of localPrices) {
        await addProductPrice(productId, price);
      }
      setLocalPrices([]);
    } catch (error) {
      console.error("Error agregando precios:", error);
      showToastError("Error agregando precios.");
    }
  };

  const handleDeleteExistingPrice = async (priceId) => {
    try {
      await deleteProductPrice(priceId);
    } catch (error) {
      console.error("Error eliminando precio:", error);
    }
  };

  if (!product)
    return (
      <p className={styles.loading}>Cargando información del producto...</p>
    );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/product/" + productId} />
      <h2 className={styles.title}>Agregar precios</h2>

      <div className={styles.twoColumnLayout}>
        
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Precios actuales</h3>
          {product?.prices?.length === 0 ? (
            <p className={styles.noTags}>No hay precios registrados.</p>
          ) : (
            <div className={styles.priceList}>
              {product?.prices?.map((price) => (
                <div key={price.rent_price_id} className={styles.row}>
                  <span className={styles.cell}>
                    ${price.value} — {price.description}
                  </span>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.removeBadgeBtn}
                      onClick={() =>
                        handleDeleteExistingPrice(price.rent_price_id)
                      }
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Agregar nuevos precios</h3>

          
          <div className={styles.badgeScrollContainer}>
            {localPrices.map((price, index) => (
              <div key={index} className={styles.badge}>
                ${price.value} — {price.description}
                <button
                  type="button"
                  className={styles.removeBadgeBtn}
                  onClick={() => handleDeleteLocalPrice(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          
          <div className={styles.priceCard}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Valor</label>
              <input
                type="number"
                step="0.01"
                className={styles.input}
                {...register("value", { required: true })}
              />
              {errors.value && (
                <span className={styles.error}>Campo requerido</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción</label>
              <input
                type="text"
                className={styles.input}
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className={styles.error}>Campo requerido</span>
              )}
            </div>

            <button
              type="button"
              className={styles.addBtn}
              onClick={handleAddLocalPrice}
            >
              Aceptar
            </button>
          </div>

          
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn}>
              Guardar precios
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductPricesForm;*/





/*--------------------------------------------------- */


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { useAddProductPrice } from "../../hooks/products/useAddProductPrice";
import useDeleteProductPrice from "../../hooks/products/useDeleteProductPrice";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/products/addProductPricesForm.module.css";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";
import { rentPriceValidator } from "../../validators/products/rentPriceValidator";

const AddProductPricesForm = () => {
  const { id } = useParams();
  const productId = id;
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);
  const addProductPrice = useAddProductPrice();
  const { deleteProductPrice } = useDeleteProductPrice();
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { value: "", description: "" },
  });

  const [localPrices, setLocalPrices] = useState([]);

  // Agregar precio local (en memoria)
  const handleAddLocalPrice = async () => {
    const { value, description } = getValues();
    const parsedValue = Number(value);

    try {
      // Validación con Yup
      await rentPriceValidator.validate({
        value: parsedValue,
        description: description.trim(),
      });

      // Agregar precio a lista local
      setLocalPrices([
        ...localPrices,
        { value: parsedValue, description: description.trim() },
      ]);

      // Resetear formulario
      reset({ value: "", description: "" });
    } catch (error) {
      showToastError(error.message);
    }
  };

  const handleDeleteLocalPrice = (index) => {
    setLocalPrices(localPrices.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (localPrices.length === 0) {
      showToastError("Agrega al menos un precio antes de guardar.");
      return;
    }

    try {
      for (const price of localPrices) {
        await addProductPrice(productId, price);
      }
      setLocalPrices([]);
    } catch (error) {
      console.error("Error agregando precios:", error);
      showToastError("Error agregando precios.");
    }
  };

  const handleDeleteExistingPrice = async (priceId) => {
    try {
      await deleteProductPrice(priceId);
    } catch (error) {
      console.error("Error eliminando precio:", error);
    }
  };

  if (!product)
    return <p className={styles.loading}>Cargando información del producto...</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/product/" + productId} />
      <h2 className={styles.title}>Agregar precios</h2>

      <div className={styles.twoColumnLayout}>
        {/* Izquierda: precios existentes */}
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Precios actuales</h3>
          {product?.prices?.length === 0 ? (
            <p className={styles.noTags}>No hay precios registrados.</p>
          ) : (
            <div className={styles.priceList}>
              {product?.prices?.map((price) => (
                <div key={price.rent_price_id} className={styles.row}>
                  <span className={styles.cell}>
                    {price.value} USD — {price.description}
                  </span>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.removeBadgeBtn}
                      onClick={() =>
                        handleDeleteExistingPrice(price.rent_price_id)
                      }
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Derecha: agregar nuevos precios */}
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Agregar nuevos precios</h3>

          {/* Badges de precios locales */}
          <div className={styles.badgeScrollContainer}>
            {localPrices.map((price, index) => (
              <div key={index} className={styles.badge}>
                {price.value} USD — {price.description}
                <button
                  type="button"
                  className={styles.removeBadgeBtn}
                  onClick={() => handleDeleteLocalPrice(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Formulario único */}
          <div className={styles.priceCard}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Valor</label>
              <input
                type="number"
                step="0.01"
                className={styles.input}
                {...register("value")}
              />
              {errors.value && (
                <span className={styles.error}>Campo requerido</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción</label>
              <input
                type="text"
                className={styles.input}
                {...register("description")}
              />
              {errors.description && (
                <span className={styles.error}>Campo requerido</span>
              )}
            </div>

            <button
              type="button"
              className={styles.addBtn}
              onClick={handleAddLocalPrice}
            >
              Aceptar
            </button>
          </div>

          {/* Botón final */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn}>
              Guardar precios
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductPricesForm;
