/*import React from "react";
import ProjectRow from "./ProjectRow";
import styles from "../../styles/projects/projectTable.module.css";

const ProjectsTable = ({ projects }) => {
  return (
    <div className="table-responsive">
      <table className={`table table-striped table-hover ${styles.customTable}`}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado general</th>
            <th>Estado de pago</th>
            <th>Inicio / Fin</th>
            <th>Estado actual</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {projects.length > 0 ? (
            projects?.map((project) => (
              <ProjectRow key={project.project_id} project={project} />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;*/


/*----------------------------------------- */

import React from "react";
import ProjectRow from "./ProjectRow";
import styles from "../../styles/projects/projectTable.module.css";

const ProjectsTable = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <div className={styles.noData}>No hay proyectos para mostrar.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="Listado de proyectos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Inicio / Fin</th>
              <th>Estado general</th>
              <th>Estado de pago</th>
              <th>Estado actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <ProjectRow key={project.project_id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;

