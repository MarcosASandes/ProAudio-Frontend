import React from "react";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";
import ProjectDetails from "../../components/projects/ProjectDetails";

const ProjectDetailsPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <ProjectDetails />
    </div>
  );
};

export default ProjectDetailsPage;


