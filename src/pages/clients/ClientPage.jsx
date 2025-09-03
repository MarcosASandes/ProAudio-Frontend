import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ClientView from "../../components/clients/ClientView";

const ClientPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ClientView />
    </div>
  );
};

export default ClientPage;