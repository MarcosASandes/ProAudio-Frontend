/*import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductDetails from '../../components/products/ProductDetails';
import useGetProductDetails from '../../hooks/products/useGetProductDetails';
import { selectSelectedProductDetails } from '../../features/products/ProductSelector';
import styles from "../../styles/products/productPage.module.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);

  console.log(id);
  console.log(product);


  if (!product) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className={styles.productPage}>
      <ProductDetails id={id} product={product} />
    </div>
  )
};

export default ProductDetailsPage;*/



/*-------------------------------- */


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
