import React, { useEffect } from "react";
import useItemScanner from "../../hooks/items/useItemScanner";
import { useSelector } from "react-redux";
import { selectSelectedItem } from "../../features/items/ItemSelector";
import { useNavigate } from "react-router-dom";
import "../../styles/scanItem.css";
import { getItemsLocationLabel, getItemsStatusLabel } from "../../utils/getLabels";

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

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  const navigate = useNavigate();

  return (
    <div className="scan-item-container">
      {/* 📷 Parte izquierda */}
      <div className="scan-left">
        <div id="qr-reader" ref={scannerRef} className="scanner-area"></div>

        {!scanning && !cameraError && (
          <button className="btn-scan" onClick={startScan}>
            Escanear
          </button>
        )}

        {cameraError && (
          <div className="camera-error">
            <p>No se encontró una cámara disponible.</p>
            <button className="btn-retry" onClick={retryCamera}>
              Reintentar
            </button>
          </div>
        )}
      </div>

      {/* 📑 Parte derecha */}
      <div className="scan-right">
        {item ? (
          <div className="item-details">
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
            <div className="action-buttons">
              <button className="btn-action">Mover a...</button>
              <button className="btn-action">Cambiar estado</button>
              <button className="btn-action" onClick={() => navigate("/item/" + item.item_id + "/details")}>Ver detalle</button>
            </div>
          </div>
        ) : (
          <p className="no-item">
            Escanee un artículo para ver sus detalles aquí
          </p>
        )}
      </div>
    </div>
  );
};

export default ScanItemView;

