import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createProjectValidator from "../../validators/projects/createProjectValidator";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/projects/createProjectForm.module.css";
import { toast } from "react-toastify";

const getInitialProjectDraft = () => {
  const raw = localStorage.getItem("projectDraft");
  try {
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("projectDraft corrupto o inválido:", raw);
    localStorage.removeItem("projectDraft");
    return null;
  }
};

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const savedProjectDraft = getInitialProjectDraft();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProjectValidator),
    defaultValues: savedProjectDraft
      ? savedProjectDraft
      : {
          name: "",
          description: "",
          start_date: "",
          end_date: "",
          status: "PLANNED",
          payment_status: "NO_BILL",
          project_type: "service",
          cost_addition: 0,
          products: [],
          expenses: [],
          event_id: null,
          event: null,
        },
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  const {
    fields: expenseFields,
    append: appendExpense,
    remove: removeExpense,
  } = useFieldArray({
    control,
    name: "expenses",
  });

  useEffect(() => {
    const tempEvent = localStorage.getItem("temporaryProjectEvent");
    if (tempEvent) {
      setSelectedEvent(JSON.parse(tempEvent));
      localStorage.removeItem("temporaryProjectEvent");
    }
  }, []);

  const handleGoToCreateEvent = () => {
    const currentData = getValues();
    try {
      const cleaned = JSON.parse(JSON.stringify(currentData)); // limpia undefined, funciones, etc
      localStorage.setItem("projectDraft", JSON.stringify(cleaned));
      navigate("/events/create/embedded");
    } catch (err) {
      console.error("No se pudo guardar el draft:", err.message);
    }
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      event_id: selectedEvent?.id || null,
      event: selectedEvent?.id ? null : selectedEvent,
    };

    console.log("Payload del proyecto:", payload);
    toast.success("Proyecto preparado para enviar (falta implementar API)");
    localStorage.removeItem("projectDraft");
    // TODO: crearProject(payload)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Crear Proyecto</h2>

      <div className={styles.formGroup}>
        <label>Nombre del proyecto</label>
        <input type="text" className="form-control" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Descripción</label>
        <textarea
          rows="3"
          className="form-control"
          {...register("description")}
        />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Fecha inicio</label>
        <input
          type="date"
          className="form-control"
          {...register("start_date")}
        />
        {errors.start_date && (
          <p className={styles.error}>{errors.start_date.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Fecha fin</label>
        <input
          type="date"
          className="form-control"
          {...register("end_date")}
        />
        {errors.end_date && (
          <p className={styles.error}>{errors.end_date.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Estado</label>
        <select className="form-control" {...register("status")}>
          <option value="PLANNED">Planificado</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="FINISHED">Finalizado</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Estado de pago</label>
        <select className="form-control" {...register("payment_status")}>
          <option value="NO_BILL">Sin factura</option>
          <option value="PAID">Pagado</option>
          <option value="PENDING">Pendiente</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Tipo de proyecto</label>
        <select className="form-control" {...register("project_type")}>
          <option value="service">Servicio</option>
          <option value="rental">Alquiler</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Adición de costo (%)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          {...register("cost_addition")}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Evento asociado</label>
        {selectedEvent ? (
          <div className={styles.selectedEventBox}>
            <p className="m-0">
              <strong>{selectedEvent.name}</strong> - {selectedEvent.address}
            </p>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={() => setSelectedEvent(null)}
            >
              Quitar evento
            </button>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() =>
                alert("Abrir modal para seleccionar evento (pendiente)")
              }
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

      <div className="mb-3">
        <button
          className={`w-100 text-start ${styles.collapseButton}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseProducts"
          aria-expanded="false"
          aria-controls="collapseProducts"
        >
          Productos
        </button>

        <div
          className={`collapse mt-2 ${styles.collapseBody}`}
          id="collapseProducts"
        >
          {productFields.map((field, index) => (
            <div
              key={field.id}
              className="border p-3 mb-2 rounded bg-secondary bg-opacity-10"
            >
              <div className="mb-2">
                <label className="form-label text-light">ID del producto</label>
                <input
                  type="number"
                  className="form-control"
                  {...register(`products.${index}.product_id`)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label text-light">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  {...register(`products.${index}.amount`)}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeProduct(index)}
              >
                Eliminar producto
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => appendProduct({ product_id: "", amount: "" })}
          >
            Agregar producto
          </button>

          {errors.products && (
            <div className="text-danger mt-1">{errors.products.message}</div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <button
          className={`w-100 text-start ${styles.collapseButton}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExpenses"
          aria-expanded="false"
          aria-controls="collapseExpenses"
        >
          Gastos
        </button>

        <div
          className={`collapse mt-2 ${styles.collapseBody}`}
          id="collapseExpenses"
        >
          {expenseFields.map((field, index) => (
            <div
              key={field.id}
              className="border p-3 mb-2 rounded bg-secondary bg-opacity-10"
            >
              <div className="mb-2">
                <label className="form-label text-light">Tipo</label>
                <select
                  className="form-select"
                  {...register(`expenses.${index}.type`)}
                >
                  <option value="PERSONNEL">Personal</option>
                  <option value="EQUIPMENT">Equipamiento</option>
                  <option value="TRANSPORT">Transporte</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label text-light">Valor</label>
                <input
                  type="number"
                  className="form-control"
                  {...register(`expenses.${index}.value`)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label text-light">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  {...register(`expenses.${index}.description`)}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeExpense(index)}
              >
                Eliminar gasto
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              appendExpense({ type: "PERSONNEL", value: "", description: "" })
            }
          >
            Agregar gasto
          </button>

          {errors.expenses && (
            <div className="text-danger mt-1">{errors.expenses.message}</div>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-success mt-4">
        Crear proyecto
      </button>
    </form>
  );
};

export default CreateProjectForm;
