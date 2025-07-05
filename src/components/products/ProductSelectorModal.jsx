/*import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsTable from "../products/ProductsTable";
import useGetAllProducts from "../../hooks/products/useGetAllProducts";
import Pagination from "../global/Pagination";
import { selectProducts, selectProductsPageable, selectProductsLoading, selectProductsError } from "../../features/products/ProductSelector";

const ProductSelectorModal = ({ show, onClose, onProductSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useGetAllProducts(currentPage, pageSize);

  const products = useSelector(selectProducts);
  const pageable = useSelector(selectProductsPageable);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (!show) setCurrentPage(1); // reset page when closing
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar producto</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Disponibles</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.brand}</td>
                      <td>{product.model}</td>
                      <td>{product.available ? "Sí" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            onProductSelect(product);
                            onClose();
                          }}
                        >
                          Seleccionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="modal-footer">
            <Pagination pageable={pageable} onPageChange={setCurrentPage} />
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectorModal;*/

/*--------------- */

/*
import React, { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";
import { useSelector } from "react-redux";
import useGetAllProducts from "../../hooks/products/useGetAllProducts";
import Pagination from "../global/Pagination";
import { selectProducts, selectProductsPageable, selectProductsLoading, selectProductsError } from "../../features/products/ProductSelector";

const ProductSelectorModal = ({ onClose }) => {
  const [page, setPage] = useState(1);
  const size = 10;

  useGetAllProducts(page, size);

  const products = useSelector(selectProducts);
  const pageable = useSelector(selectProductsPageable);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    const modal = new bootstrap.Modal(document.getElementById("productSelectorModal"));
    modal.show();

    const handleClose = () => {
      modal.hide();
      onClose();
    };

    const closeBtn = document.getElementById("closeProductSelectorModal");
    if (closeBtn) closeBtn.onclick = handleClose;

    return () => {
      if (closeBtn) closeBtn.onclick = null;
    };
  }, [onClose]);

  return (
    <div
      className="modal fade"
      id="productSelectorModal"
      tabIndex="-1"
      aria-labelledby="productSelectorModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="productSelectorModalLabel">
              Seleccionar producto
            </h5>
            <button
              type="button"
              className="btn-close"
              id="closeProductSelectorModal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
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
                            onClick={() => {
                              alert(`Producto seleccionado: ${product.model}`);
                              // Aquí luego llamarás a una función para pasar el producto al formulario
                            }}
                          >
                            Seleccionar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination pageable={pageable} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectorModal;*/

/*----------------------- */

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
