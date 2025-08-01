import { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetPricesByProductId from "../../hooks/products/useGetPricesByProductId";
import { selectProductPrices } from "../../features/products/ProductSelector";

const ProductFieldItem = ({
  index,
  field,
  register,
  getValues,
  watch,
  setCurrentProductIndex,
  setShowProductModal,
  removeProduct,
}) => {
  const productId = watch(`products.${index}.product_id`);
  const productLabel = getValues(`products.${index}.product_label`);

  // Hook que carga precios si hay productoId
  useGetPricesByProductId(productId);

  // Obtener precios desde store
  const prices = useSelector((state) =>
    selectProductPrices(state, productId)
  );

  return (
    <div className="border p-3 mb-2 rounded bg-secondary bg-opacity-10">
      {/* Producto */}
      <div className="mb-2">
        <label className="form-label text-light">Producto</label>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            setCurrentProductIndex(index);
            setShowProductModal(true);
          }}
        >
          {productLabel || "Seleccionar producto"}
        </button>
        <input
          type="hidden"
          {...register(`products.${index}.product_id`)}
        />
      </div>

      {/* Precio */}
      <div className="mb-2">
        <label className="form-label text-light">Precio</label>
        <select
          className="form-select"
          disabled={!productId}
          {...register(`products.${index}.price_id`)}
        >
          <option value="">Seleccionar precio</option>
          {prices &&
            prices?.prices?.map((price) => (
              <option key={price.rent_price_id} value={price.rent_price_id}>
                {price.description} - ${price.value}
              </option>
            ))}
        </select>
      </div>

      {/* Cantidad */}
      <div className="mb-2">
        <label className="form-label text-light">Cantidad</label>
        <input
          type="number"
          onWheel={(e) => e.target.blur()}
          className="form-control"
          {...register(`products.${index}.amount`)}
        />
      </div>

      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => removeProduct(index)}
      >
        Eliminar producto
      </button>
    </div>
  );
};

export default ProductFieldItem;
