import React from "react";
import CreateEmbeddedEventForm from "../../components/events/CreateEmbeddedEventForm";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";



const CreateEmbeddedEventPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <CreateEmbeddedEventForm />
    </div>
  );
};

export default CreateEmbeddedEventPage;
