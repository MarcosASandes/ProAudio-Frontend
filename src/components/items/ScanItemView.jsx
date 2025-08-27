import React, { useEffect } from "react";
import useItemScanner from "../../hooks/items/useItemScanner";
import { useSelector } from "react-redux";
import { selectSelectedItem } from "../../features/items/ItemSelector";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/items/scanItemView.module.css";
import {
  getItemsLocationLabel,
  getItemsStatusLabel,
} from "../../utils/getLabels";
import useReturnItemById from "../../hooks/items/useReturnItemById";

const ScanItemView = () => {
  const {
    startScan,
    stopScan,
    scanning,
    cameraError,
    retryCamera,
    scannerRef,
  } = useItemScanner();
  const item = useSelector(selectSelectedItem);
  /*const item = {
    item_id: 438,
    product_id: 92,
    location: "IN_DEPOSIT",
    status: "CREATED",
    description: "maaaaarcossssssssssss",
    price_bought: 298.0,
    bought_at: "2025-08-09",
    updated_at: "2025-08-18T00:00:00",
    item_range: "ASF5",
    serial_number: "ASF54",
    qr_image: null,
  };*/

  const { fetchReturnItemById } = useReturnItemById();

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  const navigate = useNavigate();

  const handleReturnItemById = () => {
    fetchReturnItemById(item.item_id);
  }

  return (
    <div className={styles.scanItemContainer}>
      {/* 📷 Parte izquierda */}
      <div className={styles.scanLeft}>
        <div
          id="qr-reader"
          ref={scannerRef}
          className={styles.scannerArea}
        ></div>

        {!scanning && !cameraError && (
          <button className={styles.btnScan} onClick={startScan}>
            Escanear
          </button>
        )}

        {cameraError && (
          <div className={styles.cameraError}>
            <p>No se encontró una cámara disponible.</p>
            <button className={styles.btnRetry} onClick={retryCamera}>
              Reintentar
            </button>
          </div>
        )}
      </div>

      {/* 📑 Parte derecha */}
      <div className={styles.scanRight}>
        {item ? (
          <div className={styles.itemDetails}>
            <h3>Artículo con ID {item.item_id}</h3>
            <p>
              <strong>Ubicación:</strong> {getItemsLocationLabel(item.location)}
            </p>
            <p>
              <strong>Estado:</strong> {getItemsStatusLabel(item.status)}
            </p>
            <p>
              <strong>Descripción:</strong> {item.description}
            </p>
            <p>
              <strong>Rango de frecuencia:</strong> {item.item_range}
            </p>
            <p>
              <strong>Número de serie:</strong> {item.serial_number}
            </p>
            <div className={styles.actionButtons}>
              <button className={styles.btnAction} onClick={handleReturnItemById}>Retornar artículo</button>
              <button
                className={styles.btnAction}
                onClick={() => navigate("/item/" + item.item_id + "/details")}
              >
                Ver detalle
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.noItem}>
            Escanee un artículo para ver sus detalles aquí
          </p>
        )}
      </div>
    </div>
  );
};

export default ScanItemView;
