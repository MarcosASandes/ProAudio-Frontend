import React from "react";
import { useNavigate } from "react-router-dom";
import { getStatusLabel } from "../../utils/startingProjectStatusLabel";
import { getRunningStatusLabel } from "../../utils/startingProjectStatusLabel";
import { formatearFecha } from "../../utils/formatDate";

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{project.project_id}</td>
      <td>{project.name}</td>
      <td>{getStatusLabel(project.status)}</td>
      <td>{getStatusLabel(project.payment_status)}</td>
      <td>{formatearFecha(project.start_date)} / {formatearFecha(project.end_date)}</td>
      <td>{getRunningStatusLabel(project.running_status)}</td>
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
