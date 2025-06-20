import React from "react";
import { useParams } from "react-router-dom";
import AddProductTagsForm from "../components/AddProductTagsForm";
import useGetProductDetails from "../hooks/products/useGetProductDetails";
import useGetTagsTypes from "../hooks/tags/useGetTagsTypes";

const AddProductTagsPage = () => {
  const { id } = useParams();

  useGetProductDetails(id);


  return (
    <div className="create-product-tags">
      <div className="container mt-4">
        <div className="container py-4">
          <h2>Agregar Etiquetas al Producto</h2>
          <AddProductTagsForm productId={id} />
        </div>
      </div>
    </div>
  );
};

export default AddProductTagsPage;
