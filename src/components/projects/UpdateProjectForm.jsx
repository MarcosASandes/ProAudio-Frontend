import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import updateProjectValidator from "../../validators/projects/updateProjectValidator";
import useGetProjectById from "../../hooks/projects/useGetProjectById";
import useUpdateProject from "../../hooks/projects/useUpdateProject";
import {
  selectSelectedProject,
  selectProjectsLoading,
  selectProjectsError,
  selectProjectTypes,
  selectProjectStatus,
  selectAllPaymentStatusesProject,
} from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/updateProjectForm.module.css";
import EventSelectorModal from "../events/EventSelectorModal";
import ClientSelectorModal from "../clients/ClientSelectorModal ";
import BackButton from "../global/BackButton";
import useGetProjectTypes from "../../hooks/projects/useGetProjectTypes";
import useGetPossibleStatusByProjectId from "../../hooks/projects/useGetPossibleStatusByProjectId";
import useGetAllProjectPaymentStatuses from "../../hooks/projects/useGetAllProjectPaymentStatuses";
import { showToast } from "../../utils/toastUtils";
import {
  getProjectTypeLabel,
  getProjectStatusLabel,
  getProjectPaymentStatusLabel,
} from "../../utils/getLabels";
import { getUpdateProjectFormErrorMessages } from "../../utils/getErrorsMessages";
import { Plus, MousePointerClick, X, Info } from "lucide-react";
import { formatDateToDatetimeLocal } from "../../utils/formatDate";

const UpdateProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hydratedRef = useRef(false);

  const draftKey = (projectId) => `projectDraftUpdate:${projectId}`;
  const tempEventKey = (projectId) => `temporaryProjectEvent:${projectId}`;
  const tempClientKey = (projectId) => `temporaryProjectClient:${projectId}`;

  const { fetchProjectById } = useGetProjectById();
  const { updateProject } = useUpdateProject();

  useGetProjectTypes();
  const projectTypes = useSelector(selectProjectTypes);

  const { fetchProjectStatusByProjectId } = useGetPossibleStatusByProjectId();
  useGetAllProjectPaymentStatuses();
  const paymentsStatuses = useSelector(selectAllPaymentStatusesProject);
  const projectStatuses = useSelector(selectProjectStatus);

  const project = useSelector(selectSelectedProject);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);

  const [showEventModal, setShowEventModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProjectValidator),
    defaultValues: {},
  });

  const errorMessages = getUpdateProjectFormErrorMessages(errors);

  const handleSelectEvent = (event) => setValue("event", event);
  const handleSelectClient = (client) => setValue("client", client);

  const selectedEvent = watch("event");
  const selectedClient = watch("client");

  //para que no se acumulen las keys en el local storage
  useEffect(() => {
    if (!id) return;
    Object.keys(localStorage).forEach((key) => {
      if (
        (key.startsWith("projectDraftUpdate:") && key !== draftKey(id)) ||
        (key.startsWith("temporaryProjectEvent:") &&
          key !== tempEventKey(id)) ||
        (key.startsWith("temporaryProjectClient:") && key !== tempClientKey(id))
      ) {
        localStorage.removeItem(key);
      }
    });
  }, [id]);

  useEffect(() => {
    fetchProjectById(id);
    fetchProjectStatusByProjectId(id);
  }, [id, fetchProjectById, fetchProjectStatusByProjectId]);

  useEffect(() => {
    if (!project || !id) return;

    let savedDraft = null;
    const raw = localStorage.getItem(draftKey(id));
    if (raw) {
      try {
        savedDraft = JSON.parse(raw);
      } catch (e) {
        console.error("Cannot parse saved draft", e);
      }
    }

    const tempEvent = JSON.parse(
      localStorage.getItem(tempEventKey(id)) || "null"
    );
    const tempClient = JSON.parse(
      localStorage.getItem(tempClientKey(id)) || "null"
    );

    const baseData = savedDraft || project;

    const initialData = {
      ...baseData,
      start_date: formatDateToDatetimeLocal(baseData?.start_date),
      end_date: formatDateToDatetimeLocal(baseData?.end_date),
    };

    if (tempEvent) initialData.event = tempEvent;
    if (tempClient) initialData.client = tempClient;

    reset(initialData);
    hydratedRef.current = true;
  }, [project, reset, id]);

  useEffect(() => {
    if (!id) return;

    const subscription = watch((value) => {
      if (!hydratedRef.current) return;

      try {
        localStorage.setItem(draftKey(id), JSON.stringify(value));
      } catch (e) {
        console.error("Error guardando project draft", e);
      }
    });

    return () => {
      try {
        subscription.unsubscribe();
      } catch (e) {
      }
    };
  }, [watch, id]);

  const handleGoBack = () => {
    return "/";
  };

  const selectEvent = (event) => {
    localStorage.removeItem(tempEventKey(id));
    setValue("event", {
      event_id: event.event_id,
      name: event.name,
      address: event.address,
      distance: event.distance,
      description: event.description,
    });
  };

  const selectClient = (client) => {
    localStorage.removeItem(tempClientKey(id));
    setValue("client", {
      client_id: client.client_id,
      name: client.name,
      email: client.email,
      phone: client.phone_number,
    });
  };

  const handleGoToCreateEvent = () => {
    const currentData = getValues();
    localStorage.setItem(
      draftKey(id),
      JSON.stringify({
        ...currentData,
        event: selectedEvent,
        client: selectedClient,
      })
    );
    navigate("/events/create/embedded", {
      state: { from: "update-project", projectId: id },
    });
  };

  const handleGoToCreateClient = () => {
    const currentData = getValues();
    localStorage.setItem(
      draftKey(id),
      JSON.stringify({
        ...currentData,
        event: selectedEvent,
        client: selectedClient,
      })
    );
    navigate("/clients/create/embedded", {
      state: { from: "update-project", projectId: id },
    });
  };


  const handleRemoveClient = () => {
    handleSelectClient(null);
    setValue("client", null);
    localStorage.removeItem(tempClientKey(id));
  };

  const handleRemoveEvent = () => {
    handleSelectEvent(null);
    setValue("event", null);
    setValue("event_id", null);
    localStorage.removeItem(tempEventKey(id));
  };

  const onSubmit = async (data) => {
    const clientForBackend = data.client
      ? {
          ...data.client,
          phone_number: data.client.phone,
          phone: undefined,
        }
      : null;

    const payload = {
      ...data,
      client: clientForBackend,
      start_date: data.start_date,
      end_date: data.end_date,
      event: selectedEvent?.id ? null : selectedEvent,
    };

    await updateProject(id, payload);
    localStorage.removeItem(tempEventKey(id));
    localStorage.removeItem(tempClientKey(id));
    localStorage.removeItem(draftKey(id));
    navigate("/");
  };

  if (loading) return <p>Cargando proyecto...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!project) return null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <BackButton target={handleGoBack()} />
        <h2 className={styles.title}>Modificar Proyecto</h2>

        <div className={styles.formGroup}>
          <label htmlFor="txtNameProject">Nombre del proyecto</label>
          <input
            id="txtNameProject"
            type="text"
            className={styles.input}
            {...register("name")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="txtDescriptionProject">Descripción</label>
          <textarea
            id="txtDescriptionProject"
            rows="3"
            className={`${styles.textarea || ""}`}
            {...register("description")}
          />
        </div>

        <div className={styles.sameRow}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <div className={styles.labelWithIcon}>
                <label htmlFor="dateStartProject">Fecha de inicio</label>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Info size={15} />
                  <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                    Tener en cuenta que si el proyecto está en curso no podrá
                    modificarse la fecha de inicio.
                  </div>
                </div>
              </div>
              <input
                id="dateStartProject"
                type="datetime-local"
                className={styles.input}
                {...register("start_date")}
              />
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.formGroup}>
              <div className={styles.labelWithIcon}>
                <label htmlFor="dateFinishProject">Fecha de fin</label>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Info size={15} />
                  <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                    Tener en cuenta que si el proyecto está en curso no podrá
                    modificarse la fecha de finalización.
                  </div>
                </div>
              </div>
              <input
                id="dateFinishProject"
                type="datetime-local"
                className={styles.input}
                {...register("end_date")}
              />
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.formGroup}>
              <div className={styles.labelWithIcon}>
                <label htmlFor="slcProjectType">Tipo de proyecto</label>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Info size={15} />
                  <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                    Los proyectos de tipo "Renta" se les imprime el valor de
                    reposición en el PDF del presupuesto. En cambio a los que
                    son de tipo "Servicio" se les omite.
                  </div>
                </div>
              </div>
              <select
                id="slcProjectType"
                className={styles.select}
                {...register("project_type")}
              >
                <option value="">Seleccionar tipo</option>
                {projectTypes?.map((type) => (
                  <option key={type} value={type}>
                    {getProjectTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.formGroup}>
              <div className={styles.labelWithIcon}>
                <label htmlFor="numCostAddition">Porcentaje de cobro (%)</label>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Info size={15} />
                  <div className={`${styles.tooltip} ${styles.tooltipLeft}`}>
                    Representa qué porcentaje se cobrará del presupuesto total
                    del proyecto.
                  </div>
                </div>
              </div>
              <input
                id="numCostAddition"
                type="number"
                step="0.01"
                onWheel={(e) => e.target.blur()}
                className={styles.input}
                {...register("cost_addition")}
              />
            </div>
          </div>
        </div>

        <div className={styles.sameRow}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <label htmlFor="slcStatus">Estado del proyecto</label>
              <select
                id="status"
                className={styles.select}
                {...register("status")}
              >
                <option value={project?.status} disabled>
                  {getProjectStatusLabel(project?.status)}
                </option>
                {projectStatuses?.map((status) => (
                  <option key={status} value={status}>
                    {getProjectStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.formGroup}>
              <label htmlFor="slcPaymentStatus">Estado de pago</label>
              <select
                id="slcPaymentStatus"
                className={styles.select}
                {...register("payment_status")}
              >
                <option value={project?.payment_status} disabled>
                  {getProjectPaymentStatusLabel(project?.payment_status)}
                </option>
                {paymentsStatuses?.map((status) => (
                  <option key={status} value={status}>
                    {getProjectPaymentStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.sameRow}>
          <div className={styles.col}>
            <div className={styles.formGroup}>
              <div className={styles.labelWithIcon}>
                <label>Evento</label>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Info size={15} />
                  <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                    Puedes seleccionar un evento ya existente o crear uno desde
                    cero. Ten en cuenta que si creas un evento desde cero este
                    no se guardará en el sistema hasta que no guardes el
                    proyecto con los nuevos datos.
                  </div>
                </div>
              </div>
              {selectedEvent ? (
                <div className={styles.selectedEventBadge}>
                  <span className={styles.eventText}>
                    <strong>{selectedEvent.name}</strong> –{" "}
                    {selectedEvent.address}
                  </span>
                  <button
                    type="button"
                    className={styles.removeEventBtn}
                    onClick={handleRemoveEvent}
                    aria-label="Quitar evento"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className={styles.inlineButtons}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => setShowEventModal(true)}
                  >
                    <MousePointerClick size={16} />
                    Seleccionar evento
                  </button>
                  <button
                    type="button"
                    className={styles.actionButtonSecondary}
                    onClick={handleGoToCreateEvent}
                  >
                    <Plus size={16} />
                    Crear nuevo evento
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.formGroup}>
              <div className={styles.labelWithIcon}>
                <label>Cliente</label>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Info size={15} />
                  <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                    Puedes seleccionar un cliente ya existente o crear uno desde
                    cero. Ten en cuenta que si creas un cliente desde cero este
                    no se guardará en el sistema hasta que no guardes el
                    proyecto con los nuevos datos.
                  </div>
                </div>
              </div>
              {selectedClient ? (
                <div className={styles.selectedEventBadge}>
                  <span className={styles.eventText}>
                    <strong>{selectedClient.name}</strong> -{" "}
                    {selectedClient.email}
                  </span>
                  <button
                    type="button"
                    className={styles.removeEventBtn}
                    onClick={handleRemoveClient}
                    aria-label="Quitar cliente"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className={styles.inlineButtons}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => setShowClientModal(true)}
                  >
                    <MousePointerClick size={16} />
                    Seleccionar cliente
                  </button>
                  <button
                    type="button"
                    className={styles.actionButtonSecondary}
                    onClick={handleGoToCreateClient}
                  >
                    <Plus size={16} />
                    Crear nuevo cliente
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {errorMessages.length > 0 && (
          <div className={styles.errorSummary}>
            <strong>Se han detectado errores en el formulario:</strong>
            <ul>
              {errorMessages?.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              localStorage.removeItem(draftKey(id));
              localStorage.removeItem(tempEventKey(id));
              localStorage.removeItem(tempClientKey(id));
              if (project) {
                reset({
                  name: project.name || "",
                  description: project.description || "",
                  start_date:
                    formatDateToDatetimeLocal(project.start_date) || "",
                  end_date: formatDateToDatetimeLocal(project.end_date) || "",
                  project_type: project.project_type || "SERVICE",
                  cost_addition: project.cost_addition || 0,
                  event_id: project.event_id || null,
                  event: project.event || null,
                  status: project.status || "PLANNED",
                  payment_status: project.payment_status || "NO_BILL",
                  client: project.client || null,
                });
                handleSelectEvent(project.event || null);
                handleSelectClient(project.client || null);
              }
              showToast("Formulario reestablecido");
            }}
          >
            Reestablecer formulario
          </button>

          <button type="submit" className={styles.submitBtn}>
            Actualizar proyecto
          </button>
        </div>
      </form>

      {showEventModal && (
        <EventSelectorModal
          onClose={() => setShowEventModal(false)}
          onSelect={(event) => {
            selectEvent(event);
            setShowEventModal(false);
          }}
        />
      )}

      {showClientModal && (
        <ClientSelectorModal
          onClose={() => setShowClientModal(false)}
          onSelect={(client) => {
            selectClient(client);
            setShowClientModal(false);
          }}
        />
      )}
    </>
  );
};

export default UpdateProjectForm;
