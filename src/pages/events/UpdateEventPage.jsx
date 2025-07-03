import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateEventForm from "../../components/events/UpdateEventForm";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";

const UpdateEventPage = () => {
  return (
    <div
      className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}
    >
      <UpdateEventForm />
    </div>
  );
};

export default UpdateEventPage;
