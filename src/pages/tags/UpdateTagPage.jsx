import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import UpdateTagForm from "../../components/tags/UpdateTagForm";

const UpdateTagPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <UpdateTagForm />
    </div>
  );
};

export default UpdateTagPage
