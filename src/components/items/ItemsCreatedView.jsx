import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import {
  selectCreatedItems,
  selectItemsLoading,
} from "../../features/items/ItemSelector";
import {
  generateEsterilizedQR,
  downloadCanvasAsImage,
} from "../../utils/qrUtils";
import ItemsCreatedTable from "./ItemsCreatedTable";
import styles from "../../styles/items/itemsCreatedView.module.css";
import logo from "../../assets/proaudio-logo-1.png";
import BackButton from "../global/BackButton";
import { cleanSerial } from "../../utils/formatSerialNumber";

const ItemsCreatedView = () => {
  const reduxItems = useSelector(selectCreatedItems);
  const loading = useSelector(selectItemsLoading);
  const navigate = useNavigate();
  const [localItems, setLocalItems] = useState([]);

  const itemsToShow =
    reduxItems.items?.length > 0
      ? reduxItems.items
      : localItems.length > 0
      ? localItems
      : [];

  const productIdSelected = itemsToShow[0]?.product_id;
  useGetProductById(productIdSelected);
  const product = useSelector(selectSelectedProduct);

  useEffect(() => {
    if (reduxItems?.items?.length > 0) {
      localStorage.setItem("createdItems", JSON.stringify(reduxItems.items));
    }
    return () => localStorage.removeItem("createdItems");
  }, [reduxItems]);

  useEffect(() => {
    if (!reduxItems?.items?.length) {
      const saved = localStorage.getItem("createdItems");
      if (saved) setLocalItems(JSON.parse(saved));
    }
  }, [reduxItems]);

  const handleDownload = async (item) => {
    const canvas = await generateEsterilizedQR(
      item.qr_image,
      logo,
      item.item_id,
      product?.model
    );
    //downloadCanvasAsImage(canvas, `item-${item.item_id}-qr.png`);
    const maxLen = 100;
    const serialCleaned = cleanSerial(item.serial_number);
    let fileNameConst = `item-${item.item_id}-serial-${serialCleaned}-qr.png`;
    if (fileNameConst.length > maxLen) {
      fileNameConst = fileNameConst.slice(0, maxLen - 4) + ".png";
    }
    downloadCanvasAsImage(canvas, fileNameConst);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    for (const item of itemsToShow) {
      const canvas = await generateEsterilizedQR(
        item.qr_image,
        logo,
        item.item_id,
        product?.model
      );
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];
      const maxLen = 100;
      const serialCleaned = cleanSerial(item.serial_number);
      let fileNameConst = `item-${item.item_id}-serial-${serialCleaned}-qr.png`;
      if (fileNameConst.length > maxLen) {
        fileNameConst = fileNameConst.slice(0, maxLen - 4) + ".png";
      }
      zip.file(fileNameConst, base64, { base64: true });
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `qr_codes_${product?.model || "items"}.zip`);
  };

  if (loading) return <p className="text-light">Cargando...</p>;

  if (!itemsToShow.length)
    return (
      <div
        className={`d-flex flex-column justify-content-center align-items-center text-light ${styles.noItemsContainer}`}
      >
        <h3 className="mb-4 text-center">
          Los items están creados pero no se pudo mostrar la página
        </h3>
        <button
          className="btn btn-purple"
          onClick={() => navigate("/products")}
        >
          Ir al inicio de Productos
        </button>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton target={`/product/${productIdSelected}`} />

        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Artículos creados</h2>
          <button
            className={`btn btn-purple d-flex align-items-center ${styles.downloadAll}`}
            onClick={handleDownloadAll}
          >
            <Download className="me-2" size={20} />
            Descargar todo (ZIP)
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <ItemsCreatedTable items={itemsToShow} onDownload={handleDownload} />
      </div>
    </div>
  );
};

export default ItemsCreatedView;
