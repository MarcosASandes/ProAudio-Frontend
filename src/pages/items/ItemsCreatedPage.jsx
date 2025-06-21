//Funciona correctamente pero se prefiere separar en componentes.

/*import React from "react";
import { useSelector } from "react-redux";
import {
  selectCreatedItems,
  selectItemsLoading,
} from "../../features/items/ItemSelector";
import { generateEsterilizedQR, downloadCanvasAsImage } from "../../utils/qrUtils";
import logo from "../../assets/proaudio-logo-1.png"; // tu logo de la empresa
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";

const ItemsCreatedPage = () => {
  const items = useSelector(selectCreatedItems);
  const loading = useSelector(selectItemsLoading);
  const productIdSelected = items.items[0]?.product_id;
  useGetProductById(productIdSelected);
  const product = useSelector(selectSelectedProduct);

  const handleDownload = async (item) => {
    console.log(product);
    const canvas = await generateEsterilizedQR(item.qr_image, logo, item.item_id, product.model);
    downloadCanvasAsImage(canvas, `item-${item.id}-qr.png`);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>Artículos creados</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Fecha Compra</th>
            <th>QR</th>
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
              <td>{item.price_bought}</td>
              <td>{item.bought_at}</td>
              <td>
                <img src={item.qrBase64} alt="QR" width={80} />
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleDownload(item)}
                >
                  Descargar QR esterilizado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsCreatedPage;*/

/*------------------------- */

import React from "react";
import ItemsCreatedView from "../../components/items/ItemsCreatedView";

const ItemsCreatedPage = () => {
  return (
    <div className="create-items-main-section">
      <ItemsCreatedView />
    </div>
  );
};

export default ItemsCreatedPage;