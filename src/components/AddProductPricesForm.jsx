import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../features/products/ProductSelector";
import { useAddProductPrice } from "../hooks/products/useAddProductPrice";
import useDeleteProductPrice from "../hooks/products/useDeleteProductPrice";
import { toast } from "react-toastify";
import useGetProductDetails from "../hooks/products/useGetProductDetails";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        toast.warn("Agrega al menos un precio antes de enviar.");
        return;
      }

      // 👉 Iterar sobre cada precio y enviarlo individualmente
      for (const price of data.prices) {
        await addProductPrice(productId, price);
      }

      toast.success("Precios agregados correctamente.");

      // Limpiar campos locales
      reset({ prices: [] });
    } catch (error) {
      console.error("Error agregando precios:", error);
      toast.error("Error agregando precios.");
    }
  };

  const handleDeleteExistingPrice = async (priceId) => {
    try {
      await deleteProductPrice(priceId);
      toast.success("Precio eliminado correctamente.");
    } catch (error) {
      console.error("Error eliminando precio:", error);
      toast.error("Error eliminando precio.");
    }
  };

  if (!product) {
    return <p className="text-light">Cargando información del producto...</p>;
  }

  return (
    <>
      <button
        type="button"
        className="btn-back-arrow"
        onClick={() => navigate("/products")}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 🔵 Bloque: Precios actuales */}
        <div className="mb-4">
          <h5 className="text-light">Precios actuales del producto</h5>
          {product?.prices?.length === 0 ? (
            <p className="text-light">No hay precios registrados.</p>
          ) : (
            <ul className="list-group">
              {product.prices.map((price) => (
                <li
                  key={price.rent_price_id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    ${price.value} — {price.description} ({price.status})
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
        <button type="submit" className="btn btn-success">
          Guardar nuevos precios
        </button>
      </form>
    </>
  );
};

export default AddProductPricesForm;
