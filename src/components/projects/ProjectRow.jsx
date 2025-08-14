/*import React from "react";
import { useNavigate } from "react-router-dom";
import { formatearFecha } from "../../utils/formatDate";
import { getProjectStatusLabel, getProjectRunningStatusLabel, getProjectPaymentStatusLabel } from "../../utils/getLabels";

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{project.project_id}</td>
      <td>{project.name}</td>
      <td>{getProjectStatusLabel(project.status)}</td>
      <td>{getProjectPaymentStatusLabel(project.payment_status)}</td>
      <td>{formatearFecha(project.start_date)} / {formatearFecha(project.end_date)}</td>
      <td>{getProjectRunningStatusLabel(project.running_status)}</td>
      <td>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate(`/project/${project.project_id}`)}
        >
          Ver
        </button>
      </td>
    </tr>
  );
};

export default ProjectRow;*/

/*------------------------------------------------------- */

/*import React from "react";
import { useNavigate } from "react-router-dom";
import { formatearFecha } from "../../utils/formatDate";
import {
  getProjectStatusLabel,
  getProjectRunningStatusLabel,
  getProjectPaymentStatusLabel,
} from "../../utils/getLabels";
import { SquareArrowRight } from "lucide-react";
import styles from "../../styles/projects/projectTable.module.css";
import { getRunningStatusClass } from "../../utils/getLabels";

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();

  return (
    <tr className={styles.row}>
      <td title={project.project_id}>{project.project_id}</td>
      <td title={project.name}>{project.name}</td>
      <td title={getProjectStatusLabel(project.status)}>
        {getProjectStatusLabel(project.status)}
      </td>
      <td title={getProjectPaymentStatusLabel(project.payment_status)}>
        {getProjectPaymentStatusLabel(project.payment_status)}
      </td>
      <td
        title={`${formatearFecha(project.start_date)} / ${formatearFecha(
          project.end_date
        )}`}
      >
        {formatearFecha(project.start_date)} / {formatearFecha(project.end_date)}
      </td>
      <td title={getProjectRunningStatusLabel(project.running_status)}>
        {getProjectRunningStatusLabel(project.running_status)}
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

export default ProjectRow;*/

/*------------------------------------------- */

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
    <tr className={styles.row}>
      <td title={project.project_id}>{project.project_id}</td>
      <td title={project.name}>{project.name}</td>
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
          {getProjectPaymentStatusLabel(project.payment_status)} $
        </span>
      </td>
      <td
        title={`${formatearFecha(project.start_date)} / ${formatearFecha(
          project.end_date
        )}`}
      >
        {formatearFecha(project.start_date)} /{" "}
        {formatearFecha(project.end_date)}
      </td>
      <td title={getProjectRunningStatusLabel(project.running_status)}>
        <span
          className={`${styles.badge} ${
            styles[getProjectRunningStatusClass(project.running_status)]
          }`}
        >
          {getProjectRunningStatusLabel(project.running_status)}
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
