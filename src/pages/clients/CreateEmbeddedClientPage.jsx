import React from "react";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";
import CreateEmbeddedClientForm from "../../components/clients/CreateEmbeddedClientForm";



const CreateEmbeddedClientPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <CreateEmbeddedClientForm />
    </div>
  );
};

export default CreateEmbeddedClientPage;
