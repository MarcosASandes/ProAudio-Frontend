import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCreatedItems,
  selectItemsLoading,
} from "../../features/items/ItemSelector";
import {
  generateEsterilizedQR,
  downloadCanvasAsImage,
} from "../../utils/qrUtils";
import logo from "../../assets/proaudio-logo-1.png";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import { useLocation } from "react-router-dom";
import { getItemsLocationLabel, getItemsStatusLabel } from "../../utils/getLabels";

const ItemsCreatedView = () => {
  const reduxItems = useSelector(selectCreatedItems);
  const loading = useSelector(selectItemsLoading);
  const navigate = useNavigate();
  const [localItems, setLocalItems] = useState([]);

  // Usamos items desde Redux o desde localStorage si Redux está vacío
  const itemsToShow =
    reduxItems.items?.length > 0
      ? reduxItems.items
      : localItems.length > 0
      ? localItems
      : [];

  const productIdSelected = itemsToShow[0]?.product_id;
  useGetProductById(productIdSelected);
  const product = useSelector(selectSelectedProduct);

  const location = useLocation();

  useEffect(() => {
    // Guardar los items en localStorage
    if (reduxItems?.items?.length > 0) {
      localStorage.setItem("createdItems", JSON.stringify(reduxItems.items));
    }

    // Borrar cuando cambia la ruta (no recarga, solo navegación)
    return () => {
      const nextPath = window.location.pathname;
      const currentPath = location.pathname;

      // Si el usuario se va a otra ruta (no recarga)
      if (nextPath !== currentPath) {
        localStorage.removeItem("createdItems");
      }
    };
  }, [reduxItems, location]);

  // Leer del localStorage si no hay items en Redux
  useEffect(() => {
    if (!reduxItems?.items?.length) {
      const saved = localStorage.getItem("createdItems");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocalItems(parsed);
        } catch (error) {
          console.error("Error al leer items del localStorage:", error);
        }
      }
    }
  }, []);

  const handleDownload = async (item) => {
    const canvas = await generateEsterilizedQR(
      item.qr_image,
      logo,
      item.item_id,
      product?.model
    );
    downloadCanvasAsImage(canvas, `item-${item.item_id}-qr.png`);
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
      zip.file(`item-${item.item_id}-qr.png`, base64, { base64: true });
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `qr_codes_${product?.model || "items"}.zip`);
  };

  if (loading) return <p className="text-light">Cargando...</p>;

  if (!itemsToShow || itemsToShow.length === 0) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-light"
        style={{ height: "80vh" }}
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
  }

  return (
    <div className="container my-4">
      <button
        type="button"
        className="btn-back-arrow mb-3"
        onClick={() => navigate(`/product/${productIdSelected}`)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>

      <div className="d-flex justify-content-between align-items-center mb-3">
        {product?.model ? (
          <h2 className="text-light m-0">
            Artículos creados para <span>{product.model}</span>
          </h2>
        ) : (
          <h2 className="text-light m-0">Artículos creados</h2>
        )}

        <button
          type="button"
          className="btn btn-purple d-flex align-items-center"
          onClick={handleDownloadAll}
        >
          <Download className="me-2" size={20} />
          Descargar todo (ZIP)
        </button>
      </div>

      <div className="table-responsive bg-dark bg-opacity-50 rounded p-3">
        <table className="table table-dark table-hover table-bordered align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Fecha Compra</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {itemsToShow?.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{getItemsLocationLabel(item.location)}</td>
                <td>{getItemsStatusLabel(item.status)}</td>
                <td>{item.description}</td>
                <td>${item.price_bought}</td>
                <td>{item.bought_at}</td>
                <td>
                  <button
                    className="btn btn-purple btn-sm"
                    onClick={() => handleDownload(item)}
                  >
                    Descargar QR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsCreatedView;
