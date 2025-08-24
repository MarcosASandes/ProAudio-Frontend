/*import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/projectDetails.module.css";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
import { formatDateToDDMMYY } from "../../utils/formatDate";
import stylesUnderline from "../../styles/generic/animatedUnderline.module.css";
import useGetBudgetPdfByProjectId from "../../hooks/projects/useGetBudgetPdfByProjectId";
import { showToast, showToastError } from "../../utils/toastUtils";
import useDeleteProject from "../../hooks/projects/useDeleteProject";
import { getProjectStatusLabel, getProjectPaymentStatusLabel } from "../../utils/getLabels";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchProjectDetails } = useGetProjectDetails();
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const getPdf = useGetBudgetPdfByProjectId();
  const handleDeleteProject = useDeleteProject();

  const project = useSelector(selectSelectedProjectDetails);
  console.log(project);

  useEffect(() => {
    if (id) fetchProjectDetails(id);
  }, [id]);


  //ToDo: Consumir desde el backend y borrar esto.
  const expenseTypeLabels = {
    PERSONNEL: "Personal",
    EXTRA_COST: "Otros",
  };

  const handleGoToUpdateProject = () => {
    navigate("/project/" + id + "/edit");
  };

  const handleClickDeleteProject = async () => {
    try {
      await handleDeleteProject(id);
      navigate("/");
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
    }
  };

  const downloadBudget = async () => {
    try {
      const pdfUrl = await getPdf(id); // Pasás el ID del proyecto
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "presupuesto.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl); // Limpieza de la URL temporal
      showToast("Se ha descargado el presupuesto correctamente.");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      showToastError(error.message);
    }
  };

  if (!project) return <p className="text-center mt-4">Cargando proyecto...</p>;

  return (
    <div className={`container py-4 ${styles.generalContainer}`}>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButtom.btnBackArrow}
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <div className="text-center mb-4">
        <h1 className="fw-bold">{project.name}</h1>
        <h5 className={styles.subtitle}>
          Tipo: {project.project_type === "SERVICE" ? "Servicio" : "Renta"}
        </h5>
      </div>

      <div className={`${styles.sectionContainer} mb-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
            Información del proyecto
          </h5>
          <div>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => navigate(`/project/${id}/return`)}
            >
              Retorno de artículos
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => navigate(`/project/${id}/outlet`)}
            >
              Salida de artículos
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={downloadBudget}
            >
              Descargar presupuesto
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => navigate(`/project/${id}/budget`)}
            >
              Ver presupuesto
            </button>
            <button
              className="btn btn-outline-primary btn-sm m-1"
              onClick={handleGoToUpdateProject}
            >
              Modificar
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => setShowDeleteModal(true)} // abrir modal
            >
              Eliminar
            </button>
          </div>
        </div>

        <div className="row">
          
          <div className="col-md-6">
            <p>
              <strong>Descripción:</strong> {project.description}
            </p>
            <p>
              <strong>Estado:</strong> {getProjectStatusLabel(project.status)}
            </p>
            <p>
              <strong>Estado de pago:</strong> {getProjectPaymentStatusLabel(project.payment_status)}
            </p>
            <p>
              <strong>Inicio:</strong> {formatDateToDDMMYY(project.start_date)}
            </p>
            <p>
              <strong>Fin:</strong> {formatDateToDDMMYY(project.end_date)}
            </p>
            <p>
              <strong>Porcentaje de cobro total:</strong> {project.cost_addition}%
            </p>
          </div>

        
          <div className="col-md-6">
            <div className="mb-3">
              <h5
                className={`fw-semibold ${stylesUnderline.animatedUnderline}`}
              >
                Evento
              </h5>
              {project?.event ? (
                <>
                  <p>
                    <strong>{project.event.name}</strong>
                  </p>
                  <p>Dirección: {project.event.address}</p>
                  <p>Distancia: {project.event.distance} km</p>
                  <p>{project.event.description}</p>
                </>
              ) : (
                <p>No hay evento asignado.</p>
              )}
            </div>

            <div>
              <h5
                className={`fw-semibold ${stylesUnderline.animatedUnderline}`}
              >
                Cliente
              </h5>
              <p>{project.client ? project.client.name : "No asignado"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.sectionContainer} mb-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
            Productos
          </h5>
          <button className="btn btn-outline-primary btn-sm" onClick={() => navigate("/project/" + id + "/products/create")}>
            Agregar productos
          </button>
        </div>
        {project.products?.length > 0 ? (
          project?.products?.map((prod, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                {prod.amount}x -{" "}
                <span
                  onClick={() => navigate(`/product/${prod.id}`)}
                  style={{
                    color: "#8cb4ff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {prod.model}
                </span>{" "}
                - ${prod.rent_price} (C/U)
              </span>
            </div>
          ))
        ) : (
          <p>No hay productos asignados.</p>
        )}

        
        <button
          className={`btn w-100 text-start mt-4 ${styles.collapseButton}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseArticles"
          aria-expanded="false"
          aria-controls="collapseArticles"
        >
          Artículos
        </button>

        
        <div
          className={`collapse mt-2 ${styles.collapseBody}`}
          id="collapseArticles"
        >
      
        {project.items?.length > 0 ? (
          project?.items?.map((item, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                {item.item_range} -{" "}
                <span
                  onClick={() => navigate(`/item/${item.item_id}/details`)}
                  style={{
                    color: "#8cb4ff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {item.product_model}
                </span>{" "}
                - {item.item_location}
                - {item.item_serial_number}
              </span>
            </div>
          ))
        ) : (
          <p className="text-light">
            Aquí se mostrarán los artículos del proyecto.
          </p>
        )}
        </div>
      </div>

      <div className={`${styles.sectionContainer}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
            Gastos
          </h5>
          <button className="btn btn-outline-primary btn-sm" onClick={() => navigate("/project/" + id + "/expenses/create")}>
            Agregar gastos
          </button>
        </div>
        {project.expenses?.length > 0 ? (
          project?.expenses?.map((exp, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                ${exp.value} - {expenseTypeLabels[exp.type] || exp.type} -{" "}
                {exp.description}
              </span>
            </div>
          ))
        ) : (
          <p>No hay gastos registrados.</p>
        )}
      </div>


   
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro/a que deseas eliminar el proyecto?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleClickDeleteProject}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;*/

