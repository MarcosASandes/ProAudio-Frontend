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
    reset,
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
      showToastError(err.message);
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
        serial_numbers: (item.serialNumbers ?? []).flatMap((snObj) =>
          snObj.serial_numbers.map((sn) => sn.serial_number)
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
      {/* Título principal */}
      <h2 className={styles.mainTitle}>Crear artículos</h2>

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
                <p className={styles.error}>
                  {errors.items[0].description.message}
                </p>
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
                  <p className={styles.error}>
                    {errors.items[0].purchase_price.message}
                  </p>
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
                  <p className={styles.error}>
                    {errors.items[0].purchase_date.message}
                  </p>
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
                  <p className={styles.error}>
                    {errors.items[0].quantity.message}
                  </p>
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
                  <p className={styles.error}>
                    {errors.items[0].itemRange.message}
                  </p>
                )}
              </div>
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

        {/* Carrito */}
        <div className={styles.cartSection}>
          <h3 className={styles.cartTitle}>Carrito</h3>
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
          <button className={styles.submitButton} onClick={onSubmit}>
            Crear artículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemsForm;
