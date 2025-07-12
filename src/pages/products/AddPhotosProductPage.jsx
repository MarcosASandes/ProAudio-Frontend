import React from "react";
import { useParams } from "react-router-dom";
import AddPhotoProductForm from "../../components/products/AddPhotoProductForm";

const AddPhotosProductPage = () => {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <AddPhotoProductForm productId={id} />
    </div>
  );
};

export default AddPhotosProductPage;
