import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import UpdateClientForm from "../../components/clients/UpdateClientForm";

const UpdateClientPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <UpdateClientForm />
    </div>
  );
};

export default UpdateClientPage;
