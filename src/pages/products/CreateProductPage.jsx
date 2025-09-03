import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateProductForm from "../../components/products/CreateProductForm";

const CreateProductFormPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateProductForm />
    </div>
  );
};

export default CreateProductFormPage;