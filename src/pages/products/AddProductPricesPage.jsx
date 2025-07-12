import React from "react";
import { useParams } from "react-router-dom";
import AddProductPricesForm from "../../components/products/AddProductPricesForm";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";
import "../../styles/productPrices.css";
import styles from "../../styles/products/sectionContainer.module.css";

const AddProductPricesPage = () => {
  const { id } = useParams();

  useGetProductDetails(id);

  return (
    <div className={styles.sectionContainer}>
      <div className="container mt-4">
        <AddProductPricesForm productId={id} />
      </div>
    </div>
  );
};

export default AddProductPricesPage;