/*----------------------------------------------- */

/*import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/projectDetails.module.css";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
import { formatDateToDDMMYY } from "../../utils/formatDate";
import stylesUnderline from "../../styles/generic/animatedUnderline.module.css";
import useGetBudgetPdfByProjectId from "../../hooks/projects/useGetBudgetPdfByProjectId";
import { showToast, showToastError } from "../../utils/toastUtils";
import useDeleteProject from "../../hooks/projects/useDeleteProject";
import { getProjectStatusLabel, getProjectPaymentStatusLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchProjectDetails } = useGetProjectDetails();
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const getPdf = useGetBudgetPdfByProjectId();
  const handleDeleteProject = useDeleteProject();

  const project = useSelector(selectSelectedProjectDetails);
  console.log(project);

  useEffect(() => {
    if (id) fetchProjectDetails(id);
  }, [id]);


  //ToDo: Consumir desde el backend y borrar esto.
  const expenseTypeLabels = {
    PERSONNEL: "Personal",
    EXTRA_COST: "Otros",
  };

  const handleGoToUpdateProject = () => {
    navigate("/project/" + id + "/edit");
  };

  const handleClickDeleteProject = async () => {
    try {
      await handleDeleteProject(id);
      navigate("/");
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
    }
  };

  const downloadBudget = async () => {
    try {
      const pdfUrl = await getPdf(id); // Pasás el ID del proyecto
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "presupuesto.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl); // Limpieza de la URL temporal
      showToast("Se ha descargado el presupuesto correctamente.");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      showToastError(error.message);
    }
  };

  if (!project) return <p className="text-center mt-4">Cargando proyecto...</p>;

  return (
    <div className={`container py-4 ${styles.generalContainer}`}>
      <BackButton target={"/"} />

      <div className="text-center mb-4">
        <h1 className="fw-bold">{project.name}</h1>
        <h5 className={styles.subtitle}>
          Tipo: {project.project_type === "SERVICE" ? "Servicio" : "Renta"}
        </h5>
      </div>

      <div className={`${styles.sectionContainer} mb-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
            Información del proyecto
          </h5>
          <div>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => navigate(`/project/${id}/return`)}
            >
              Retorno de artículos
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => navigate(`/project/${id}/outlet`)}
            >
              Salida de artículos
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={downloadBudget}
            >
              Descargar presupuesto
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => navigate(`/project/${id}/budget`)}
            >
              Ver presupuesto
            </button>
            <button
              className="btn btn-outline-primary btn-sm m-1"
              onClick={handleGoToUpdateProject}
            >
              Modificar
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => setShowDeleteModal(true)} // abrir modal
            >
              Eliminar
            </button>
          </div>
        </div>

        <div className="row">
          
          <div className="col-md-6">
            <p>
              <strong>Descripción:</strong> {project.description}
            </p>
            <p>
              <strong>Estado:</strong> {getProjectStatusLabel(project.status)}
            </p>
            <p>
              <strong>Estado de pago:</strong> {getProjectPaymentStatusLabel(project.payment_status)}
            </p>
            <p>
              <strong>Inicio:</strong> {formatDateToDDMMYY(project.start_date)}
            </p>
            <p>
              <strong>Fin:</strong> {formatDateToDDMMYY(project.end_date)}
            </p>
            <p>
              <strong>Porcentaje de cobro total:</strong> {project.cost_addition}%
            </p>
          </div>

        
          <div className="col-md-6">
            <div className="mb-3">
              <h5
                className={`fw-semibold ${stylesUnderline.animatedUnderline}`}
              >
                Evento
              </h5>
              {project?.event ? (
                <>
                  <p>
                    <strong>{project.event.name}</strong>
                  </p>
                  <p>Dirección: {project.event.address}</p>
                  <p>Distancia: {project.event.distance} km</p>
                  <p>{project.event.description}</p>
                </>
              ) : (
                <p>No hay evento asignado.</p>
              )}
            </div>

            <div className="mb-3">
              <h5
                className={`fw-semibold ${stylesUnderline.animatedUnderline}`}
              >
                Cliente
              </h5>
              {project?.client ? (
                <>
                  <p>
                    <strong>{project.client.name}</strong>
                  </p>
                  <p>Dirección: {project.client.address}</p>
                  <p>Email: {project.client.email}</p>
                  <p>Teléfono: {project.client.phone_number}</p>
                  <p>{project.client.details}</p>
                </>
              ) : (
                <p>No hay cliente asignado.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.sectionContainer} mb-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
            Productos
          </h5>
          <button className="btn btn-outline-primary btn-sm" onClick={() => navigate("/project/" + id + "/products/create")}>
            Agregar productos
          </button>
        </div>
        {project.products?.length > 0 ? (
          project?.products?.map((prod, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                {prod.amount}x -{" "}
                <span
                  onClick={() => navigate(`/product/${prod.id}`)}
                  style={{
                    color: "#8cb4ff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {prod.model}
                </span>{" "}
                - ${prod.rent_price} (C/U)
              </span>
            </div>
          ))
        ) : (
          <p>No hay productos asignados.</p>
        )}

        
        <button
          className={`btn w-100 text-start mt-4 ${styles.collapseButton}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseArticles"
          aria-expanded="false"
          aria-controls="collapseArticles"
        >
          Artículos
        </button>

        
        <div
          className={`collapse mt-2 ${styles.collapseBody}`}
          id="collapseArticles"
        >
      
        {project.items?.length > 0 ? (
          project?.items?.map((item, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                {item.item_range} -{" "}
                <span
                  onClick={() => navigate(`/item/${item.item_id}/details`)}
                  style={{
                    color: "#8cb4ff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {item.product_model}
                </span>{" "}
                - {item.item_location}
                - {item.item_serial_number}
              </span>
            </div>
          ))
        ) : (
          <p className="text-light">
            Aquí se mostrarán los artículos del proyecto.
          </p>
        )}
        </div>
      </div>

      <div className={`${styles.sectionContainer}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
            Gastos
          </h5>
          <button className="btn btn-outline-primary btn-sm" onClick={() => navigate("/project/" + id + "/expenses/create")}>
            Agregar gastos
          </button>
        </div>
        {project.expenses?.length > 0 ? (
          project?.expenses?.map((exp, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                ${exp.value} - {expenseTypeLabels[exp.type] || exp.type} -{" "}
                {exp.description}
              </span>
            </div>
          ))
        ) : (
          <p>No hay gastos registrados.</p>
        )}
      </div>


   
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro/a que deseas eliminar el proyecto?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleClickDeleteProject}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;*/

