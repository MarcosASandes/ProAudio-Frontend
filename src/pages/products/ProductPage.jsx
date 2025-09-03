import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ProductView from "../../components/products/ProductView";

const ProductPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ProductView />
    </div>
  );
};

export default ProductPage;