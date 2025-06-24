

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedItemDetails } from "../../features/items/ItemSelector";
import * as bootstrap from "bootstrap";
import useDeleteItem from "../../hooks/items/useDeleteItem"; // lo crearás abajo
import { useParams } from "react-router-dom";
import useGetItemDetails from "../../hooks/items/useGetItemDetails";

const ItemDetails = () => {
  const { id } = useParams();
  useGetItemDetails(id);
  const item = useSelector(selectSelectedItemDetails);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const deleteItem = useDeleteItem(); // custom hook

  if (!item) return <p>No se encontraron detalles del artículo.</p>;

  const handleShowModal = () => {
    setItemIdToDelete(item.item_id);
    const modalEl = document.getElementById("deleteItemModal");
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  };

  const handleConfirmDelete = () => {
    deleteItem(id);
  };

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between">
          <h4>Detalles del Artículo</h4>
          <button className="btn btn-danger btn-sm" onClick={handleShowModal}>
            Eliminar Artículo
          </button>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>Descripción:</strong>
            <p>{item.description}</p>
          </div>

          <div className="mb-3">
            <strong>Estado:</strong>
            <p>{item.status}</p>
          </div>

          <div className="mb-3">
            <strong>Ubicación:</strong>
            <p>{item.location}</p>
          </div>

          <div className="mb-3">
            <strong>Precio de compra:</strong>
            <p>${item.price_bought}</p>
          </div>

          <div className="mb-3">
            <strong>Fecha de compra:</strong>
            <p>{item.bought_at}</p>
          </div>

          <hr />

          <h5>Producto asociado</h5>
          <div className="mb-2">
            <strong>Marca:</strong>
            <p>{item.product?.brand}</p>
          </div>

          <div className="mb-2">
            <strong>Modelo:</strong>
            <p>{item.product?.model}</p>
          </div>

          <div className="mb-2">
            <strong>ID Producto:</strong>
            <p>{item.product?.product_id}</p>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <div
        className="modal fade"
        id="deleteItemModal"
        tabIndex="-1"
        aria-labelledby="deleteItemModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteItemModalLabel">
                Confirmar Eliminación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro/a de que deseas eliminar este artículo?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleConfirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