/*-------------------------------------------------------- */

/*import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/projectDetails.module.css";
import { formatDateToDDMMYY } from "../../utils/formatDate";
import useGetBudgetPdfByProjectId from "../../hooks/projects/useGetBudgetPdfByProjectId";
import { showToast, showToastError } from "../../utils/toastUtils";
import useDeleteProject from "../../hooks/projects/useDeleteProject";
import { getProjectStatusLabel, getProjectPaymentStatusLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import { Pencil, Trash, Download, PackagePlus, DollarSign, ChevronDown, ChevronUp } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchProjectDetails } = useGetProjectDetails();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const getPdf = useGetBudgetPdfByProjectId();
  const handleDeleteProject = useDeleteProject();

  const project = useSelector(selectSelectedProjectDetails);

  useEffect(() => {
    if (id) fetchProjectDetails(id);
  }, [id]);

  const expenseTypeLabels = {
    PERSONNEL: "Personal",
    EXTRA_COST: "Otros",
  };

  const handleGoToUpdateProject = () => {
    navigate("/project/" + id + "/edit");
  };

  const handleClickDeleteProject = async () => {
    try {
      await handleDeleteProject(id);
      navigate("/");
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
    }
  };

  const downloadBudget = async () => {
    try {
      const pdfUrl = await getPdf(id);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "presupuesto.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
      showToast("Se ha descargado el presupuesto correctamente.");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      showToastError(error.message);
    }
  };

  if (!project) return <p className={styles.loading}>Cargando proyecto...</p>;

  return (
    <div className={styles.generalContainer}>
      <BackButton target={"/"} />

      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.subtitle}>
        Tipo: {project.project_type === "SERVICE" ? "Servicio" : "Renta"}
      </p>

      <div className={styles.sectionContainer}>
        <div className={styles.actions}>
          <button className={`${styles.actionButton} ${styles.modifyButton}`} onClick={handleGoToUpdateProject}>
            <Pencil size={16} /> Modificar
          </button>
          <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => setShowDeleteModal(true)}>
            <Trash size={16} /> Eliminar
          </button>
          <button className={`${styles.actionButton} ${styles.downloadButton}`} onClick={downloadBudget}>
            <Download size={16} /> Presupuesto
          </button>
        </div>

        <p className={styles.label}>Descripción</p>
        <p className={styles.value}>{project.description || "Sin descripción"}</p>

        <p className={styles.label}>Estado</p>
        <p className={styles.value}>{getProjectStatusLabel(project.status)}</p>

        <p className={styles.label}>Estado de pago</p>
        <p className={styles.value}>{getProjectPaymentStatusLabel(project.payment_status)}</p>

        <p className={styles.label}>Inicio</p>
        <p className={styles.value}>{formatDateToDDMMYY(project.start_date)}</p>

        <p className={styles.label}>Fin</p>
        <p className={styles.value}>{formatDateToDDMMYY(project.end_date)}</p>

        <p className={styles.label}>Porcentaje de cobro total</p>
        <p className={styles.value}>{project.cost_addition}%</p>
      </div>

      <div className={styles.sectionContainer}>
        <h3 className={styles.sectionTitle}>Evento</h3>
        {project?.event ? (
          <>
            <p className={styles.value}><strong>{project.event.name}</strong></p>
            <p className={styles.value}>Dirección: {project.event.address}</p>
            <p className={styles.value}>Distancia: {project.event.distance} km</p>
            <p className={styles.value}>{project.event.description}</p>
          </>
        ) : (
          <p>No hay evento asignado.</p>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <h3 className={styles.sectionTitle}>Cliente</h3>
        {project?.client ? (
          <>
            <p className={styles.value}><strong>{project.client.name}</strong></p>
            <p className={styles.value}>Dirección: {project.client.address}</p>
            <p className={styles.value}>Email: {project.client.email}</p>
            <p className={styles.value}>Teléfono: {project.client.phone_number}</p>
            <p className={styles.value}>{project.client.details}</p>
          </>
        ) : (
          <p>No hay cliente asignado.</p>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Productos</h3>
          <button
            className={styles.addButton}
            onClick={() => navigate("/project/" + id + "/products/create")}
          >
            <PackagePlus size={16} /> Agregar productos
          </button>
        </div>

        {project.products?.length > 0 ? (
          project.products.map((prod, idx) => (
            <div key={idx} className={styles.listItem}>
              <span>
                {prod.amount}x -{" "}
                <span
                  onClick={() => navigate(`/product/${prod.id}`)}
                  className={styles.link}
                >
                  {prod.model}
                </span>{" "}
                - ${prod.rent_price} (C/U)
              </span>
            </div>
          ))
        ) : (
          <p>No hay productos asignados.</p>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <button className={styles.collapseButton} onClick={() => setShowArticles(!showArticles)}>
          <span>Artículos</span>
          {showArticles ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showArticles && (
          <div className={styles.collapseBody}>
            {project.items?.length > 0 ? (
              project.items.map((item, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span>
                    {item.item_range} -{" "}
                    <span
                      onClick={() => navigate(`/item/${item.item_id}/details`)}
                      className={styles.link}
                    >
                      {item.product_model}
                    </span>{" "}
                    - {item.item_location} - {item.item_serial_number}
                  </span>
                </div>
              ))
            ) : (
              <p>No hay artículos asignados.</p>
            )}
          </div>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Gastos</h3>
          <button
            className={styles.addButton}
            onClick={() => navigate("/project/" + id + "/expenses/create")}
          >
            <DollarSign size={16} /> Agregar gastos
          </button>
        </div>

        {project.expenses?.length > 0 ? (
          project.expenses.map((exp, idx) => (
            <div key={idx} className={styles.listItem}>
              <span>
                ${exp.value} - {expenseTypeLabels[exp.type] || exp.type} - {exp.description}
              </span>
            </div>
          ))
        ) : (
          <p>No hay gastos registrados.</p>
        )}
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Eliminar proyecto</h2>
            <p className={styles.modalText}>
              ¿Seguro/a que deseas eliminar este proyecto?{" "}
              <strong>Esta acción no se podrá deshacer.</strong>
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleClickDeleteProject}
                className={styles.confirmDeleteButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;*/

