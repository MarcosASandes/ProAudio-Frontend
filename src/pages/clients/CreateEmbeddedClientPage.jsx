import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateEmbeddedClientForm from "../../components/clients/CreateEmbeddedClientForm";

const CreateEmbeddedClientPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateEmbeddedClientForm />
    </div>
  );
};

export default CreateEmbeddedClientPage;
