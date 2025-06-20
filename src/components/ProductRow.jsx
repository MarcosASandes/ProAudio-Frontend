import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductRow = ({ product }) => {

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.brand ? product.brand : "N/A"}</td>
      <td>{product.model}</td>
      <td>{product.items}</td>
      <td>{product.available}</td>
      <td>{product.comments}</td>
      <td>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleDetailsClick}>
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
