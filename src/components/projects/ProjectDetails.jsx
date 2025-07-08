import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSlice";
import styles from "../../styles/projects/projectDetails.module.css";
import stylesBackButton from "../../styles/shared/backButton.module.css";
import { ArrowLeft } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchProjectDetails } = useGetProjectDetails();

  const project = useSelector(selectSelectedProjectDetails);

  useEffect(() => {
    if (id) fetchProjectDetails(id);
  }, [id]);

  if (!project) return <p className="text-center mt-4">Cargando proyecto...</p>;

  return (
    <div className={`container py-4 ${styles.generalContainer}`}>
      {/* 🔙 Botón volver */}
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButton.btnBackArrow}
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      {/* 🧾 Título */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">{project.name}</h1>
        <h5 className={styles.subtitle}>
          Tipo: {project.project_type === "SERVICE" ? "Servicio" : "Renta"}
        </h5>
      </div>

      {/* 📋 Info general */}
      <div className="row mt-4">
        {/* Columna izquierda */}
        <div className="col-md-6 mb-4">
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className="fw-semibold">Descripción</h5>
            <p>{project.description}</p>

            <h5 className="fw-semibold mt-3">Estado</h5>
            <p>{project.status}</p>

            <h5 className="fw-semibold mt-3">Estado de pago</h5>
            <p>{project.payment_status}</p>

            <h5 className="fw-semibold mt-3">Adición de costo (%)</h5>
            <p>{project.cost_addition}</p>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className="fw-semibold">Fechas</h5>
            <p><strong>Inicio:</strong> {project.start_date}</p>
            <p><strong>Fin:</strong> {project.end_date}</p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-md-6 mb-4">
          {/* Evento */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className="fw-semibold">Evento</h5>
            {project.event ? (
              <>
                <p><strong>{project.event.name}</strong></p>
                <p>Dirección: {project.event.address}</p>
                <p>Distancia: {project.event.distance} km</p>
                <p>{project.event.description}</p>
              </>
            ) : (
              <p>No hay evento asignado.</p>
            )}
          </div>

          {/* Cliente */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className="fw-semibold">Cliente</h5>
            <p>{project.client ? project.client.name : "No asignado"}</p>
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className={`${styles.sectionContainer} mb-4`}>
        <h5 className="fw-semibold">Productos</h5>
        {project.products?.length > 0 ? (
          project.products.map((prod, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span><strong>Modelo:</strong> {prod.model}</span>
              <span><strong>Cantidad:</strong> {prod.amount}</span>
              <span><strong>Estado:</strong> {prod.status}</span>
            </div>
          ))
        ) : (
          <p>No hay productos asignados.</p>
        )}
      </div>

      {/* Gastos */}
      <div className={`${styles.sectionContainer}`}>
        <h5 className="fw-semibold">Gastos</h5>
        {project.expenses?.length > 0 ? (
          project.expenses.map((exp, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span><strong>Tipo:</strong> {exp.type}</span>
              <span><strong>Valor:</strong> ${exp.value}</span>
              <span><strong>Descripción:</strong> {exp.description}</span>
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
