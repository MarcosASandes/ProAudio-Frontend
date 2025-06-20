/*import React from "react";
import { ArrowRight } from "lucide-react";

const statusColor = {
  green: "#28a745",
  yellow: "#ffc107",
  red: "#dc3545",
};

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td>
        {product.status && (
          <span
            style={{
              backgroundColor: statusColor[product.status],
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        )}
      </td>
      <td>{product.brand}</td>
      <td>{product.model}</td>
      <td>${product.price}</td>
      <td>{product.total}</td>
      <td>{product.available}</td>
      <td>
        <ArrowRight size={18} style={{ color: "#7355ce" }} />
      </td>
    </tr>
  );
};

export default ProductRow;*/

/*------------------------------------- */

/*original anterior

import React from "react";
import { ArrowRight } from "lucide-react";

const statusColor = {
  green: "#28a745",
  yellow: "#ffc107",
  red: "#dc3545",
};

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td data-label="">
        {product.status && (
          <span
            style={{
              backgroundColor: statusColor[product.status],
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        )}
      </td>
      <td data-label="Marca">{product.brand}</td>
      <td data-label="Modelo">{product.model}</td>
      <td data-label="Alquiler / día (USD)">${product.price}</td>
      <td data-label="Nº Artículos">{product.total}</td>
      <td data-label="Disponibles">{product.available}</td>
      <td data-label="">
        <ArrowRight size={18} style={{ color: "#7355ce" }} />
      </td>
    </tr>
  );
};

export default ProductRow;*/

/*----------------------------- */

// components/ProductRow.jsx

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
