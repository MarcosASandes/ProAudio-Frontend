//Versión completamente funcional pero sin el botón de descarga.

/*import React from "react";
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
import { ArrowLeft } from "lucide-react";

const ItemsCreatedView = () => {
  const items = useSelector(selectCreatedItems);
  const loading = useSelector(selectItemsLoading);
  const navigate = useNavigate();
  const productIdSelected = items.items[0]?.product_id;
  useGetProductById(productIdSelected);
  const product = useSelector(selectSelectedProduct);

  const handleDownload = async (item) => {
    const canvas = await generateEsterilizedQR(
      item.qr_image,
      logo,
      item.item_id,
      product?.model
    );
    downloadCanvasAsImage(canvas, `item-${item.item_id}-qr.png`);
  };

  if (loading) return <p className="text-light">Cargando...</p>;

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

      {product?.model ? (
        <h2 className="text-light">Artículos creados para <span>{product.model}</span></h2>
      ) : (
        <h2 className="text-light">Artículos creados</h2>
      )}

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
            {items.items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>
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

export default ItemsCreatedView;*/

/*------------------------- */

import React from "react";
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

const ItemsCreatedView = () => {
  const items = useSelector(selectCreatedItems);
  const loading = useSelector(selectItemsLoading);
  const navigate = useNavigate();
  console.log(items);
  const productIdSelected = items.items?.[0]?.product_id;
  useGetProductById(productIdSelected);
  const product = useSelector(selectSelectedProduct);

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

    for (const item of items.items) {
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

  // ⚠️ NUEVA VALIDACIÓN: si no hay items creados
  if (!items.items || items.items.length === 0) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-light"
        style={{ height: "80vh" }} // ajusta según tu layout
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
            {items.items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>
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
