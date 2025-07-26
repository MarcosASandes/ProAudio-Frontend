/*import React, { useState, useMemo } from "react";
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
import ProjectPagination from "./ProjectPagination";

const ProjectView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtros hardcodeados por ahora (más adelante van selects)
  const sortBy = "start_date";
  const direction = "asc";
  const filterStatus = useMemo(() => [], []);
  const filterPaymentStatus = useMemo(() => "", []);

  const navigate = useNavigate();

  useGetAllProjects(
    currentPage,
    pageSize,
    sortBy,
    direction,
    filterStatus,
    filterPaymentStatus,
    searchTerm // el backend filtra por nombre
  );

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
        <button
          className={`btn ${styles.btnPurple}`}
          onClick={handleGoToCreate}
        >
          Crear proyecto
        </button>
      </div>

      <ProjectFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {loading && <p>Cargando proyectos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && <ProjectsTable projects={projects} />}

      <ProjectPagination pageable={pageable} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProjectView;*/

/*----------------------------------------- */

import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectFilter from "./ProjectFilter";
import ProjectsTable from "./ProjectsTable";
import useGetAllProjects from "../../hooks/projects/useGetAllProjects";
import {
  selectProjects,
  selectProjectPageable,
  selectProjectsLoading,
  selectProjectsError,
} from "../../features/projects/ProjectSelector";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/projects/projectView.module.css";
import ProjectPagination from "./ProjectPagination";

const ProjectView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;


  const [sortBy, setSortBy] = useState("start_date");
  const [direction, setDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState([]); // checklist
  const [filterPaymentStatus, setFilterPaymentStatus] = useState(""); // uno solo

  const navigate = useNavigate();

  useGetAllProjects(
    currentPage,
    pageSize,
    sortBy,
    direction,
    filterStatus,
    filterPaymentStatus,
    searchTerm
  );

  const projects = useSelector(selectProjects);
  const pageable = useSelector(selectProjectPageable);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);

  const handleGoToCreate = () => {
    navigate("/project/create");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, direction, filterStatus, filterPaymentStatus]);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Proyectos</h1>
        <button
          className={`btn ${styles.btnPurple}`}
          onClick={handleGoToCreate}
        >
          Crear proyecto
        </button>
      </div>

      <ProjectFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterPaymentStatus={filterPaymentStatus}
        onFilterPaymentStatusChange={setFilterPaymentStatus}
      />

      {loading && <p>Cargando proyectos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && <ProjectsTable projects={projects} />}

      <ProjectPagination pageable={pageable} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProjectView;
