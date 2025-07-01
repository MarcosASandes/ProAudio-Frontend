import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/products/productRow.module.css";

const ProductRow = ({ product }) => {

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleItemsClick = () => {
    navigate(`/product/${product.id}/items`);
  };

  return (
    <tr>
      <td>{product.brand ? product.brand : "N/A"}</td>
      <td>{product.model}</td>
      <td>{product.items}</td>
      <td>{product.available}</td>
      <td>{product.comments}</td>
      <td>
        <button className={`btn btn-sm ${styles.btnPurple}`} onClick={handleItemsClick}>
          Artículos
        </button>
      </td>
      <td>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleDetailsClick}>
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
