import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/projectDetails.module.css";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import { ArrowLeft } from "lucide-react";
import { formatDateToDDMMYY } from "../../utils/formatDate";

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
          className={stylesBackButtom.btnBackArrow}
          onClick={() => navigate("/")}
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
          {/* Datos generales */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold">Datos generales</h5>
              <button className="btn btn-outline-primary btn-sm">
                Modificar
              </button>
            </div>
            <p>
              <strong>Descripción:</strong> {project.description}
            </p>
            <p>
              <strong>Estado:</strong> {project.status}
            </p>
            <p>
              <strong>Estado de pago:</strong> {project.payment_status}
            </p>
            <p>
              <strong>Adición de costo (%):</strong> {project.cost_addition}
            </p>
            <p>
              <strong>Inicio:</strong> {formatDateToDDMMYY(project.start_date)}
            </p>
            <p>
              <strong>Fin:</strong> {formatDateToDDMMYY(project.end_date)}
            </p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-md-6 mb-4">
          {/* Evento */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold">Evento</h5>
              <button className="btn btn-outline-primary btn-sm">
                Modificar
              </button>
            </div>
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

          {/* Cliente */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold">Cliente</h5>
              <button className="btn btn-outline-primary btn-sm">
                Modificar
              </button>
            </div>
            <p>{project.client ? project.client.name : "No asignado"}</p>
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className={`${styles.sectionContainer} mb-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold">Productos</h5>
          <button className="btn btn-outline-primary btn-sm">Modificar</button>
        </div>
        {project.products?.length > 0 ? (
          project.products.map((prod, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                <strong>Modelo:</strong> {prod.model}
              </span>
              <span>
                <strong>Cantidad:</strong> {prod.amount}
              </span>
              <span>
                <strong>Estado:</strong> {prod.status}
              </span>
              <span>
                <strong>Precio:</strong> ${prod.price_value}
              </span>
            </div>
          ))
        ) : (
          <p>No hay productos asignados.</p>
        )}
      </div>

      {/* Gastos */}
      <div className={`${styles.sectionContainer}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold">Gastos</h5>
          <button className="btn btn-outline-primary btn-sm">Modificar</button>
        </div>
        {project.expenses?.length > 0 ? (
          project.expenses.map((exp, idx) => (
            <div key={idx} className={styles.priceItem}>
              <span>
                <strong>Tipo:</strong> {exp.type}
              </span>
              <span>
                <strong>Valor:</strong> ${exp.value}
              </span>
              <span>
                <strong>Descripción:</strong> {exp.description}
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
