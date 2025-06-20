/*import React from "react";
import { useParams } from "react-router-dom";
import AddProductPricesForm from "../components/AddProductPricesForm";
import "../styles/productPrices.css";


const AddProductPricesPage = () => {
  // 👉 Obtener el ID del producto desde la URL
  const { id } = useParams();

  return (
    <div className="create-product-prices">
      <div className="container mt-4">
        <h2 className="text-light mb-4">Agregar precios al Producto</h2>
        <AddProductPricesForm productId={id} />
      </div>
    </div>
  );
};

export default AddProductPricesPage;*/

/*----------------------- */

import React from "react";
import { useParams } from "react-router-dom";
import AddProductPricesForm from "../components/AddProductPricesForm";
import useGetProductDetails from "../hooks/products/useGetProductDetails";
import "../styles/productPrices.css";

const AddProductPricesPage = () => {
  const { id } = useParams();

  // ✅ Carga seguro antes de renderizar el form
  useGetProductDetails(id);

  return (
    <div className="create-product-prices">
      <div className="container mt-4">
        <h2 className="text-light mb-4">Agregar precios al Producto</h2>
        <AddProductPricesForm productId={id} />
      </div>
    </div>
  );
};

export default AddProductPricesPage;
