import React from "react";
import ProductRow from "./ProductRow";
import styles from "../../styles/products/productTable.module.css";

const ProductsTable = ({ products, searchTerm }) => {
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.brand?.toLowerCase().includes(term) ||
      product.model?.toLowerCase().includes(term)
    );
  });

  if (!filteredProducts.length) {
    return <div className={styles.noData}>No se encontraron resultados.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="Listado de productos">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              {/*<th>Artículos Totales</th>
              <th>Artículos Disponibles</th>*/}
              <th>Comentarios</th>
              <th colSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
