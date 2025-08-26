import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedClientDetails } from "../../features/clients/ClientSelector";
import useGetClientDetails from "../../hooks/clients/useGetClientDetails";
import useDeleteClient from "../../hooks/clients/useDeleteClient";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Pencil,
  Trash,
} from "lucide-react";
import styles from "../../styles/clients/clientDetails.module.css";
import BackButton from "../global/BackButton";
import { getEnabledDisabledLabel } from "../../utils/getLabels";
import { formatDateToDDMMYY } from "../../utils/formatDate";
import {
  getProjectPaymentStatusLabel,
  getProjectStatusLabel,
} from "../../utils/getLabels";

const ClientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { fetchClientDetails } = useGetClientDetails();
  const deleteClient = useDeleteClient();
  const client = useSelector(selectSelectedClientDetails);
  const navigate = useNavigate();

  const [showProjects, setShowProjects] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchClientDetails(id);
    }
  }, [id, fetchClientDetails]);

  const handleConfirmDelete = async () => {
    const success = await deleteClient(id);
    if (success) {
      navigate("/clients");
    }
  };

  if (!client) {
    return <p>Cargando detalles del cliente...</p>;
  }

  return (
    <div className={styles.generalContainer}>
      <BackButton target={"/clients"} />
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>{client.name}</h1>
      </div>
      {/*<h1 className={styles.title}>{client.name}</h1>*/}
      <p className={styles.subtitle}>ID Cliente: {client.client_id}</p>

      <div className={styles.sectionContainer}>
        <div className={styles.actions}>
          <button
            onClick={() => navigate(`/client/${id}/edit`)}
            className={`${styles.actionButton} ${styles.modifyButton}`}
          >
            <Pencil size={16} />
            Modificar
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className={`${styles.actionButton} ${styles.deleteButton}`}
          >
            <Trash size={16} />
            Eliminar
          </button>
        </div>

        <p className={styles.label}>Teléfono</p>
        <p className={styles.value}>
          {client.phone_number || "No especificado"}
        </p>

        <p className={styles.label}>Email</p>
        <p className={styles.value}>{client.email || "No especificado"}</p>

        <p className={styles.label}>Dirección</p>
        <p className={styles.value}>{client.address || "No especificada"}</p>

        <p className={styles.label}>Estado</p>
        <p className={styles.value}>{getEnabledDisabledLabel(client.status)}</p>

        <p className={styles.label}>Detalles</p>
        <p className={styles.value}>
          {client.details || "Sin detalles adicionales"}
        </p>
      </div>

      <div className={styles.sectionContainer}>
        <button
          className={styles.collapseButton}
          onClick={() => setShowProjects(!showProjects)}
        >
          <span>Proyectos asociados</span>
          {showProjects ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showProjects && (
          <div className={styles.collapseBody}>
            {client.projects_participated.length > 0 ? (
              client.projects_participated.map((project) => (
                <div key={project.projectId} className={styles.projectItem}>
                  <div>
                    <p className={styles.projectName}>
                      {project.name} | {formatDateToDDMMYY(project.startDate)} -{" "}
                      {formatDateToDDMMYY(project.endDate)}
                    </p>
                    <p className={styles.projectMeta}>
                      ID: {project.projectId} | Estado:{" "}
                      {getProjectStatusLabel(project.status)} | Pago:{" "}
                      {getProjectPaymentStatusLabel(project.paymentStatus)}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/project/${project.projectId}`)}
                    className={styles.projectAction}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p>No hay proyectos asociados</p>
            )}
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Eliminar cliente</h2>
            <p className={styles.modalText}>
              ¿Seguro/a que deseas eliminar este cliente?{" "}
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
                onClick={handleConfirmDelete}
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

export default ClientDetails;
