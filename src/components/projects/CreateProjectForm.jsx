import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createProjectValidator from "../../validators/projects/createProjectValidator";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/projects/createProjectForm.module.css";
import { toast } from "react-toastify";
import ProductSelectorModal from "../products/ProductSelectorModal";
import { useRef } from "react";
import * as bootstrap from "bootstrap";
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import { ChevronRight, ChevronDown } from "lucide-react";
import EventSelectorModal from "../events/EventSelectorModal";
import useCreateProject from "../../hooks/projects/useCreateProject";
import useGetProjectTypes from "../../hooks/projects/useGetProjectTypes";
import useGetStartingProjectStatus from "../../hooks/projects/useGetStartingProjectStatus";
import { useSelector } from "react-redux";
import { selectProjectTypes } from "../../features/projects/ProjectSelector";
import { selectStartingProjectStatus } from "../../features/projects/ProjectSelector";
import { getStatusLabel } from "../../utils/startingProjectStatusLabel";
import useGetPricesByProductId from "../../hooks/products/useGetPricesByProductId";
import { selectProductPrices } from "../../features/products/ProductSelector";
import useGetExpenseTypes from "../../hooks/expenses/useGetExpensesTypes";
import { selectExpenseTypes } from "../../features/expenses/ExpenseSelector";

import ProductFieldItem from "./ProductFieldItem";

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

