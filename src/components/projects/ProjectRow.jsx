import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{project.project_id}</td>
      <td>{project.name}</td>
      <td>{project.status}</td>
      <td>{project.payment_status}</td>
      <td>{project.start_date} / {project.end_date}</td>
      <td>{project.running_status}</td>
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