/*------------------------------ */

/*import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/projectDetails.module.css";
import { formatDateToDDMMYY } from "../../utils/formatDate";
import useGetBudgetPdfByProjectId from "../../hooks/projects/useGetBudgetPdfByProjectId";
import { showToast, showToastError } from "../../utils/toastUtils";
import useDeleteProject from "../../hooks/projects/useDeleteProject";
import {
  getProjectStatusLabel,
  getProjectPaymentStatusLabel,
} from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import {
  Pencil,
  Trash,
  Download,
  PackagePlus,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Truck,
  Flag,
  UserSearch,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchProjectDetails } = useGetProjectDetails();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const getPdf = useGetBudgetPdfByProjectId();
  const handleDeleteProject = useDeleteProject();
  const [showDropdown, setShowDropdown] = useState(false);

  const project = useSelector(selectSelectedProjectDetails);

  useEffect(() => {
    if (id) fetchProjectDetails(id);
  }, [id]);

  const expenseTypeLabels = {
    PERSONNEL: "Personal",
    EXTRA_COST: "Otros",
  };

  const handleGoToUpdateProject = () => {
    navigate("/project/" + id + "/edit");
  };

  const handleGoToOutletItems = () => {
    navigate(`/project/${id}/outlet`);
  };

  const handleGoToReturnItems = () => {
    navigate(`/project/${id}/return`);
  };

  const handleGoToClientDetails = () => {
    navigate(`/client/${project?.client?.client_id}`);
  };

  const handleGoToViewBudgetPDF = () => {
    navigate(`/project/${id}/budget`);
  };

  const handleClickDeleteProject = async () => {
    try {
      await handleDeleteProject(id);
      navigate("/");
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
    }
  };

  const downloadBudget = async () => {
    try {
      const pdfUrl = await getPdf(id);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "presupuesto.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
      showToast("Se ha descargado el presupuesto correctamente.");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      showToastError(error.message);
    }
  };

  if (!project) return <p className={styles.loading}>Cargando proyecto...</p>;

  return (
    <div className={styles.generalContainer}>
      <BackButton target={"/"} />

      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.subtitle}>
        Tipo: {project.project_type === "SERVICE" ? "Servicio" : "Renta"}
      </p>

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.modifyButton}`}
          onClick={handleGoToUpdateProject}
        >
          <Pencil size={16} /> Modificar
        </button>
        <button
          className={`${styles.actionButton} ${styles.outletButton}`}
          onClick={handleGoToOutletItems}
        >
          <Truck size={16} /> Salida de artículos
        </button>
        <button
          className={`${styles.actionButton} ${styles.returnButton}`}
          onClick={handleGoToReturnItems}
        >
          <Flag size={16} /> Retorno de artículos
        </button>

        <div className={styles.dropdownWrap}>
          <button
            className={`${styles.actionButton} ${styles.downloadButton}`}
            onClick={downloadBudget}
          >
            <Download size={16} /> Presupuesto
          </button>
          <button
            className={`${styles.actionButton} ${styles.downloadButton}`}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            ▼
          </button>

          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem} onClick={handleGoToViewBudgetPDF}>
                Ver presupuesto
              </button>
            </div>
          )}
        </div>


        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash size={16} /> Eliminar
        </button>
      </div>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "general" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("general")}
        >
          Información general
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "event" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("event")}
        >
          Evento
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "client" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("client")}
        >
          Cliente
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "products" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("products")}
        >
          Productos
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "expenses" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("expenses")}
        >
          Gastos
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "general" && (
          <div className={styles.sectionContainer}>
            <p className={styles.label}>Descripción</p>
            <p className={styles.value}>
              {project.description || "Sin descripción"}
            </p>

            <p className={styles.label}>Estado</p>
            <p className={styles.value}>
              {getProjectStatusLabel(project.status)}
            </p>

            <p className={styles.label}>Estado de pago</p>
            <p className={styles.value}>
              {getProjectPaymentStatusLabel(project.payment_status)}
            </p>

            <p className={styles.label}>Inicio</p>
            <p className={styles.value}>
              {formatDateToDDMMYY(project.start_date)}
            </p>

            <p className={styles.label}>Fin</p>
            <p className={styles.value}>
              {formatDateToDDMMYY(project.end_date)}
            </p>

            <p className={styles.label}>Porcentaje de cobro total</p>
            <p className={styles.value}>{project.cost_addition}%</p>
          </div>
        )}

        {activeTab === "event" && (
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Evento</h3>
            {project?.event ? (
              <>
                <p className={styles.value}>
                  <strong>{project.event.name}</strong>
                </p>
                <p className={styles.value}>
                  Dirección: {project.event.address}
                </p>
                <p className={styles.value}>
                  Distancia: {project.event.distance} km
                </p>
                <p className={styles.value}>{project.event.description}</p>
              </>
            ) : (
              <p>No hay evento asignado.</p>
            )}
          </div>
        )}

        {activeTab === "client" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Cliente</h3>
              <button
                className={styles.addButton}
                onClick={handleGoToClientDetails}
              >
                <UserSearch size={16} /> Ver cliente
              </button>
            </div>
            {project?.client ? (
              <>
                <p className={styles.value}>
                  <strong>{project.client.name}</strong>
                </p>
                <p className={styles.value}>
                  Dirección: {project.client.address}
                </p>
                <p className={styles.value}>Email: {project.client.email}</p>
                <p className={styles.value}>
                  Teléfono: {project.client.phone_number}
                </p>
                <p className={styles.value}>{project.client.details}</p>
              </>
            ) : (
              <p>No hay cliente asignado.</p>
            )}
          </div>
        )}

        {activeTab === "products" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Productos</h3>
              <button
                className={styles.addButton}
                onClick={() => navigate("/project/" + id + "/products/create")}
              >
                <PackagePlus size={16} /> Agregar productos
              </button>
            </div>

            {project.products?.length > 0 ? (
              project.products.map((prod, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span>
                    {prod.amount}x -{" "}
                    <span
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className={styles.link}
                    >
                      {prod.model}
                    </span>{" "}
                    - ${prod.rent_price} (C/U)
                  </span>
                </div>
              ))
            ) : (
              <p>No hay productos asignados.</p>
            )}

            <button
              className={styles.collapseButton}
              onClick={() => setShowArticles(!showArticles)}
            >
              <span>Artículos</span>
              {showArticles ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {showArticles && (
              <div className={styles.collapseBody}>
                {project.items?.length > 0 ? (
                  project.items.map((item, idx) => (
                    <div key={idx} className={styles.listItem}>
                      <span>
                        {item.item_range} -{" "}
                        <span
                          onClick={() =>
                            navigate(`/item/${item.item_id}/details`)
                          }
                          className={styles.link}
                        >
                          {item.product_model}
                        </span>{" "}
                        - {item.item_location} - {item.item_serial_number}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No hay artículos asignados.</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "expenses" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Gastos</h3>
              <button
                className={styles.addButton}
                onClick={() => navigate("/project/" + id + "/expenses/create")}
              >
                <DollarSign size={16} /> Agregar gastos
              </button>
            </div>

            {project.expenses?.length > 0 ? (
              project.expenses.map((exp, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span>
                    ${exp.value} - {expenseTypeLabels[exp.type] || exp.type} -{" "}
                    {exp.description}
                  </span>
                </div>
              ))
            ) : (
              <p>No hay gastos registrados.</p>
            )}
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Eliminar proyecto</h2>
            <p className={styles.modalText}>
              ¿Seguro/a que deseas eliminar este proyecto?{" "}
              <strong>Esta acción no se podrá deshacer.</strong>
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleClickDeleteProject}
                className={styles.confirmDeleteButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;*/

