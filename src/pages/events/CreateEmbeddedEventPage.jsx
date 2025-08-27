import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateEmbeddedEventForm from "../../components/events/CreateEmbeddedEventForm";

const CreateEmbeddedEventPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateEmbeddedEventForm />
    </div>
  );
};

export default CreateEmbeddedEventPage;