import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import UpdateItemForm from "../../components/items/UpdateItemForm";

const UpdateItemPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <UpdateItemForm />
    </div>
  );
};

export default UpdateItemPage;
