import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProjectDetails from "../../hooks/projects/useGetProjectDetails";
import { selectSelectedProjectDetails } from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/projectDetails.module.css";
import { formatearFecha } from "../../utils/formatDate";
import useGetBudgetPdfByProjectId from "../../hooks/projects/useGetBudgetPdfByProjectId";
import { showToast, showToastError } from "../../utils/toastUtils";
import useDeleteProject from "../../hooks/projects/useDeleteProject";
import {
  getProjectStatusLabel,
  getProjectPaymentStatusLabel,
  getExpensesTypesLabel,
  getItemsLocationLabel,
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
import { cleanPdfName } from "../../utils/formatSerialNumber";

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
      const maxLen = 100;
      const pdfNameCleaned = cleanPdfName(project.name);
      let fileNameConst = `${pdfNameCleaned}-Presupuesto ProAudio Channels.pdf`;
      if (fileNameConst.length > maxLen) {
        fileNameConst = fileNameConst.slice(0, maxLen - 4) + ".pdf";
      }
      link.download = fileNameConst;
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
            <ChevronDown size={20} />
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
            <p className={styles.value}>{formatearFecha(project.start_date)}</p>

            <p className={styles.label}>Fin</p>
            <p className={styles.value}>{formatearFecha(project.end_date)}</p>

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
                    - {prod.rent_price} USD (C/U)
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
                        - {getItemsLocationLabel(item.item_location)} -{" "}
                        {item.item_serial_number}
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
                    {exp.value} USD -{" "}
                    {getExpensesTypesLabel(exp.type) || exp.type} -{" "}
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