const getAllErrorMessages = (errors) => {
  const messages = [];

  if (errors.name) messages.push(errors.name.message);
  if (errors.description) messages.push(errors.description.message);
  if (errors.start_date) messages.push(errors.start_date.message);
  if (errors.end_date) messages.push(errors.end_date.message);
  if (errors.cost_addition) messages.push(errors.cost_addition.message);
  if (errors.products?.message) messages.push(errors.products.message);
  if (errors.expenses?.message) messages.push(errors.expenses.message);

  return messages;
};

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isExpensesOpen, setIsExpensesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const savedProjectDraft = getInitialProjectDraft();
  const modalRef = useRef(null);
  const modalInstance = useRef(null);
  const { projectCreation } = useCreateProject();

  const [productPrices, setProductPrices] = useState({});

  useGetProjectTypes();
  const projectTypes = useSelector(selectProjectTypes);

  useGetStartingProjectStatus();
  const startingStatuses = useSelector(selectStartingProjectStatus);

  useGetExpenseTypes();
  const expensesTypes = useSelector(selectExpenseTypes);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
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
          event: null,
          status: "PLANNED",
          payment_status: "BUDGETED",
          project_type: "SERVICE",
          cost_addition: 0,
          products: [],
          expenses: [],
        },
  });

  const errorMessages = getAllErrorMessages(errors);

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
    update: updateProduct,
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

  //const watchedProjectType = watch("project_type");
  const watchedForm = watch();
  const watchProducts = watch("products");

  useEffect(() => {
    localStorage.setItem("projectDraft", JSON.stringify(watchedForm));
    //console.log(watchedForm);
    console.log(JSON.parse(localStorage.getItem("projectDraft")));
  }, [watchedForm]);

  useEffect(() => {
    const tempEvent = localStorage.getItem("temporaryProjectEvent");

    if (tempEvent) {
      const parsedEvent = JSON.parse(tempEvent);
      setSelectedEvent(parsedEvent);
      setValue("event", parsedEvent); // para que ser refleje en el form
      localStorage.removeItem("temporaryProjectEvent");
    } else {
      // Si no viene del localStorage, lo tomamos del form draft (para F5)
      const eventFromForm = getValues("event");
      if (eventFromForm) {
        setSelectedEvent(eventFromForm);
      }
    }
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new bootstrap.Modal(modalRef.current, {
        backdrop: "static",
      });
    }
  }, []);

  useEffect(() => {
    if (showProductModal && modalInstance.current) {
      modalInstance.current.show();
    }
  }, [showProductModal]);

  const handleGoToCreateEvent = () => {
    const currentData = getValues();
    try {
      const cleaned = JSON.parse(JSON.stringify(currentData));
      localStorage.setItem("projectDraft", JSON.stringify(cleaned));
      navigate("/events/create/embedded", {
        state: { from: "create-project" },
      });
    } catch (err) {
      console.error("No se pudo guardar el draft:", err.message);
    }
  };

  //Temporal
  const formatearFechaConHora = (fecha) => {
    return fecha ? `${fecha}T00:00:00` : null;
  };

  const onSubmit = async (data) => {
    const cleanedProducts = data.products.map(
      ({ product_id, price_id, amount }) => ({
        product_id,
        price_id,
        amount,
      })
    );

    const payload = {
      ...data,
      start_date: formatearFechaConHora(data.start_date),
      end_date: formatearFechaConHora(data.end_date),
      products: cleanedProducts,
    };

    const result = await projectCreation(payload);
    if (result) {
      localStorage.removeItem("projectDraft");
      reset({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "PLANNED",
        payment_status: "BUDGETED",
        project_type: "SERVICE",
        cost_addition: 0,
        products: [],
        expenses: [],
        event: null,
      });
      setSelectedEvent(null);
      navigate("/");
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("projectDraft");
    navigate("/");
  };

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
        <h2 className={styles.title}>Crear Proyecto</h2>

        <div className={styles.formGroup}>
          <label htmlFor="txtNameProject">Nombre del proyecto</label>
          <input
            id="txtNameProject"
            type="text"
            className="form-control"
            {...register("name")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="txtDescriptionProject">Descripción</label>
          <textarea
            id="txtDescriptionProject"
            rows="3"
            className={`form-control ${styles.textarea}`}
            {...register("description")}
          />
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
                <option value="">Seleccionar tipo</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "SERVICE"
                      ? "Servicio"
                      : type === "RENT"
                      ? "Renta"
                      : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md">
            <div className={styles.formGroup}>
              <label htmlFor="numCostAddition">Porcentaje de cobro (%)</label>
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

        <div className="row mt-1">
          <div className="col-md">
            <div className={styles.formGroup}>
              <label htmlFor="status" className="form-label">
                Estado del proyecto
              </label>

              <select
                id="status"
                className="form-control"
                {...register("status")}
              >
                <option value="">Seleccionar estado</option>
                {startingStatuses.map((status) => (
                  <option key={status} value={status}>
                    {getStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/*<div className="col-md">
            <div className={styles.formGroup}>
              <label htmlFor="payment_status" className="form-label">
                Estado de pago
              </label>
              <select
                id="payment_status"
                className="form-control"
                {...register("payment_status")}
              >
                <option value="BUDGETED">Presupuestado</option>
                <option value="PARTIALLY_PAID">Parcialmente pago</option>
                <option value="BILL_CREATED">Factura creada</option>
                <option value="PAID">Pagado</option>
              </select>
            </div>
          </div>*/}
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

        <div className="mb-3">
          <button
            className={`w-100 text-start d-flex justify-content-between align-items-center ${styles.collapseButton}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseProducts"
            aria-expanded={isProductsOpen}
            aria-controls="collapseProducts"
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            <span>Productos</span>
            {isProductsOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          <div
            className={`collapse mt-2 ${styles.collapseBody}`}
            id="collapseProducts"
          >
            {productFields.map((field, index) => (
              <ProductFieldItem
                key={field.id}
                index={index}
                field={field}
                register={register}
                getValues={getValues}
                watch={watch}
                setCurrentProductIndex={setCurrentProductIndex}
                setShowProductModal={setShowProductModal}
                removeProduct={removeProduct}
              />
            ))}

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() =>
                appendProduct({
                  product_id: "",
                  price_id: "",
                  amount: "",
                  product_label: "",
                })
              }
            >
              Agregar producto
            </button>
          </div>
        </div>

        <div className="mb-3">
          <button
            className={`w-100 text-start d-flex justify-content-between align-items-center ${styles.collapseButton}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExpenses"
            aria-expanded={isExpensesOpen}
            aria-controls="collapseExpenses"
            onClick={() => setIsExpensesOpen(!isExpensesOpen)}
          >
            <span>Gastos extra</span>
            {isExpensesOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
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
                    <option value="">Seleccionar tipo de gasto</option>
                    {expensesTypes.map((expType) => (
                      <option key={expType} value={expType}>
                        {expType === "PERSONNEL"
                          ? "Personal"
                          : expType === "EXTRA_COST"
                          ? "Otros"
                          : expType}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label text-light">Valor</label>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
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
                reset({
                  name: "",
                  description: "",
                  start_date: "",
                  end_date: "",
                  status: "PLANNED",
                  payment_status: "PAID",
                  project_type: "SERVICE",
                  cost_addition: 0,
                  products: [],
                  expenses: [],
                  event: null,
                });
                setSelectedEvent(null);
                localStorage.removeItem("projectDraft");
              }}
            >
              Limpiar formulario
            </button>
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-success w-100">
              Crear proyecto
            </button>
          </div>
        </div>
      </form>

      {showProductModal && (
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
                <h5 className="modal-title">Seleccionar producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProductModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <ProductSelectorModal
                  onSelect={(product) => {
                    setValue(
                      `products.${currentProductIndex}.product_id`,
                      product.id
                    );
                    setValue(
                      `products.${currentProductIndex}.product_label`,
                      `${product.brand} ${product.model}`
                    );
                    setShowProductModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
                    setValue("event", {
                      event_id: event.event_id,
                      name: event.name,
                      address: event.address,
                      distance: event.distance,
                      description: event.description,
                    });
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

export default CreateProjectForm;
