/*import React, { useEffect, useState } from "react";
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
import useGetPricesByProductId from "../../hooks/products/useGetPricesByProductId";
import { selectProductPrices } from "../../features/products/ProductSelector";
import useGetExpenseTypes from "../../hooks/expenses/useGetExpensesTypes";
import { selectExpenseTypes } from "../../features/expenses/ExpenseSelector";
import ProductFieldItem from "./ProductFieldItem";
import {
  getProjectTypeLabel,
  getProjectStatusLabel,
  getExpensesTypesLabel,
} from "../../utils/getLabels";
import { getCreateProjectFormErrorMessages } from "../../utils/getErrorsMessages";
import ClientSelectorModal from "../clients/ClientSelectorModal ";

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
  const [selectedClient, setSelectedClient] = useState(null); //agregado para cliente
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
          client: null,
          status: "PLANNED",
          payment_status: "BUDGETED",
          project_type: "SERVICE",
          cost_addition: 100,
          products: [],
          expenses: [],
        },
  });

  const errorMessages = getCreateProjectFormErrorMessages(errors);

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
    const tempClient = localStorage.getItem("temporaryProjectClient");

    if (tempClient) {
      const parsedClient = JSON.parse(tempClient);
      setSelectedClient(parsedClient);
      setValue("client", parsedClient); // para que ser refleje en el form
      localStorage.removeItem("temporaryProjectClient");
    } else {
      // Si no viene del localStorage, lo tomamos del form draft (para F5)
      const clientFromForm = getValues("client");
      if (clientFromForm) {
        setSelectedClient(clientFromForm);
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

  const handleGoToCreateClient = () => {
    const currentData = getValues();
    try {
      const cleaned = JSON.parse(JSON.stringify(currentData));
      localStorage.setItem("projectDraft", JSON.stringify(cleaned));
      navigate("/clients/create/embedded", {
        state: { from: "create-project" },
      });
    } catch (err) {
      console.error("No se pudo guardar el draft:", err.message);
    }
  };

  //ToDo: Eliminarlo y poner los inputs directamente con horas
  const formatearFechaConHora = (fecha) => {
    return fecha ? `${fecha}T00:00:00` : null;
  };

  const onSubmit = async (data) => {
    const cleanedProducts = data?.products?.map(
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
        cost_addition: 100,
        products: [],
        expenses: [],
        event: null,
        client: null,
      });
      setSelectedEvent(null);
      setSelectedClient(null);
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
                {projectTypes?.map((type) => (
                  <option key={type} value={type}>
                    {getProjectTypeLabel(type)}
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
                {startingStatuses?.map((status) => (
                  <option key={status} value={status}>
                    {getProjectStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
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
              {selectedClient ? (
                <div className={styles.selectedEventBox}>
                  <p className="m-0">
                    <strong>{selectedClient.name}</strong> -{" "}
                    {selectedClient.email}
                  </p>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => {
                      setSelectedClient(null);
                      setValue("client", null);
                    }}
                  >
                    Quitar cliente
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowClientModal(true)}
                  >
                    Seleccionar cliente
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={handleGoToCreateClient}
                  >
                    Crear nuevo cliente
                  </button>
                </div>
              )}
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
            {productFields?.map((field, index) => (
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
            {expenseFields?.map((field, index) => (
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
                    {expensesTypes?.map((expType) => (
                      <option key={expType} value={expType}>
                        {getExpensesTypesLabel(expType)}
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
              {errorMessages?.map((msg, idx) => (
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
                  cost_addition: 100,
                  products: [],
                  expenses: [],
                  event: null,
                  client: null,
                });
                setSelectedEvent(null);
                setSelectedClient(null);
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
        <EventSelectorModal
          onClose={() => setShowEventModal(false)}
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
      )}

      {showClientModal && (
        <ClientSelectorModal
          onClose={() => setShowClientModal(false)}
          onSelect={(client) => {
            setSelectedClient(client);
            setValue("client", {
              client_id: client.client_id,
              name: client.name,
              email: client.email,
              phone_number: client.phone_number,
            });
            setShowClientModal(false);
          }}
        />
      )}
    </>
  );
};

export default CreateProjectForm;*/

