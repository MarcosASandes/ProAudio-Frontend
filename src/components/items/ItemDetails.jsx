/*import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedItemDetails } from "../../features/items/ItemSelector";
import * as bootstrap from "bootstrap";
import useDeleteItem from "../../hooks/items/useDeleteItem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGetItemDetails from "../../hooks/items/useGetItemDetails";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/items/itemDetails.module.css";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import stylesButtons from "../../styles/generic/buttonsStyles.module.css";
import { getItemsLocationLabel, getItemsStatusLabel } from "../../utils/startingProjectStatusLabel";

const ItemDetails = () => {
  const { id } = useParams();
  useGetItemDetails(id);
  const item = useSelector(selectSelectedItemDetails);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const deleteItem = useDeleteItem();
  const navigate = useNavigate();

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
    <div className={styles.container}>
      <button
        type="button"
        className={`pb-2 ${stylesBackButtom.btnBackArrow}`}
        onClick={() => navigate("/product/" + item.product?.product_id + "/items")}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Detalles del Artículo</h4>
          <div className="d-flex gap-2">
            <button
              className={`btn ${stylesButtons.btnBlue} btn-sm`}
              onClick={() => navigate("/items/" + id + "/edit")}
            >
              Modificar Artículo
            </button>
            <button className={`btn ${stylesButtons.btnRed} btn-sm`} onClick={handleShowModal}>
              Eliminar Artículo
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className={styles.box}>
              <h5 className={styles.boxTitle}>Datos del Artículo</h5>
              <p>
                <strong>Descripción:</strong> {item.description}
              </p>
              <p>
                <strong>Estado:</strong> {getItemsStatusLabel(item.status)}
              </p>
              <p>
                <strong>Ubicación:</strong> {getItemsLocationLabel(item.location)}
              </p>
              <p>
                <strong>Precio de compra:</strong> ${item.price_bought}
              </p>
              <p>
                <strong>Fecha de compra:</strong> {item.bought_at}
              </p>
              <p>
                <strong>Rango de frecuencia:</strong> {item.product?.range}
              </p>
              <p>
                <strong>Número de serie:</strong> {item.product?.serial_number}
              </p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className={styles.box}>
              <h5 className={styles.boxTitle}>Producto asociado</h5>
              <p>
                <strong>Marca:</strong> {item.product?.brand? item.product?.brand : "Sin marca"}
              </p>
              <p>
                <strong>Modelo:</strong> {item.product?.model}
              </p>
              <p>
                <strong>ID Producto:</strong> {item.product?.product_id}
              </p>
              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => navigate("/product/" + item.product?.product_id)}
              >
                Ver producto
              </button>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default ItemDetails;*/

/*------------------- */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedItemDetails } from "../../features/items/ItemSelector";
import * as bootstrap from "bootstrap";
import useDeleteItem from "../../hooks/items/useDeleteItem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGetItemDetails from "../../hooks/items/useGetItemDetails";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/items/itemDetails.module.css";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import stylesButtons from "../../styles/generic/buttonsStyles.module.css";
import {
  getItemsLocationLabel,
  getItemsStatusLabel,
} from "../../utils/startingProjectStatusLabel";
import useRegenerateQr from "../../hooks/items/useRegenerateQr";
import { selectItemRegenerateQr } from "../../features/items/ItemSelector";
import { generateEsterilizedQR, downloadCanvasAsImage } from "../../utils/qrUtils";
import logo from "../../assets/proaudio-logo-1.png";

const ItemDetails = () => {
  const { id } = useParams();
  useGetItemDetails(id);
  const regenerateQr = useRegenerateQr();
  const item = useSelector(selectSelectedItemDetails);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const deleteItem = useDeleteItem();
  const navigate = useNavigate();
  //const itemRegenerateQr = useSelector(selectItemRegenerateQr);

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

  const handleDownload = async () => {
    const itemRegenerateQr = await regenerateQr(id);
    //const itemRegenerateQr = useSelector(selectItemRegenerateQr);

    if (!itemRegenerateQr) return;
    const canvas = await generateEsterilizedQR(
      itemRegenerateQr.qr_image,
      logo,
      itemRegenerateQr.item_id,
      item.product?.model
    );
    downloadCanvasAsImage(canvas, `item-${itemRegenerateQr.item_id}-qr.png`);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`pb-2 ${stylesBackButtom.btnBackArrow}`}
        onClick={() =>
          navigate("/product/" + item.product?.product_id + "/items")
        }
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Detalles del Artículo</h4>
          <div className="d-flex gap-2">
            <button
              className={`btn ${stylesButtons.btnPurple} btn-sm`}
              onClick={handleDownload}

            >
              Descargar QR
            </button>
            <button
              className={`btn ${stylesButtons.btnBlue} btn-sm`}
              onClick={() => navigate("/items/" + id + "/edit")}
            >
              Modificar Artículo
            </button>
            <button
              className={`btn ${stylesButtons.btnRed} btn-sm`}
              onClick={handleShowModal}
            >
              Eliminar Artículo
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className={styles.box}>
              <h5 className={styles.boxTitle}>Datos del Artículo</h5>
              <p>
                <strong>Descripción:</strong> {item.description}
              </p>
              <p>
                <strong>Estado:</strong> {getItemsStatusLabel(item.status)}
              </p>
              <p>
                <strong>Ubicación:</strong>{" "}
                {getItemsLocationLabel(item.location)}
              </p>
              <p>
                <strong>Precio de compra:</strong> ${item.price_bought}
              </p>
              <p>
                <strong>Fecha de compra:</strong> {item.bought_at}
              </p>
              <p>
                <strong>Rango de frecuencia:</strong> {item.range}
              </p>
              <p>
                <strong>Número de serie:</strong> {item.serial_number}
              </p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className={styles.box}>
              <h5 className={styles.boxTitle}>Producto asociado</h5>
              <p>
                <strong>Marca:</strong>{" "}
                {item.product?.brand ? item.product?.brand : "Sin marca"}
              </p>
              <p>
                <strong>Modelo:</strong> {item.product?.model}
              </p>
              <p>
                <strong>ID Producto:</strong> {item.product?.product_id}
              </p>
              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => navigate("/product/" + item.product?.product_id)}
              >
                Ver producto
              </button>
            </div>
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
    </div>
  );
};

export default ItemDetails;
