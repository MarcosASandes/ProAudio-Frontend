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

  useGetPricesByProductId(productId);

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
