/**
 * Vista principal de gestión de proyectos.
 *
 * Este componente actúa como contenedor para la visualización, filtrado, ordenamiento
 * y paginación de la lista de proyectos.
 * Combina varios subcomponentes para ofrecer una interfaz completa:
 * - `ProjectFilter`: para aplicar búsqueda, filtros y ordenamiento.
 * - `ProjectsTable`: para mostrar la lista de proyectos en formato tabular.
 * - `ProjectPagination`: para navegar entre páginas de resultados.
 *
 * Funcionalidades principales:
 * - Obtiene los proyectos desde la API utilizando el hook `useGetAllProjects`.
 * - Gestiona el estado local de búsqueda, filtros, orden y página actual.
 * - Permite crear un nuevo proyecto redirigiendo a la vista de creación.
 * - Muestra mensajes de carga o error según el estado de la petición.
 *
 * @component
 * @returns {JSX.Element} Vista completa con filtros, tabla y paginación de proyectos.
 */

/*import React, { useState, useEffect } from "react";
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
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("");

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
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h2 className={styles.title}>Proyectos</h2>
        <button className={styles.createButton} onClick={handleGoToCreate}>
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
      {!loading && !error && (
        <div className={styles.tableWrapper}>
          <ProjectsTable projects={projects} />
        </div>
      )}

      
      <div className={styles.paginationWrapper}>
        <ProjectPagination pageable={pageable} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default ProjectView;*/

/*-------------------------------------------------- */

import React, { useState, useEffect } from "react";
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
import { Calendar } from "lucide-react";

const ProjectView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [sortBy, setSortBy] = useState("start_date");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("");

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

  const handleGoToEvents = () => {
    console.log("Yendo a events");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, direction, filterStatus, filterPaymentStatus]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Proyectos</h2>
        <div className={styles.actions}>
          <button className={styles.calendarButton} onClick={handleGoToEvents}>
            <Calendar size={18} />
            <span className={styles.calendarText}>Ver eventos</span>
          </button>

          <button className={styles.createButton} onClick={handleGoToCreate}>
            Crear proyecto
          </button>
        </div>
      </div>

      {/* Filtros */}
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

      {/* Tabla */}
      {loading && <p>Cargando proyectos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className={styles.tableWrapper}>
          <ProjectsTable projects={projects} />
        </div>
      )}

      {/* Paginación */}
      <div className={styles.paginationWrapper}>
        <ProjectPagination pageable={pageable} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default ProjectView;
