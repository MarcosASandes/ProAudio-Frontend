import React from "react";
import CreateProjectForm from "../../components/projects/CreateProjectForm";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";

const CreateProjectPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <CreateProjectForm />
    </div>
  );
};

export default CreateProjectPage;
