import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateClientForm from "../../components/clients/CreateClientForm";

const CreateClientPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateClientForm />
    </div>
  );
};

export default CreateClientPage;
