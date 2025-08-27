/**
 * Fila de la tabla de proyectos.
 *
 * Este componente representa una sola fila dentro de la tabla de proyectos (`ProjectTable`).
 * Muestra la información principal de un proyecto incluyendo:
 * - ID.
 * - Nombre.
 * - Fechas de inicio y fin.
 * - Estado general.
 * - Estado de pago.
 * - Estado actual de ejecución.
 *
 * Cada estado se representa con una etiqueta visual (badge) y su color correspondiente.
 * Incluye un botón de acción que redirige a la vista de detalle del proyecto.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.project - Objeto con la información del proyecto.
 * @returns {JSX.Element} Fila de tabla con los datos del proyecto y su acción asociada.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { formatearFecha } from "../../utils/formatDate";
import {
  getProjectStatusLabel,
  getProjectRunningStatusLabel,
  getProjectPaymentStatusLabel,
} from "../../utils/getLabels";
import { SquareArrowRight } from "lucide-react";
import styles from "../../styles/projects/projectTable.module.css";
import {
  getProjectRunningStatusClass,
  getProjectGeneralStatusClass,
  getProjectPaymentStatusClass,
} from "../../utils/getLabels";

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();

  return (
    <tr className={`${styles.row} ${styles[project?.running_status?.toLowerCase()] || ""}`}>
      <td title={project.project_id}>{project.project_id}</td>
      <td title={project.name}>{project.name}</td>
      <td
        title={`${formatearFecha(project.start_date)} / ${formatearFecha(
          project.end_date
        )}`}
      >
        {formatearFecha(project.start_date)} /{" "}
        {formatearFecha(project.end_date)}
      </td>
      <td title={getProjectStatusLabel(project.status)}>
        <span
          className={`${styles.badge} ${
            styles[getProjectGeneralStatusClass(project.status)]
          }`}
        >
          {getProjectStatusLabel(project.status)}
        </span>
      </td>
      <td title={getProjectPaymentStatusLabel(project.payment_status)}>
        <span
          className={`${styles.badge} ${
            styles[getProjectPaymentStatusClass(project.payment_status)]
          }`}
        >
          {getProjectPaymentStatusLabel(project.payment_status)}
        </span>
      </td>
      <td className={styles.actions}>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Ver detalle de ${project.name}`}
          title={`Ver detalle de ${project.name}`}
          onClick={() => navigate(`/project/${project.project_id}`)}
        >
          <SquareArrowRight size={22} />
        </button>
      </td>
    </tr>
  );
};

export default ProjectRow;
