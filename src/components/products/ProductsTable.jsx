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

  return (
    <div className="table-responsive">
      <table className={`table table-striped table-hover ${styles.customTable}`}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Artículos Totales</th>
            <th>Artículos Disponibles</th>
            <th>Comentarios</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {filteredProducts.length > 0 ? (
            filteredProducts?.map((product) => (
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
