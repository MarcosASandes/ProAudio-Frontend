import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateEventForm from "../../components/events/CreateEventForm";

const CreateEventPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateEventForm />
    </div>
  );
};

export default CreateEventPage;