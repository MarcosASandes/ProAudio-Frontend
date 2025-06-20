import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetProductById from '../hooks/products/useGetProductById';
import { useSelector } from 'react-redux';
import { selectSelectedProduct } from '../features/products/ProductSelector';
import ProductDetails from '../components/ProductDetails';
import useGetProductDetails from '../hooks/products/useGetProductDetails';
import { selectSelectedProductDetails } from '../features/products/ProductSelector';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const getProduct = (idProd) => useGetProductById(idProd);
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);

  console.log(id);
  console.log(product);


  if (!product) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="product-page">
      <ProductDetails id={id} product={product} />
    </div>
  )
};

export default ProductDetailsPage;

/*--------------------- */

/*import React from 'react';
import { useParams } from 'react-router-dom';
import useGetProductDetails from '../hooks/products/useGetProductDetails';
import { useSelector } from 'react-redux';
import { selectSelectedProductDetails } from '../features/products/ProductSelector';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsPage = () => {
  const { id } = useParams();

  // ✅ Llamar hook para asegurar que el producto se trae y se guarda:
  useGetProductDetails(id);

  // ✅ Seleccionar de la store:
  const product = useSelector(selectSelectedProductDetails);

  // ✅ Mostrar loading controlado:
  if (!product) {
    return <p className="text-center mt-5">Cargando producto...</p>;
  }

  // ✅ El hijo ya NO necesita recibir `product` como prop, usa el selector interno.
  return (
    <div className="product-page">
      <ProductDetails id={id} />
    </div>
  );
};

export default ProductDetailsPage;*/
