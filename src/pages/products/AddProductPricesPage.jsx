import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import AddProductPricesForm from "../../components/products/AddProductPricesForm";

const AddProductPricesPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <AddProductPricesForm />
    </div>
  );
};

export default AddProductPricesPage;
