import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ProjectView from "../../components/projects/ProjectView";

const ProjectPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ProjectView />
    </div>
  );
};

export default ProjectPage;