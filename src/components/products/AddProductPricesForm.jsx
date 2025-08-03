import React from "react";
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
        {/* 🔵 Bloque: Precios actuales */}
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

        {/* 🔵 Bloque: Nuevos precios a agregar */}
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

        {/* 🔵 Botón Submit */}
        <button type="submit" className={`btn ${styles.btnPurple}`}>
          Guardar nuevos precios
        </button>
      </form>
    </div>
  );
};

export default AddProductPricesForm;
