import React from "react";
import ProjectRow from "./ProjectRow";
import styles from "../../styles/projects/projectTable.module.css";

const ProjectsTable = ({ projects, searchTerm }) => {
  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(term) ||
      project.event_name.toLowerCase().includes(term) ||
      project.client_name?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="table-responsive">
      <table className={`table table-striped table-hover ${styles.customTable}`}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado general</th>
            <th>Estado de pago</th>
            <th>Fechas | Inicio / Fin</th>
            <th>Estado actual</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
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

export default ProjectsTable;
