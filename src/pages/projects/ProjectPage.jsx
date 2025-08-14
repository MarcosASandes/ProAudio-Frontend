/**
 * Página de proyectos.
 *
 * Este componente sirve como punto de entrada para la ruta asociada a la
 * gestión y visualización de proyectos.  
 * Su única responsabilidad es envolver y renderizar el componente `ProjectView`
 * dentro de un contenedor con estilo de desplazamiento (`scrollableContainer`).
 *
 * @component
 * @returns {JSX.Element} Página que muestra la vista principal de proyectos.
 */

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