import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ClientDetails from "../../components/clients/ClientDetails";

const ClientDetailsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ClientDetails />
    </div>
  );
};

export default ClientDetailsPage;
