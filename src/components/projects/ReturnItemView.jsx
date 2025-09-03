import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/projects/returnItemView.module.css";
import {
  selectOutletItems,
  selectReturnItems,
  selectSelectedProject,
} from "../../features/projects/ProjectSelector";
import useGetOutletItemsByProjectId from "../../hooks/projects/useGetOutletItemsByProjectId";
import useScanReturnItem from "../../hooks/projects/useScanReturnItem";
import useGetProjectById from "../../hooks/projects/useGetProjectById";
import BackButton from "../global/BackButton";
import { Info } from "lucide-react";

const ReturnItemView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProjectById } = useGetProjectById();
  const projectStore = useSelector(selectSelectedProject);
  const { fetchAllOutletItemsInProject } = useGetOutletItemsByProjectId();

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
    if (id) {
      fetchProjectById(id);
    }
  }, [id, fetchProjectById]);

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  useEffect(() => {
    fetchAllOutletItemsInProject(id);
  }, [fetchAllOutletItemsInProject, id]);

  return (
    <div className={styles.container}>
      <BackButton target={"/project/" + id} />

      <h2 className={styles.title}>
        <span>Devolución de artículos para el proyecto: {projectStore?.name}</span>
        <span className={styles.infoIconWrap} aria-hidden="true">
          <Info size={20} />
          <div className={styles.tooltip}>
            Escanea los artículos para registrarlos como devueltos en el depósito.
          </div>
        </span>
      </h2>

      <div className={styles.content}>
        {/* LEFT - SCANNER */}
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

        {/* RIGHT - LISTS */}
        <div className={styles.right}>
          <div className={styles.listWrapper}>
            <div className={styles.section}>
              <h3>Artículos pendientes</h3>
              {outletItems.length > 0 ? (
                <ul className={styles.list}>
                  {outletItems?.map((item) => (
                    <li key={item.item_id}>
                      <strong>ID:</strong> {item.item_id} —{" "}
                      <strong>Serie:</strong> {item.item_serial_number} —{" "}
                      <strong>Rango:</strong> {item.item_range}
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
                  {returnedItems?.map((item) => (
                    <li key={item.item_id}>
                      <strong>ID:</strong> {item.item_id} —{" "}
                      <strong>Serie:</strong> {item.item_serial_number} —{" "}
                      <strong>Rango:</strong> {item.item_range}
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
        </div>
      </div>
    </div>
  );
};

export default ReturnItemView;
