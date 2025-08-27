import React from "react";
import { SquareArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/products/productTable.module.css";

const ProductRow = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleItemsClick = () => {
    navigate(`/product/${product.id}/items`);
  };

  return (
    <tr className={styles.row}>
      <td title={product.brand || "N/A"}>{product.brand || "N/A"}</td>
      <td title={product.model}>{product.model}</td>
      <td title={product.items}>{product.items}</td>
      <td title={product.available}>{product.available}</td>
      <td title={product.comments}>{product.comments}</td>
      <td className={styles.actions}>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Ver artículos del producto ${product.model}`}
          title={`Ver artículos del producto ${product.model}`}
          onClick={handleItemsClick}
        >
          Artículos
        </button>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Ver detalle del producto ${product.model}`}
          title={`Ver detalle del producto ${product.model}`}
          onClick={handleDetailsClick}
        >
          <SquareArrowRight size={22} />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
