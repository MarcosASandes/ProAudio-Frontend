import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/projects/scanItemView.module.css";
import {
  selectOutletItems,
  selectOutletProducts,
} from "../../features/projects/ProjectSelector";
import useDeleteItemToOutlet from "../../hooks/projects/useDeleteItemToOutlet";
import useGetOutletItemsByProjectId from "../../hooks/projects/useGetOutletItemsByProjectId";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import useScanReturnItem from "../../hooks/projects/useScanReturnItem";
import { selectReturnItems } from "../../features/projects/ProjectSelector";

const ReturnItemView = () => {
  const { id } = useParams();
  const { fetchAllOutletItemsInProject } = useGetOutletItemsByProjectId();
  const navigate = useNavigate();
  const {
    startScan,
    stopScan,
    scanning,
    cameraError,
    retryCamera,
    scannerRef,
  } = useScanReturnItem(id);

  const outletItems = useSelector(selectOutletItems);
  const returnedItems = useSelector(selectReturnItems);

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  useEffect(() => {
    fetchAllOutletItemsInProject(id);
  }, [fetchAllOutletItemsInProject, id]);

  return (
    <>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButtom.btnBackArrow}
          onClick={() => navigate("/project/" + id)}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>
      <div className={styles.container}>
        {/* 📷 Parte izquierda: escáner */}
        <div className={styles.left}>
          <div id="qr-reader" ref={scannerRef} className={styles.scanner}></div>

          {!scanning && !cameraError && (
            <button className={styles.scanButton} onClick={startScan}>
              Escanear
            </button>
          )}

          {cameraError && (
            <div className={styles.error}>
              <p>No se encontró una cámara disponible.</p>
              <button className={styles.retryButton} onClick={retryCamera}>
                Reintentar
              </button>
            </div>
          )}
        </div>

        {/* 📦 Parte derecha: listados */}
        <div className={styles.right}>
          <div className={styles.listWrapper}>
            <div className={styles.section}>
              <h3>Artículos pendientes</h3>
              {outletItems.length > 0 ? (
                <ul className={styles.list}>
                  {outletItems.map((item) => (
                    <li key={item.item_id}>
                      <strong>ID:</strong> {item.item_id} -{" "}
                      <strong>Numero de serie:</strong>{" "}
                      {item.item_serial_number} -{" "}
                      <strong>Rango de frecuencia:</strong> {item.item_range} -{" "}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.empty}>
                  No se ha escaneado ningún artículo.
                </p>
              )}
            </div>

            <div className={styles.section}>
              <h3>Artículos devueltos</h3>
              {returnedItems.length > 0 ? (
                <ul className={styles.list}>
                  {returnedItems.map((item) => (
                    <li key={item.item_id}>
                      <strong>ID:</strong> {item.item_id} -{" "}
                      <strong>Numero de serie:</strong>{" "}
                      {item.item_serial_number} -{" "}
                      <strong>Rango de frecuencia:</strong> {item.item_range} -{" "}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.empty}>
                  No se ha devuelto ningún artículo.
                </p>
              )}
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.finishButton}>Terminar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnItemView;
