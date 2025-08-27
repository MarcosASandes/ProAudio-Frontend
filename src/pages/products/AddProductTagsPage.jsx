import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import AddProductTagsForm from "../../components/products/AddProductTagsForm";

const AddProductTagsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <AddProductTagsForm />
    </div>
  );
};

export default AddProductTagsPage;
