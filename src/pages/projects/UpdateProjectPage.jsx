import React from "react";
import UpdateProjectForm from "../../components/projects/UpdateProjectForm";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";

const UpdateProjectPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <UpdateProjectForm />
    </div>
  );
};

export default UpdateProjectPage;
