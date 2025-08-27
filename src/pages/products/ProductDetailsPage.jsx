import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ProductDetails from '../../components/products/ProductDetails';

const ProductDetailsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ProductDetails />
    </div>
  );
};

export default ProductDetailsPage;
