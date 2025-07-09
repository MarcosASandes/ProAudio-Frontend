import React from 'react';
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";
import ProjectView from '../../components/projects/ProjectView';

export default function ProjectPage() {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <ProjectView />
    </div>
  );
}