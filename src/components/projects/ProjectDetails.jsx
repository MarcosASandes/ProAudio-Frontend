import React, { useEffect, useState } from "react";
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

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchProjectDetails } = useGetProjectDetails();
  const [articlesOpen, setArticlesOpen] = useState(false);
  const getPdf = useGetBudgetPdfByProjectId();

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
            <button className="btn btn-outline-danger btn-sm m-1">
              Eliminar
            </button>
          </div>
        </div>

        <div className="row">
          {/* 🟦 Izquierda: Datos generales */}
          <div className="col-md-6">
            <p>
              <strong>Descripción:</strong> {project.description}
            </p>
            <p>
              <strong>Estado:</strong> {project.status}
            </p>
            <p>
              <strong>Estado de pago:</strong> {project.payment_status}
            </p>
            {/*<p>
              <strong>Adición de costo (%):</strong> {project.cost_addition}
            </p>*/}
            <p>
              <strong>Inicio:</strong> {formatDateToDDMMYY(project.start_date)}
            </p>
            <p>
              <strong>Fin:</strong> {formatDateToDDMMYY(project.end_date)}
            </p>
            {/*<p>
              <strong>Facturación total:</strong> ${project.total}
            </p>*/}
          </div>

          {/* 🟩 Derecha: Evento + Cliente */}
          <div className="col-md-6">
            <div className="mb-3">
              <h5
                className={`fw-semibold ${stylesUnderline.animatedUnderline}`}
              >
                Evento
              </h5>
              {project.event ? (
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
          <button className="btn btn-outline-primary btn-sm">
            Agregar productos
          </button>
        </div>
        {project.products.products?.length > 0 ? (
          project.products.products.map((prod, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                {prod.amount}x -{" "}
                <span
                  onClick={() => navigate(`/product/${prod.product_id}`)}
                  style={{
                    color: "#8cb4ff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {prod.model}
                </span>{" "}
                - ${prod.rentPrice} (C/U)
              </span>
            </div>
          ))
        ) : (
          <p>No hay productos asignados.</p>
        )}

        {/* Botón colapsable para Artículos */}
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

        {/* Contenedor colapsable de Artículos */}
        <div
          className={`collapse mt-2 ${styles.collapseBody}`}
          id="collapseArticles"
        >
          {/* Aquí en el futuro irán los datos de artículos */}
          <p className="text-light">
            Aquí se mostrarán los artículos del proyecto.
          </p>
        </div>
      </div>

      <div className={`${styles.sectionContainer}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
            Gastos
          </h5>
          <button className="btn btn-outline-primary btn-sm">
            Agregar gastos
          </button>
        </div>
        {project.expenses?.length > 0 ? (
          project.expenses.map((exp, idx) => (
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
    </div>
  );
};

export default ProjectDetails;
