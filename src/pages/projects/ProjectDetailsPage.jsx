import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ProjectDetails from "../../components/projects/ProjectDetails";

const ProjectDetailsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ProjectDetails />
    </div>
  );
};

export default ProjectDetailsPage;


