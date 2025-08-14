/**
 * Tabla de visualización de proyectos.
 *
 * Este componente muestra un listado de proyectos en formato tabular.
 * Incluye columnas para:
 * - ID del proyecto.
 * - Nombre.
 * - Fechas de inicio y fin.
 * - Estado general.
 * - Estado de pago.
 * - Estado actual.
 * - Acciones disponibles.
 *
 * Si no existen proyectos para mostrar, se muestra un mensaje indicativo.
 * Cada fila de la tabla se renderiza utilizando el componente `ProjectRow`.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.projects - Lista de proyectos a mostrar.
 * @returns {JSX.Element} Tabla con los proyectos o mensaje de "sin datos".
 */

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

