import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateItemsForm from "../../components/items/CreateItemsForm";

const CreateItemsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateItemsForm />
    </div>
  );
};

export default CreateItemsPage;

