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
