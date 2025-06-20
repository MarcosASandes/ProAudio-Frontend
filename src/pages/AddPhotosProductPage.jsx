import React from "react";
import { useParams } from "react-router-dom";
import AddPhotoProductForm from "../components/AddPhotoProductForm";

const AddPhotosProductPage = () => {
  // 👉 Obtener el ID del producto desde la URL
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2 className="text-light mb-4">Agregar Fotos al Producto</h2>
      <AddPhotoProductForm productId={id} />
    </div>
  );
};

export default AddPhotosProductPage;
