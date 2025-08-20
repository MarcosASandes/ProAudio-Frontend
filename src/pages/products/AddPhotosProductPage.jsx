/*import React from "react";
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

export default AddPhotosProductPage;*/


/*---------------------------------------------- */


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