/*---------------------------------------------------- */

/*import React, { useEffect, useState } from "react";
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
import useGetPricesByProductId from "../../hooks/products/useGetPricesByProductId";
import { selectProductPrices } from "../../features/products/ProductSelector";
import useGetExpenseTypes from "../../hooks/expenses/useGetExpensesTypes";
import { selectExpenseTypes } from "../../features/expenses/ExpenseSelector";
import ProductFieldItem from "./ProductFieldItem";
import {
  getProjectTypeLabel,
  getProjectStatusLabel,
  getExpensesTypesLabel,
} from "../../utils/getLabels";
import { getCreateProjectFormErrorMessages } from "../../utils/getErrorsMessages";
import ClientSelectorModal from "../clients/ClientSelectorModal ";
import BackButton from "../global/BackButton";

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
  const [selectedClient, setSelectedClient] = useState(null); //agregado para cliente
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
          client: null,
          status: "PLANNED",
          payment_status: "BUDGETED",
          project_type: "SERVICE",
          cost_addition: 100,
          products: [],
          expenses: [],
        },
  });

  const errorMessages = getCreateProjectFormErrorMessages(errors);

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
    const tempClient = localStorage.getItem("temporaryProjectClient");

    if (tempClient) {
      const parsedClient = JSON.parse(tempClient);
      setSelectedClient(parsedClient);
      setValue("client", parsedClient); // para que ser refleje en el form
      localStorage.removeItem("temporaryProjectClient");
    } else {
      // Si no viene del localStorage, lo tomamos del form draft (para F5)
      const clientFromForm = getValues("client");
      if (clientFromForm) {
        setSelectedClient(clientFromForm);
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

  const handleGoToCreateClient = () => {
    const currentData = getValues();
    try {
      const cleaned = JSON.parse(JSON.stringify(currentData));
      localStorage.setItem("projectDraft", JSON.stringify(cleaned));
      navigate("/clients/create/embedded", {
        state: { from: "create-project" },
      });
    } catch (err) {
      console.error("No se pudo guardar el draft:", err.message);
    }
  };

  //ToDo: Eliminarlo y poner los inputs directamente con horas
  const formatearFechaConHora = (fecha) => {
    return fecha ? `${fecha}T00:00:00` : null;
  };

  const onSubmit = async (data) => {
    const cleanedProducts = data?.products?.map(
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
        cost_addition: 100,
        products: [],
        expenses: [],
        event: null,
        client: null,
      });
      setSelectedEvent(null);
      setSelectedClient(null);
      navigate("/");
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("projectDraft");
    return "/";
  };

  return (
    <>
      <BackButton target={handleGoBack()} />
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
                {projectTypes?.map((type) => (
                  <option key={type} value={type}>
                    {getProjectTypeLabel(type)}
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
                {startingStatuses?.map((status) => (
                  <option key={status} value={status}>
                    {getProjectStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
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
              {selectedClient ? (
                <div className={styles.selectedEventBox}>
                  <p className="m-0">
                    <strong>{selectedClient.name}</strong> -{" "}
                    {selectedClient.email}
                  </p>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => {
                      setSelectedClient(null);
                      setValue("client", null);
                    }}
                  >
                    Quitar cliente
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowClientModal(true)}
                  >
                    Seleccionar cliente
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={handleGoToCreateClient}
                  >
                    Crear nuevo cliente
                  </button>
                </div>
              )}
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
            {productFields?.map((field, index) => (
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
            {expenseFields?.map((field, index) => (
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
                    {expensesTypes?.map((expType) => (
                      <option key={expType} value={expType}>
                        {getExpensesTypesLabel(expType)}
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
              {errorMessages?.map((msg, idx) => (
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
                  cost_addition: 100,
                  products: [],
                  expenses: [],
                  event: null,
                  client: null,
                });
                setSelectedEvent(null);
                setSelectedClient(null);
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
        <ProductSelectorModal
          onClose={() => setShowProductModal(false)}
          onSelect={(product) => {
            setValue(`products.${currentProductIndex}.product_id`, product.id);
            setValue(
              `products.${currentProductIndex}.product_label`,
              `${product.brand} ${product.model}`
            );
            setShowProductModal(false);
          }}
        />
      )}

      {showEventModal && (
        <EventSelectorModal
          onClose={() => setShowEventModal(false)}
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
      )}

      {showClientModal && (
        <ClientSelectorModal
          onClose={() => setShowClientModal(false)}
          onSelect={(client) => {
            setSelectedClient(client);
            setValue("client", {
              client_id: client.client_id,
              name: client.name,
              email: client.email,
              phone_number: client.phone_number,
            });
            setShowClientModal(false);
          }}
        />
      )}
    </>
  );
};

export default CreateProjectForm;*/

