/*import React, { useRef } from "react";
import useItemScanner from "../../hooks/items/useItemScanner";
import { useSelector } from "react-redux";
import { selectSelectedItem } from "../../features/items/ItemSelector";
import "../../styles/scanItem.css";

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

  return (
    <div className="scan-item-container">
      <div className="scan-left">
        <div ref={scannerRef} id="qr-reader" className="scanner-area">
          {!scanning && !cameraError && (
            <button className="btn-scan" onClick={startScan}>
              Escanear
            </button>
          )}

          {cameraError ? (
            <div className="text-center text-danger">
              <p>No se encontró una cámara disponible.</p>
              <button className="btn btn-purple mt-2" onClick={retryCamera}>
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <div
                ref={scannerRef}
                id="qr-reader"
                style={{ width: "100%", height: "100%" }}
              ></div>
              {!scanning && (
                <button className="btn btn-purple mt-3" onClick={startScan}>
                  Escanear
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="scan-right">
        {item ? (
          <div className="item-details">
            <h3>Artículo con ID {item.item_id}</h3>
            <p>
              <strong>Ubicación:</strong> {item.location}
            </p>
            <p>
              <strong>Estado:</strong> {item.status}
            </p>
            <p>
              <strong>Descripción:</strong> {item.description}
            </p>
            <div className="action-buttons">
              <button className="btn-action">Mover a...</button>
              <button className="btn-action">Cambiar estado</button>
              <button className="btn-action">Ver detalle</button>
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

export default ScanItemView;*/

/*------------------------------ */

import React, { useEffect } from "react";
import useItemScanner from "../../hooks/items/useItemScanner";
import { useSelector } from "react-redux";
import { selectSelectedItem } from "../../features/items/ItemSelector";
import "../../styles/scanItem.css";

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

  // Limpieza segura cuando se desmonta la página
  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

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
              <strong>Ubicación:</strong> {item.location}
            </p>
            <p>
              <strong>Estado:</strong> {item.status}
            </p>
            <p>
              <strong>Descripción:</strong> {item.description}
            </p>
            <div className="action-buttons">
              <button className="btn-action">Mover a...</button>
              <button className="btn-action">Cambiar estado</button>
              <button className="btn-action">Ver detalle</button>
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

/*<div className="scan-item-container">
      
      <div className="scan-left">
        <div
          ref={scannerRef}
          id="qr-reader"
          className="scanner-area"
          style={{ width: "100%", height: "100%" }}
        >
          
        </div>

       
        {!scanning && !cameraError && (
          <button className="btn btn-purple mt-3" onClick={startScan}>
            Escanear
          </button>
        )}

        {cameraError && (
          <div className="text-center text-danger mt-3">
            <p>No se encontró una cámara disponible.</p>
            <button className="btn btn-purple mt-2" onClick={retryCamera}>
              Reintentar
            </button>
          </div>
        )}
      </div>

      
      <div className="scan-right">
        {item ? (
          <div className="item-details">
            <h3>Artículo con ID {item.item_id}</h3>
            <p>
              <strong>Ubicación:</strong> {item.location}
            </p>
            <p>
              <strong>Estado:</strong> {item.status}
            </p>
            <p>
              <strong>Descripción:</strong> {item.description}
            </p>
            <div className="action-buttons">
              <button className="btn-action">Mover a...</button>
              <button className="btn-action">Cambiar estado</button>
              <button className="btn-action">Ver detalle</button>
            </div>
          </div>
        ) : (
          <p className="no-item">
            Escanee un artículo para ver sus detalles aquí
          </p>
        )}
      </div>
    </div>*/
