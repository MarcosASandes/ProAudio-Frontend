import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import updateProjectValidator from "../../validators/projects/updateProjectValidator";
import useGetProjectById from "../../hooks/projects/useGetProjectById";
import useUpdateProject from "../../hooks/projects/useUpdateProject";
import {
  selectSelectedProject,
  selectProjectsLoading,
  selectProjectsError,
} from "../../features/projects/ProjectSelector";
import styles from "../../styles/projects/createProjectForm.module.css";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import EventSelectorModal from "../events/EventSelectorModal";

const getAllErrorMessages = (errors) => {
  const messages = [];

  if (errors.name) messages.push(errors.name.message);
  if (errors.description) messages.push(errors.description.message);
  if (errors.start_date) messages.push(errors.start_date.message);
  if (errors.end_date) messages.push(errors.end_date.message);
  if (errors.cost_addition) messages.push(errors.cost_addition.message);
  if (errors.payment_status) messages.push(errors.payment_status);
  if (errors.status) messages.push(errors.status);

  return messages;
};

const UpdateProjectForm = () => {
  const { id } = useParams();
  const savedUpdateDraft = JSON.parse(
    localStorage.getItem("projectDraftUpdate")
  );
  const navigate = useNavigate();
  const { fetchProjectById } = useGetProjectById();
  const { updateProject } = useUpdateProject();

  const project = useSelector(selectSelectedProject);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showEventModal, setShowEventModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  useEffect(() => {
    fetchProjectById(id);
  }, [id]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProjectValidator),
    defaultValues: savedUpdateDraft || {},
  });

  const errorMessages = getAllErrorMessages(errors);

  

  useEffect(() => {
    if (project) {
      const savedUpdateDraft = JSON.parse(
        localStorage.getItem("projectDraftUpdate")
      );
      if (!savedUpdateDraft) {
        Object.entries(project).forEach(([key, value]) => {
          setValue(key, value);
        });

        setSelectedEvent(project.event || null);
      }
    }
  }, [project, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("projectDraftUpdate", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleGoBack = () => {
    localStorage.removeItem("projectDraftUpdate");
    navigate("/");
  };

  useEffect(() => {
    const newEvent = JSON.parse(localStorage.getItem("temporaryProjectEvent"));
    if (newEvent) {
      setSelectedEvent(newEvent);
      setValue("event", newEvent);
      setValue("event_id", null);
      localStorage.removeItem("temporaryProjectEvent");
    }
  }, []);

  const handleGoToCreateEvent = () => {
    const currentData = getValues();
    try {
      const cleaned = JSON.parse(JSON.stringify(currentData));
      localStorage.setItem("projectDraftUpdate", JSON.stringify(cleaned));

      navigate("/events/create/embedded", {
        state: {
          from: "update-project",
          projectId: id,
        },
      });
    } catch (err) {
      console.error("No se pudo guardar el draft:", err.message);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      event_id: selectedEvent?.id || null,
      event: selectedEvent?.id ? null : selectedEvent,
    };

    await updateProject(id, payload);
    navigate("/");

    localStorage.removeItem("temporaryProjectEvent");
    localStorage.removeItem("projectDraftUpdate");
  };

  if (loading) return <p>Cargando proyecto...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!project) return null;

  return (
    <>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButtom.btnBackArrow}
          onClick={handleGoBack}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Modificar Proyecto</h2>
        <div className={styles.formGroup}>
          <label htmlFor="txtNameProject">Nombre del proyecto</label>
          <input
            id="txtNameProject"
            type="text"
            className="form-control"
            {...register("name")}
          />
          {/*errors.name && <p className={styles.error}>{errors.name.message}</p>*/}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="txtDescriptionProject">Descripción</label>
          <textarea
            id="txtDescriptionProject"
            rows="3"
            className={`form-control ${styles.textarea}`}
            {...register("description")}
          />
          {/*errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )*/}
        </div>

        <div className="row mt-1">
          <div className="col-md">
            <div className={styles.formGroup}>
              <label htmlFor="dateStartProject">Fecha de inicio</label>
              <input
                id="dateStartProject"
                type="date"
                className="form-control"
                {...register("start_date")}
              />
              {/*errors.start_date && (
                <p className={styles.error}>{errors.start_date.message}</p>
              )*/}
            </div>
          </div>
          <div className="col-md">
            <div className={styles.formGroup}>
              <label htmlFor="dateFinishProject">Fecha de fin</label>
              <input
                id="dateFinishProject"
                type="date"
                className="form-control"
                {...register("end_date")}
              />
              {/*errors.end_date && (
                <p className={styles.error}>{errors.end_date.message}</p>
              )*/}
            </div>
          </div>
          <div className="col-md">
            <div className={styles.formGroup}>
              <label htmlFor="slcProjectType">Tipo de proyecto</label>
              <select
                id="slcProjectType"
                className="form-control"
                {...register("project_type")}
              >
                <option value="SERVICE">Servicio</option>
                <option value="RENT">Renta</option>
              </select>
            </div>
          </div>
          <div className="col-md">
            <div className={styles.formGroup}>
              <label htmlFor="numCostAddition">Adición de costo (%)</label>
              <input
                id="numCostAddition"
                type="number"
                step="0.01"
                onWheel={(e) => e.target.blur()}
                className="form-control"
                {...register("cost_addition")}
              />
            </div>
          </div>
        </div>

        <div className="col-md">
          <div className={styles.formGroup}>
            <label htmlFor="slcStatus">Estado del proyecto</label>
            <select
              id="slcStatus"
              className="form-control"
              {...register("status")}
            >
              <option value="PLANNED">Planificado</option>
              <option value="IN_PROGRESS">En progreso</option>
              <option value="FINISHED">Finalizado</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="col-md">
          <div className={styles.formGroup}>
            <label htmlFor="slcPaymentStatus">Estado de pago</label>
            <select
              id="slcPaymentStatus"
              className="form-control"
              {...register("payment_status")}
            >
              <option value="NO_BILL">Sin facturar</option>
              <option value="BILLED">Facturado</option>
              <option value="PAID">Pagado</option>
            </select>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-md">
            <div className={styles.formGroup}>
              <label>Evento</label>
              {selectedEvent ? (
                <div className={styles.selectedEventBox}>
                  <p className="m-0">
                    <strong>{selectedEvent.name}</strong> -{" "}
                    {selectedEvent.address}
                  </p>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => {
                      setSelectedEvent(null);
                      setValue("event", null);
                      setValue("event_id", null);
                    }}
                  >
                    Quitar evento
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowEventModal(true)}
                  >
                    Seleccionar evento
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={handleGoToCreateEvent}
                  >
                    Crear nuevo evento
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-md">
            <div className={styles.formGroup}>
              <label>Cliente</label>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setShowClientModal(true)}
                >
                  Seleccionar cliente
                </button>
              </div>
            </div>
          </div>
        </div>

        {errorMessages.length > 0 && (
          <div className="alert alert-danger">
            <strong>Se han detectado errores en el formulario:</strong>
            <ul className="mb-0">
              {errorMessages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="row mt-4">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => {
                localStorage.removeItem("projectDraftUpdate");
                if (project) {
                  reset({
                    name: project.name || "",
                    description: project.description || "",
                    start_date: project.start_date || "",
                    end_date: project.end_date || "",
                    project_type: project.project_type || "SERVICE",
                    cost_addition: project.cost_addition || 0,
                    event_id: project.event_id || null,
                    event: project.event || null,
                    status: project.status || "PLANNED",
                    payment_status: project.payment_status || "NO_BILL",
                    client: project.client || null,
                  });
                  setSelectedEvent(project.event || null);
                }
                toast.info("Formulario reestablecido");
              }}
            >
              Reestablecer formulario
            </button>
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-success w-100">
              Actualizar proyecto
            </button>
          </div>
        </div>
      </form>

      {showEventModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccionar evento</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEventModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <EventSelectorModal
                  onSelect={(event) => {
                    setSelectedEvent(event);
                    setValue("event", event);
                    setValue("event_id", event.id);
                    setShowEventModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showClientModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccionar cliente</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowClientModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Hola</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProjectForm;