/*-------------------------------------------- */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/projectDetails.module.css";
import { formatDateToDDMMYY } from "../../utils/formatDate";
import useGetBudgetPdfByProjectId from "../../hooks/projects/useGetBudgetPdfByProjectId";
import { showToast, showToastError } from "../../utils/toastUtils";
import useDeleteProject from "../../hooks/projects/useDeleteProject";
import {
  getProjectStatusLabel,
  getProjectPaymentStatusLabel,
  getExpensesTypesLabel
} from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import {
  Pencil,
  Trash,
  Download,
  PackagePlus,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Truck,
  Flag,
  UserSearch,
  Eye,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchProjectDetails } = useGetProjectDetails();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const getPdf = useGetBudgetPdfByProjectId();
  const handleDeleteProject = useDeleteProject();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);

  const project = useSelector(selectSelectedProjectDetails);

  useEffect(() => {
    if (id) fetchProjectDetails(id);
  }, [id]);

  const handleGoToUpdateProject = () => {
    navigate("/project/" + id + "/edit");
  };

  const handleGoToOutletItems = () => {
    navigate(`/project/${id}/outlet`);
  };

  const handleGoToReturnItems = () => {
    navigate(`/project/${id}/return`);
  };

  const handleGoToClientDetails = () => {
    navigate(`/client/${project?.client?.client_id}`);
  };

  const handleGoToViewBudgetPDF = () => {
    navigate(`/project/${id}/budget`);
  };

  const handleClickDeleteProject = async () => {
    try {
      await handleDeleteProject(id);
      navigate("/");
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
    }
  };

  const downloadBudget = async () => {
    try {
      const pdfUrl = await getPdf(id);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "presupuesto.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
      showToast("Se ha descargado el presupuesto correctamente.");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      showToastError(error.message);
    }
  };

  if (!project) return <p className={styles.loading}>Cargando proyecto...</p>;

  return (
    <div className={styles.generalContainer}>
      <BackButton target={"/"} />

      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.subtitle}>
        Tipo: {project.project_type === "SERVICE" ? "Servicio" : "Renta"}
      </p>

      <div className={styles.mobileActionsButton}>
        <button
          className={styles.viewActionsButton}
          onClick={() => setShowActionsModal(true)}
        >
          Ver acciones
        </button>
      </div>

      {/* Acciones actuales visibles solo en escritorio */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.modifyButton}`}
          onClick={handleGoToUpdateProject}
        >
          <Pencil size={16} /> Modificar
        </button>
        <button
          className={`${styles.actionButton} ${styles.outletButton}`}
          onClick={handleGoToOutletItems}
        >
          <Truck size={16} /> Salida de artículos
        </button>
        <button
          className={`${styles.actionButton} ${styles.returnButton}`}
          onClick={handleGoToReturnItems}
        >
          <Flag size={16} /> Retorno de artículos
        </button>

        <div className={styles.dropdownWrap}>
          <button
            className={`${styles.actionButton} ${styles.downloadButton}`}
            onClick={downloadBudget}
          >
            <Download size={16} /> Presupuesto
          </button>
          <button
            className={`${styles.actionButton} ${styles.downloadButton}`}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            ▼
          </button>

          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <button
                className={styles.dropdownItem}
                onClick={handleGoToViewBudgetPDF}
              >
                Ver presupuesto
              </button>
            </div>
          )}
        </div>

        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash size={16} /> Eliminar
        </button>
      </div>

      {/* Pestañas */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "general" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("general")}
        >
          Información general
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "event" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("event")}
        >
          Evento
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "client" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("client")}
        >
          Cliente
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "products" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("products")}
        >
          Productos
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "expenses" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("expenses")}
        >
          Gastos
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className={styles.tabContent}>
        {activeTab === "general" && (
          <div className={styles.sectionContainer}>
            <p className={styles.label}>Descripción</p>
            <p className={styles.value}>
              {project.description || "Sin descripción"}
            </p>

            <p className={styles.label}>Estado</p>
            <p className={styles.value}>
              {getProjectStatusLabel(project.status)}
            </p>

            <p className={styles.label}>Estado de pago</p>
            <p className={styles.value}>
              {getProjectPaymentStatusLabel(project.payment_status)}
            </p>

            <p className={styles.label}>Inicio</p>
            <p className={styles.value}>
              {formatDateToDDMMYY(project.start_date)}
            </p>

            <p className={styles.label}>Fin</p>
            <p className={styles.value}>
              {formatDateToDDMMYY(project.end_date)}
            </p>

            <p className={styles.label}>Porcentaje de cobro total</p>
            <p className={styles.value}>{project.cost_addition}%</p>

            <p className={styles.label}>ID</p>
            <p className={styles.value}>{project.project_id}</p>
          </div>
        )}

        {activeTab === "event" && (
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Evento</h3>
            {project?.event ? (
              <>
                <p className={styles.value}>
                  <strong>{project.event.name}</strong>
                </p>
                <p className={styles.value}>
                  Dirección: {project.event.address}
                </p>
                <p className={styles.value}>
                  Distancia: {project.event.distance} km
                </p>
                <p className={styles.value}>{project.event.description}</p>
              </>
            ) : (
              <p className={styles.noData}>No hay evento asignado.</p>
            )}
          </div>
        )}

        {activeTab === "client" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Cliente</h3>
              <button
                className={styles.addButton}
                onClick={handleGoToClientDetails}
              >
                <UserSearch size={16} /> Ver cliente
              </button>
            </div>
            {project?.client ? (
              <>
                <p className={styles.value}>
                  <strong>{project.client.name}</strong>
                </p>
                <p className={styles.value}>
                  Dirección: {project.client.address}
                </p>
                <p className={styles.value}>Email: {project.client.email}</p>
                <p className={styles.value}>
                  Teléfono: {project.client.phone_number}
                </p>
                <p className={styles.value}>{project.client.details}</p>
              </>
            ) : (
              <p className={styles.noData}>No hay cliente asignado.</p>
            )}
          </div>
        )}

        {activeTab === "products" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Productos</h3>
              <button
                className={styles.addButton}
                onClick={() => navigate("/project/" + id + "/products/create")}
              >
                <PackagePlus size={16} /> Agregar productos
              </button>
            </div>

            {project.products?.length > 0 ? (
              project.products.map((prod, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span>
                    {prod.amount}x -{" "}
                    <span
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className={styles.link}
                    >
                      {prod.model}
                    </span>{" "}
                    - ${prod.rent_price} (C/U)
                  </span>
                </div>
              ))
            ) : (
              <p className={styles.noData}>No hay productos asignados.</p>
            )}

            {/* Artículos */}
            <button
              className={styles.collapseButton}
              onClick={() => setShowArticles(!showArticles)}
            >
              <span>Artículos</span>
              {showArticles ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {showArticles && (
              <div className={styles.collapseBody}>
                {project.items?.length > 0 ? (
                  project.items.map((item, idx) => (
                    <div key={idx} className={styles.listItem}>
                      <span>
                        {item.item_range} -{" "}
                        <span
                          onClick={() =>
                            navigate(`/item/${item.item_id}/details`)
                          }
                          className={styles.link}
                        >
                          {item.product_model}
                        </span>{" "}
                        - {item.item_location} - {item.item_serial_number}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className={styles.noData}>No hay artículos asignados.</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "expenses" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Gastos</h3>
              <button
                className={styles.addButton}
                onClick={() => navigate("/project/" + id + "/expenses/create")}
              >
                <DollarSign size={16} /> Agregar gastos
              </button>
            </div>

            {project.expenses?.length > 0 ? (
              project.expenses.map((exp, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span>
                    ${exp.value} - {getExpensesTypesLabel(exp.type) || exp.type} -{" "}
                    {exp.description}
                  </span>
                </div>
              ))
            ) : (
              <p className={styles.noData}>No hay gastos registrados.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Eliminar proyecto</h2>
            <p className={styles.modalText}>
              ¿Seguro/a que deseas eliminar este proyecto?{" "}
              <strong>Esta acción no se podrá deshacer.</strong>
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleClickDeleteProject}
                className={styles.confirmDeleteButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para móviles */}
      {showActionsModal && (
        <div className={styles.actionsModalOverlay}>
          <div className={styles.actionsModal}>
            <h3 className={styles.actionsModalTitle}>Acciones</h3>
            <div className={styles.actionsModalContent}>
              <button
                className={`${styles.actionButton} ${styles.modifyButton}`}
                onClick={() => {
                  handleGoToUpdateProject();
                  setShowActionsModal(false);
                }}
              >
                <Pencil size={16} /> Modificar
              </button>
              <button
                className={`${styles.actionButton} ${styles.outletButton}`}
                onClick={() => {
                  handleGoToOutletItems();
                  setShowActionsModal(false);
                }}
              >
                <Truck size={16} /> Salida de artículos
              </button>
              <button
                className={`${styles.actionButton} ${styles.returnButton}`}
                onClick={() => {
                  handleGoToReturnItems();
                  setShowActionsModal(false);
                }}
              >
                <Flag size={16} /> Retorno de artículos
              </button>
              <button
                className={`${styles.actionButton} ${styles.downloadButton}`}
                onClick={() => {
                  downloadBudget();
                  setShowActionsModal(false);
                }}
              >
                <Download size={16} /> Presupuesto
              </button>
              <button
                className={`${styles.actionButton} ${styles.downloadButton}`}
                onClick={() => {
                  handleGoToViewBudgetPDF();
                  setShowActionsModal(false);
                }}
              >
                <Eye size={16} /> Ver presupuesto
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => {
                  setShowDeleteModal(true);
                  setShowActionsModal(false);
                }}
              >
                <Trash size={16} /> Eliminar
              </button>
            </div>
            <button
              className={styles.closeModalButton}
              onClick={() => setShowActionsModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
