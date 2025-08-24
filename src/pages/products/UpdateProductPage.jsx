/*import React from "react";
import { useParams } from "react-router-dom";
import UpdateProductForm from "../../components/products/UpdateProductForm";

const UpdateProductPage = () => {
  const { productId } = useParams();

  return (
    <div className="container my-4">
      <UpdateProductForm productId={productId} />
    </div>
  );
};

export default UpdateProductPage;*/


/*-------------------------------------------- */


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
