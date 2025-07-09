import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProjectFilter from "./ProjectFilter";
import ProjectsTable from "./ProjectsTable";
import Pagination from "../global/Pagination";
import useGetAllProjects from "../../hooks/projects/useGetAllProjects";
import {
  selectProjects,
  selectProjectPageable,
  selectProjectsLoading,
  selectProjectsError,
} from "../../features/projects/ProjectSelector";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/projects/projectView.module.css";

const ProjectView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  useGetAllProjects(currentPage, pageSize); // Simple paginado por ahora

  const projects = useSelector(selectProjects);
  const pageable = useSelector(selectProjectPageable);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);

  const handleGoToCreate = () => {
    navigate("/project/create");
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Proyectos</h1>
        <button className={`btn ${styles.btnPurple}`} onClick={handleGoToCreate}>
          Crear proyecto
        </button>
      </div>

      <ProjectFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading && <p>Cargando proyectos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ProjectsTable projects={projects} searchTerm={searchTerm} />
      )}

      <Pagination pageable={pageable} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProjectView;
