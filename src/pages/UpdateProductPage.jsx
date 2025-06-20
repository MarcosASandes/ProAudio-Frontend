import React from "react";
import { useParams } from "react-router-dom";
import UpdateProductForm from "../components/UpdateProductForm";

const UpdateProductPage = () => {
  const { productId } = useParams();

  return (
    <div className="container my-4">
      <UpdateProductForm productId={productId} />
    </div>
  );
};

export default UpdateProductPage;
