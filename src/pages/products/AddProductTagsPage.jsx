import React from "react";
import { useParams } from "react-router-dom";
import AddProductTagsForm from "../../components/products/AddProductTagsForm";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";
import styles from "../../styles/products/sectionContainer.module.css";

const AddProductTagsPage = () => {
  const { id } = useParams();

  useGetProductDetails(id);


  return (
    <div className={styles.sectionContainer}>
      <div className="container mt-4">
        <div className="container py-4">
          <AddProductTagsForm productId={id} />
        </div>
      </div>
    </div>
  );
};

export default AddProductTagsPage;
