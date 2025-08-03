import React from "react";
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

export default ProjectRow;
