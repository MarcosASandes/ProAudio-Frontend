import React, { useState } from "react";
import { useSelector } from "react-redux";
import useGetAllProducts from "../../hooks/products/useGetAllProducts";
import Pagination from "../global/Pagination";
import { selectProducts, selectProductsPageable, selectProductsLoading, selectProductsError } from "../../features/products/ProductSelector";

const ProductSelectorModal = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const size = 10;

  useGetAllProducts(page, size);

  const products = useSelector(selectProducts);
  const pageable = useSelector(selectProductsPageable);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  return (
    <>
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.brand}</td>
                    <td>{product.model}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onSelect(product)}
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination pageable={pageable} onPageChange={setPage} />
        </>
      )}
    </>
  );
};

export default ProductSelectorModal;
