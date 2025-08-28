import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedItemDetails } from "../../features/items/ItemSelector";
import useDeleteItem from "../../hooks/items/useDeleteItem";
import useGetItemDetails from "../../hooks/items/useGetItemDetails";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/items/itemDetails.module.css";
import useRegenerateQr from "../../hooks/items/useRegenerateQr";
import {
  generateEsterilizedQR,
  downloadCanvasAsImage,
} from "../../utils/qrUtils";
import logo from "../../assets/proaudio-logo-1.png";
import {
  getItemsStatusLabel,
  getItemsLocationLabel,
} from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import { Pencil, Trash2, Download } from "lucide-react";

const ItemDetails = () => {
  const { id } = useParams();
  useGetItemDetails(id);
  const item = useSelector(selectSelectedItemDetails);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteItem = useDeleteItem();
  const navigate = useNavigate();
  const regenerateQr = useRegenerateQr();

  if (!item) return <p>No se encontraron detalles del artículo.</p>;

  const handleConfirmDelete = async () => {
    await deleteItem(id);
    setShowDeleteModal(false);
    navigate("/product/" + item.product?.product_id + "/items");
  };

  const handleDownload = async () => {
    const itemRegenerateQr = await regenerateQr(id);
    if (!itemRegenerateQr) return;
    const canvas = await generateEsterilizedQR(
      itemRegenerateQr.qr_image,
      logo,
      itemRegenerateQr.item_id,
      item.product?.model
    );
    downloadCanvasAsImage(canvas, `item-${itemRegenerateQr.item_id}-serie${item.serial_number}-qr.png`);
  };

  return (
    <>
      <div className={styles.container}>
        <BackButton
          target={"/product/" + item.product?.product_id + "/items"}
        />
        <div className={styles.header}>
          <h4>Detalles del Artículo</h4>
          <div className="d-flex gap-2">
            <button
              className={`btn ${styles.btnPurple} ${styles.button} btn-sm`}
              onClick={handleDownload}
            >
              <Download size={16} className="me-1" />
              Descargar QR
            </button>
            <button
              className={`btn ${styles.btnBlue} ${styles.button} btn-sm`}
              onClick={() => navigate("/items/" + id + "/edit")}
            >
              <Pencil size={16} className="me-1" />
              Modificar
            </button>
            <button
              className={`btn ${styles.btnRed} ${styles.button} btn-sm`}
              onClick={() => setShowDeleteModal(true)}
              disabled={item.status === "DELETED"}
            >
              <Trash2
                size={16}
                color={item.status === "DELETED" ? "#aaa" : "currentColor"}
                className="me-1"
              />
              Eliminar
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className={styles.box}>
              <h5 className={styles.boxTitle}>Datos del Artículo</h5>
              <p>
                <strong>ID:</strong> {id}
              </p>
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
                <strong>Precio de compra:</strong> {item.price_bought} USD
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
                <strong>Marca:</strong> {item.product?.brand || "Sin marca"}
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

      {/* Modal de confirmación estilo ClientDetails */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Eliminar artículo</h2>
            <p className={styles.modalText}>
              ¿Seguro/a que deseas eliminar este artículo?{" "}
              <strong>Esta acción no se podrá deshacer.</strong>
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className={styles.confirmDeleteButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
