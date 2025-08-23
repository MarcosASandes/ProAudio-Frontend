/*import { useEffect } from "react";
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

export default ProductFieldItem;*/


/*------------------------------------------------------- */


import { useSelector } from "react-redux";
import useGetPricesByProductId from "../../hooks/products/useGetPricesByProductId";
import { selectProductPrices } from "../../features/products/ProductSelector";
import { Trash2 } from "lucide-react";
import styles from "../../styles/projects/addProductsProjectForm.module.css";

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

  // Hook para cargar precios si hay productoId
  useGetPricesByProductId(productId);

  // Obtener precios desde store
  const prices = useSelector((state) =>
    selectProductPrices(state, productId)
  );

  return (
    <div className={styles.productFieldItem}>
      {/* Producto */}
      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel}>Producto</label>
        <button
          type="button"
          className={styles.selectButton}
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
      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel}>Precio</label>
        <select
          className={styles.selectInput}
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
      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel}>Cantidad</label>
        <input
          type="number"
          onWheel={(e) => e.target.blur()}
          className={styles.numberInput}
          {...register(`products.${index}.amount`)}
        />
      </div>

      {/* Botón eliminar */}
      <div className={styles.removeBtnWrapper}>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => removeProduct(index)}
        >
          <Trash2 size={18} /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductFieldItem;
