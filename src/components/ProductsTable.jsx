/*import React, { useState } from "react";
import ProductRow from "./ProductRow";
import { ChevronUp, ChevronDown } from "lucide-react";
import "../styles/products.css";

const mockProducts = [
  { id: 1, brand: "SENNHEISER", model: "EW DX EM 2", price: 200, total: 4, available: 2, status: "green" },
  { id: 2, brand: "SENNHEISER", model: "EW DX - SK BODY", price: 400, total: 6, available: 6, status: "green" },
  { id: 3, brand: "", model: "MMD 935 MIC CAP", price: 450, total: 4, available: 3, status: "yellow" },
  { id: 4, brand: "SENNHEISER", model: "Otro modelo", price: 500, total: 2, available: 0, status: "red" },
];

const headers = [
  { key: "brand", label: "Marca" },
  { key: "model", label: "Modelo" },
  { key: "price", label: "Alquiler / día (USD)" },
  { key: "total", label: "Nº Artículos" },
  { key: "available", label: "Disponibles" },
];

const ProductsTable = () => {
  const [sortBy, setSortBy] = useState("brand");
  const [direction, setDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortBy === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setDirection("asc");
    }
  };

  return (
    <div className="products-table-wrapper">
      <table className="products-table table table-dark table-hover align-middle mb-0">
        <thead className="border-secondary">
          <tr>
            <th></th>
            {headers.map((h) => (
              <th key={h.key} onClick={() => handleSort(h.key)} style={{ cursor: "pointer" }}>
                {h.label}{" "}
                {sortBy === h.key ? (
                  direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                ) : null}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mockProducts.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
*/


/*-------------------------- */

/*import React, { useState } from "react";
import ProductRow from "./ProductRow";
import { ChevronUp, ChevronDown } from "lucide-react";
import "../styles/products.css";

const headers = [
  { key: "brand", label: "Marca" },
  { key: "model", label: "Modelo" },
  { key: "price", label: "Alquiler / día (USD)" },
  { key: "total", label: "Nº Artículos" },
  { key: "available", label: "Disponibles" },
];

const ProductsTable = ({ products }) => {
  const [sortBy, setSortBy] = useState("brand");
  const [direction, setDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortBy === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const valA = a[sortBy]?.toString().toLowerCase() || "";
    const valB = b[sortBy]?.toString().toLowerCase() || "";

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="products-table-wrapper">
      <table className="products-table table table-dark table-hover align-middle mb-0">
        <thead className="border-secondary">
          <tr>
            <th></th>
            {headers.map((h) => (
              <th key={h.key} onClick={() => handleSort(h.key)} style={{ cursor: "pointer" }}>
                {h.label}{" "}
                {sortBy === h.key ? (
                  direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                ) : null}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;*/


/*----------------------- */

/* ORIGINAL ANTERIOR

import React, { useState } from "react";
import ProductRow from "./ProductRow";
import { ChevronUp, ChevronDown } from "lucide-react";
import "../styles/products.css";

const headers = [
  { key: "brand", label: "Marca" },
  { key: "model", label: "Modelo" },
  { key: "price", label: "Alquiler / día (USD)" },
  { key: "total", label: "Nº Artículos" },
  { key: "available", label: "Disponibles" },
];

const ProductsTable = ({ products }) => {
  const [sortBy, setSortBy] = useState("brand");
  const [direction, setDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortBy === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const valA = a[sortBy]?.toString().toLowerCase() || "";
    const valB = b[sortBy]?.toString().toLowerCase() || "";

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="products-table-wrapper">
      <table className="products-table table table-dark table-hover align-middle mb-0">
        <thead className="border-secondary">
          <tr>
            <th></th>
            {headers.map((h) => (
              <th key={h.key} onClick={() => handleSort(h.key)} style={{ cursor: "pointer" }}>
                {h.label}{" "}
                {sortBy === h.key ? (
                  direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                ) : null}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;*/


/*------------------- */

// components/ProductsTable.jsx

/*import React from "react";
import ProductRow from "./ProductRow";

const ProductsTable = ({ products }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Alquiler / Día (USD)</th>
            <th>Artículos Totales</th>
            <th>Artículos Disponibles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;*/


/*--------------------------------- */

import React from "react";
import ProductRow from "./ProductRow";

const ProductsTable = ({ products, searchTerm }) => {
  // 🔑 Filtra los productos según el texto de búsqueda
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.brand?.toLowerCase().includes(term) ||
      product.model?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Artículos Totales</th>
            <th>Artículos Disponibles</th>
            <th>Comentarios</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
