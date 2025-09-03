import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import AddPhotoProductForm from "../../components/products/AddPhotoProductForm";

const AddPhotosProductPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <AddPhotoProductForm />
    </div>
  );
};

export default AddPhotosProductPage;
