/*import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/projects/scanItemView.module.css";
import useDeleteItemToOutlet from "../../hooks/projects/useDeleteItemToOutlet";
import useExitItemProject from "../../hooks/projects/useExitItemProject";
import useItemScanner from "../../hooks/items/useItemScanner";
import { selectOutletItems } from "../../features/projects/ProjectSelector";


const OutletItemView = () => {
  const { id } = useParams();

  const outletItems = useSelector(selectOutletItems);
  const { itemScanned, resetItem } = useItemScanner();
  const { fetchExitItem } = useExitItemProject();
  const handleDeleteItem = useDeleteItemToOutlet();

  useEffect(() => {
    if (itemScanned) {
      fetchExitItem(id, itemScanned.item_id);
      resetItem();
    }
  }, [itemScanned, fetchExitItem, id, resetItem]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Salida de artículos</h2>

      <div className={styles.carritosWrapper}>
       
        <div className={styles.carrito}>
          <h4>Carrito de salida</h4>
          {outletItems.length === 0 ? (
            <p>No hay ítems aún.</p>
          ) : (
            <ul className={styles.itemList}>
              {outletItems.map((item) => (
                <li key={item.item_id} className={styles.itemRow}>
                  <span>{item.name}</span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteItem(projectId, item.item_id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

    
        <div className={styles.carrito}>
          <h4>Otro carrito</h4>
          <p>(Vacío por ahora)</p>
        </div>
      </div>

      <button className={styles.finishButton} onClick={() => window.history.back()}>
        Terminar
      </button>
    </div>
  );
};

export default OutletItemView;*/

/*--------------------------------------- */

/*import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/projects/scanItemView.module.css"; 
import useDeleteItemToOutlet from "../../hooks/projects/useDeleteItemToOutlet";
import useExitItemProject from "../../hooks/projects/useExitItemProject";
import useItemScanner from "../../hooks/items/useItemScanner";
import { selectOutletItems } from "../../features/projects/ProjectSelector";

const OutletItemView = () => {
  const {
    startScan,
    stopScan,
    scanning,
    cameraError,
    retryCamera,
    scannerRef,
  } = useItemScanner();

  const outletItems = useSelector(selectOutletItems);

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  return (
    <div className={styles.container}>
      
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

      
      <div className={styles.right}>
        <div className={styles.listWrapper}>
          <div className={styles.section}>
            <h3>Artículos escaneados</h3>
            {outletItems.length > 0 ? (
              <ul className={styles.list}>
                {outletItems.map((item) => (
                  <li key={item.item_id}>
                    <strong>ID:</strong> {item.item_id} -{" "}
                    <strong>Estado:</strong> {item.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>No se ha escaneado ningún artículo.</p>
            )}
          </div>

          <div className={styles.section}>
            <h3>Productos</h3>
         
            <p className={styles.empty}>Aquí irán los productos asociados.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.finishButton}>Terminar</button>
        </div>
      </div>
    </div>
  );
};

export default OutletItemView;*/

/*---------------------------------------------------------- */

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/projects/scanItemView.module.css";
import useScanOutletItem from "../../hooks/projects/useScanOutletItem";
import { selectOutletItems } from "../../features/projects/ProjectSelector";
import useDeleteItemToOutlet from "../../hooks/projects/useDeleteItemToOutlet";
import useGetOutletItemsByProjectId from "../../hooks/projects/useGetOutletItemsByProjectId";

const OutletItemView = () => {
  const { id } = useParams();
  const { fetchAllOutletItemsInProject } = useGetOutletItemsByProjectId();

  const {
    startScan,
    stopScan,
    scanning,
    cameraError,
    retryCamera,
    scannerRef,
  } = useScanOutletItem(id);

  const outletItems = useSelector(selectOutletItems);
  const deleteItem = useDeleteItemToOutlet();

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  useEffect(() => {
    fetchAllOutletItemsInProject(id);
  }, [fetchAllOutletItemsInProject, id]);

  const handleDeleteItem = (idItem) => {
    const idProject = id;
    deleteItem(idProject, idItem);
  };

  return (
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
                {outletItems.map((item) => (
                  <li key={item.item_id}>
                    <strong>ID:</strong> {item.item_id} -{" "}
                    <strong>Estado:</strong> {item.status} -{" "}
                    <button onClick={() => handleDeleteItem(item.item_id)}>
                      Eliminar
                    </button>
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
            <p className={styles.empty}>Aquí irán los productos asociados.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.finishButton}>Terminar</button>
        </div>
      </div>
    </div>
  );
};

export default OutletItemView;