/*------------------------------------------------ */

import React, { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createProjectValidator from "../../validators/projects/createProjectValidator";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/projects/createProjectForm.module.css";
import { toast } from "react-toastify";
import ProductSelectorModal from "../products/ProductSelectorModal";
import * as bootstrap from "bootstrap";
import {
  Plus,
  MousePointerClick,
  ChevronRight,
  ChevronDown,
  X,
  Info,
} from "lucide-react";
import EventSelectorModal from "../events/EventSelectorModal";
import useCreateProject from "../../hooks/projects/useCreateProject";
import useGetProjectTypes from "../../hooks/projects/useGetProjectTypes";
import useGetStartingProjectStatus from "../../hooks/projects/useGetStartingProjectStatus";
import { useSelector } from "react-redux";
import {
  selectProjectTypes,
  selectStartingProjectStatus,
} from "../../features/projects/ProjectSelector";
import useGetExpenseTypes from "../../hooks/expenses/useGetExpensesTypes";
import { selectExpenseTypes } from "../../features/expenses/ExpenseSelector";
import ProductFieldItem from "./ProductFieldItem";
import {
  getProjectTypeLabel,
  getProjectStatusLabel,
  getExpensesTypesLabel,
} from "../../utils/getLabels";
import { getCreateProjectFormErrorMessages } from "../../utils/getErrorsMessages";
import ClientSelectorModal from "../clients/ClientSelectorModal ";
import BackButton from "../global/BackButton";

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
  const [selectedClient, setSelectedClient] = useState(null);
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
          client: null,
          status: "PLANNED",
          payment_status: "BUDGETED",
          project_type: "SERVICE",
          cost_addition: 100,
          products: [],
          expenses: [],
        },
  });

  const errorMessages = getCreateProjectFormErrorMessages(errors);

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

  const watchedForm = watch();

  useEffect(() => {
    localStorage.setItem("projectDraft", JSON.stringify(watchedForm));
  }, [watchedForm]);

  useEffect(() => {
    const tempEvent = localStorage.getItem("temporaryProjectEvent");
    if (tempEvent) {
      const parsedEvent = JSON.parse(tempEvent);
      setSelectedEvent(parsedEvent);
      setValue("event", parsedEvent);
      localStorage.removeItem("temporaryProjectEvent");
    } else {
      const eventFromForm = getValues("event");
      if (eventFromForm) setSelectedEvent(eventFromForm);
    }
  }, []);

  useEffect(() => {
    const tempClient = localStorage.getItem("temporaryProjectClient");
    console.log("Este es el cliente del localStorage: ", tempClient);
    if (tempClient) {
      const parsedClient = JSON.parse(tempClient);
      setSelectedClient(parsedClient);
      setValue("client", parsedClient);
      localStorage.removeItem("temporaryProjectClient");
    } else {
      const clientFromForm = getValues("client");
      if (clientFromForm) setSelectedClient(clientFromForm);
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

  const handleGoToCreateClient = () => {
    const currentData = getValues();
    try {
      const cleaned = JSON.parse(JSON.stringify(currentData));
      localStorage.setItem("projectDraft", JSON.stringify(cleaned));
      navigate("/clients/create/embedded", {
        state: { from: "create-project" },
      });
    } catch (err) {
      console.error("No se pudo guardar el draft:", err.message);
    }
  };

  /*const formatearFechaConHora = (fecha) => {
    return fecha ? `${fecha}T00:00:00` : null;
  };*/

  const onSubmit = async (data) => {
    console.log("Datos que se van a enviar:", data);
    const cleanedProducts = data?.products?.map(
      ({ product_id, price_id, amount }) => ({
        product_id,
        price_id,
        amount,
      })
    );

    /*const payload = {
      ...data,
      start_date: data.start_date,
      end_date: data.end_date,
      products: cleanedProducts,
    };*/

    const clientForBackend = data.client
      ? {
          ...data.client,
          phone_number: data.client.phone,
        }
      : null;

  
    const payload = {
      ...data,
      client: clientForBackend,
      start_date: data.start_date,
      end_date: data.end_date,
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
        cost_addition: 100,
        products: [],
        expenses: [],
        event: null,
        client: null,
      });
      setSelectedEvent(null);
      setSelectedClient(null);
      navigate("/");
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("projectDraft");
    return "/";
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <BackButton target={handleGoBack()} />
        <h2 className={styles.title}>Crear Proyecto</h2>

        {/* Nombre */}
        <div className={styles.formGroup}>
          <label htmlFor="txtNameProject">Nombre del proyecto</label>
          <input
            id="txtNameProject"
            type="text"
            className={styles.input}
            {...register("name")}
          />
        </div>

        {/* Descripción */}
        <div className={styles.formGroup}>
          <label htmlFor="txtDescriptionProject">Descripción</label>
          <textarea
            id="txtDescriptionProject"
            rows="3"
            className={`${styles.textarea}`}
            {...register("description")}
          />
        </div>

        {/* Fila de datos */}
        <div className={styles.row}>
          <div className={styles.sameRow}>
            <div className={styles.col}>
              <div className={styles.formGroup}>
                <label htmlFor="dateStartProject">Fecha de inicio</label>
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
                <label htmlFor="dateFinishProject">Fecha de fin</label>
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
                <label htmlFor="slcProjectType">Tipo de proyecto</label>
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

            {/* Estado */}
            <div className={styles.col}>
              <div className={styles.formGroup}>
                <label htmlFor="status">Estado del proyecto</label>
                <select
                  id="status"
                  className={styles.select}
                  {...register("status")}
                >
                  <option value="">Seleccionar estado</option>
                  {startingStatuses?.map((status) => (
                    <option key={status} value={status}>
                      {getProjectStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.col}>
              <div className={styles.formGroup}>
                <div className={styles.labelWithIcon}>
                  <label htmlFor="numCostAddition">
                    Porcentaje de cobro (%)
                  </label>
                  <div className={styles.infoIconWrap} aria-hidden="true">
                    <Info size={15} />
                    <div className={`${styles.tooltip} ${styles.tooltipLeft}`}>
                      Representa qué porcentaje se cobrará del presupuesto total
                      del proyecto.
                    </div>
                  </div>
                </div>

                {/*<label htmlFor="numCostAddition">Porcentaje de cobro (%)</label>*/}
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
                    no se guardará en el sistema si no creas el proyecto.
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
                    onClick={() => {
                      setSelectedEvent(null);
                      setValue("event", null);
                    }}
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
                    no se guardará en el sistema si no creas el proyecto.
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
                    onClick={() => {
                      setSelectedClient(null);
                      setValue("client", null);
                    }}
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

        {/* Productos */}
        <div className={styles.collapseSection}>
          <button
            className={styles.collapseButton}
            type="button"
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            <div className={styles.labelWithIcon}>
              <span>Productos</span>
              <div className={styles.infoIconWrap} aria-hidden="true">
                <Info size={15} />
                <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                  Puedes agregar todos los productos que necesitas para el
                  proyecto. No olvides que debes seleccionar el precio que
                  cobrarás en cada uno también.
                </div>
              </div>
            </div>
            {isProductsOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {isProductsOpen && (
            <div className={styles.collapseBody}>
              {productFields?.map((field, index) => (
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
                  className={styles.productItem}
                />
              ))}

              <button
                type="button"
                className={styles.addButton}
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
          )}
        </div>

        {/* Gastos extra */}
        <div className={styles.collapseSection}>
          <button
            className={styles.collapseButton}
            type="button"
            onClick={() => setIsExpensesOpen(!isExpensesOpen)}
          >
            <div className={styles.labelWithIcon}>
              <span>Gastos extra</span>
              <div className={styles.infoIconWrap} aria-hidden="true">
                <Info size={15} />
                <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                  Puedes agregar todos los gastos extra que necesites. Ejemplo:
                  Pago a personal, viaje, etc.
                </div>
              </div>
            </div>
            {isExpensesOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {isExpensesOpen && (
            <div className={styles.collapseBody}>
              {expenseFields?.map((field, index) => (
                <div key={field.id} className={styles.expenseItem}>
                  <div className={styles.formGroup}>
                    <label>Tipo</label>
                    <select
                      className={styles.select}
                      {...register(`expenses.${index}.type`)}
                    >
                      <option value="">Seleccionar tipo de gasto</option>
                      {expensesTypes?.map((expType) => (
                        <option key={expType} value={expType}>
                          {getExpensesTypesLabel(expType)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Valor</label>
                    <input
                      type="number"
                      className={styles.input}
                      {...register(`expenses.${index}.value`)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Descripción</label>
                    <input
                      type="text"
                      className={styles.input}
                      {...register(`expenses.${index}.description`)}
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeExpense(index)}
                  >
                    Eliminar gasto
                  </button>
                </div>
              ))}

              <button
                type="button"
                className={styles.addButton}
                onClick={() =>
                  appendExpense({
                    type: "PERSONNEL",
                    value: "",
                    description: "",
                  })
                }
              >
                Agregar gasto
              </button>
            </div>
          )}
        </div>

        {/* Errores */}
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

        {/* Botones finales */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              reset({
                name: "",
                description: "",
                start_date: "",
                end_date: "",
                status: "",
                payment_status: "BUDGETED",
                project_type: "",
                cost_addition: 100,
                products: [],
                expenses: [],
                event: null,
                client: null,
              });
              setSelectedEvent(null);
              setSelectedClient(null);
              localStorage.removeItem("projectDraft");
            }}
          >
            Limpiar formulario
          </button>
          <button type="submit" className={styles.submitBtn}>
            Crear proyecto
          </button>
        </div>
      </form>

      {showProductModal && (
        <ProductSelectorModal
          onClose={() => setShowProductModal(false)}
          onSelect={(product) => {
            setValue(`products.${currentProductIndex}.product_id`, product.id);
            setValue(
              `products.${currentProductIndex}.product_label`,
              `${product.brand ? product.brand : ""} ${product.model}`
            );
            setShowProductModal(false);
          }}
        />
      )}

      {showEventModal && (
        <EventSelectorModal
          onClose={() => setShowEventModal(false)}
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
      )}

      {showClientModal && (
        <ClientSelectorModal
          onClose={() => setShowClientModal(false)}
          /*onSelect={(client) => {
            setSelectedClient(client);
            setValue("client", {
              // cliente nuevo, sin client_id
              name: client.name,
              email: client.email,
              phone: client.phone_number, // <-- cambiar a "phone"
              address: client.address,
              details: client.details || "",
            });
            setShowClientModal(false);
          }}*/

          onSelect={(client) => {
            console.log("Cliente recibido del modal:", client); // <--- Aquí
            setSelectedClient(client);

            setValue("client", {
              name: client.name,
              email: client.email,
              phone: client.phone_number,
              address: client.address,
              details: client.details || "",
            });

            console.log("Cliente seteado en el form:", getValues("client")); // <--- Aquí
            setShowClientModal(false);
          }}
        />
      )}
    </>
  );
};

export default CreateProjectForm;
