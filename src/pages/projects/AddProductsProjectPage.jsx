import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import AddProductsProjectForm from '../../components/projects/AddProductsProjectForm';

const AddProductsProjectPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <AddProductsProjectForm />
    </div>
  );
};

export default AddProductsProjectPage;