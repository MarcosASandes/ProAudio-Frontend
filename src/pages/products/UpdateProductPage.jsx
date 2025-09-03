import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import UpdateProductForm from "../../components/products/UpdateProductForm";

const UpdateProductPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <UpdateProductForm />
    </div>
  );
};

export default UpdateProductPage;
