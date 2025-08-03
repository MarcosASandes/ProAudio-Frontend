import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/projects/scanItemView.module.css";
import useScanOutletItem from "../../hooks/projects/useScanOutletItem";
import {
  selectOutletItems,
  selectOutletProducts,
} from "../../features/projects/ProjectSelector";
import useDeleteItemToOutlet from "../../hooks/projects/useDeleteItemToOutlet";
import useGetOutletItemsByProjectId from "../../hooks/projects/useGetOutletItemsByProjectId";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import useGetProductsInProject from "../../hooks/projects/useGetProductsInProject";
import { selectProductsInProject } from "../../features/products/ProductSelector";

const OutletItemView = () => {
  const { id } = useParams();
  const { fetchAllOutletItemsInProject } = useGetOutletItemsByProjectId();
  const { fetchProductProjects } = useGetProductsInProject();
  const navigate = useNavigate();
  const {
    startScan,
    stopScan,
    scanning,
    cameraError,
    retryCamera,
    scannerRef,
  } = useScanOutletItem(id);

  const outletItems = useSelector(selectOutletItems);
  const outletProducts = useSelector(selectProductsInProject);
  const deleteItem = useDeleteItemToOutlet();

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  useEffect(() => {
    fetchAllOutletItemsInProject(id);
    fetchProductProjects(id);
  }, [fetchAllOutletItemsInProject, id]);

  const handleDeleteItem = (idItem) => {
    const idProject = id;
    deleteItem(idProject, idItem);
  };

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
              <h3>Artículos escaneados</h3>
              {outletItems.length > 0 ? (
                <ul className={styles.list}>
                  {outletItems?.map((item) => (
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
              <h3>Productos</h3>
              {outletProducts.length > 0 ? (
                <ul className={styles.list}>
                  {outletProducts?.map((prod) => (
                    <li key={prod.product_id}>
                      <strong>Modelo:</strong> {prod.model} -{" "}
                      <strong>Cantidad necesaria:</strong> {prod.amount} -{" "}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.empty}>No se encontraron productos aún.</p>
              )}
            </div>
          </div>

          {/*ToDo: Cuestionar utilidad y borrar*/}
          <div className={styles.footer}>
            <button className={styles.finishButton}>Terminar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutletItemView;
