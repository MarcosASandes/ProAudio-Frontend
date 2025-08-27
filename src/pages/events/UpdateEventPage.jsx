import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import UpdateEventForm from "../../components/events/UpdateEventForm";

const UpdateEventPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <UpdateEventForm />
    </div>
  );
};

export default UpdateEventPage;