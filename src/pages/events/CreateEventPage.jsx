import React from "react";
import CreateEventForm from "../../components/events/CreateEventForm";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";

const CreateEventPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <CreateEventForm />
    </div>
  );
};

export default CreateEventPage;
