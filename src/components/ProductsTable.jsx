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
