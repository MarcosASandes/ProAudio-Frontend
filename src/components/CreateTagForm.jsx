/*import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../validators/tagValidator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateTag } from "../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TagForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tagSchema),
  });

  const createTag = useCreateTag();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    createTag(formData, () => {
      reset();
      toast.success("Etiqueta creada con éxito 🎉");
      setTimeout(() => {
        navigate("/tags");
      }, 2000);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            {...register("description")}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Crear etiqueta
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}*/

/* - - - - */

/*import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../validators/tagValidator";
import { ToastContainer, toast } from "react-toastify";
import { useCreateTag } from "../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import TagsTree from "../components/TagsTree";
import "react-toastify/dist/ReactToastify.css";
import * as bootstrap from "bootstrap";

export default function TagForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tagSchema),
  });

  const createTag = useCreateTag();
  const navigate = useNavigate();


  const [fatherId, setFatherId] = useState(null);
  const [fatherName, setFatherName] = useState(null);
  const modalRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);

  const showModal = () => {
    const modal = new bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleAcceptFather = () => {
    if (selectedTag) {
      setFatherId(selectedTag.tag_id);
      setFatherName(selectedTag.name);
      const modal = bootstrap.Modal.getInstance(modalRef.current);
      modal.hide();
    }
  };

  

  const onSubmit = (formData) => {
    const dataToSend = {
      ...formData,
      fatherId,
    };
    createTag(dataToSend, () => {
      reset();
      toast.success("Etiqueta creada con éxito 🎉");
      setTimeout(() => {
        navigate("/tags");
      }, 2000);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            {...register("description")}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Etiqueta padre</label>
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={showModal}
            >
              Seleccionar etiqueta base
            </button>
            {fatherName && (
              <span className="text-muted">Seleccionada: {fatherName}</span>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear etiqueta
        </button>
      </form>


      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Seleccionar etiqueta base</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <TagsTree
                onTagSelected={setSelectedTag}
                selectionOnly
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                disabled={!selectedTag}
                onClick={handleAcceptFather}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}*/

/* - - - -  */

/*import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../validators/tagValidator";
import { ToastContainer, toast } from "react-toastify";
import { useCreateTag } from "../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import TagsTreeModal from "../components/TagsTreeModal"; // ← Nuevo componente
import "react-toastify/dist/ReactToastify.css";
import * as bootstrap from "bootstrap";
import { selectTags } from "../features/tags/TagSelector";
import { useSelector } from "react-redux";

export default function CreateTagForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tagSchema),
  });

  const createTag = useCreateTag();
  const navigate = useNavigate();
  useGetAllTags(); // ← Obtener etiquetas para el árbol

  const tags = useSelector(selectTags);

  // Estado para father_id
  const [fatherId, setFatherId] = useState(null);
  const [fatherName, setFatherName] = useState(null);
  const modalRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);

  const showModal = () => {
    const modal = new bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleAcceptFather = () => {
    if (selectedTag) {
      setFatherId(selectedTag.tag_id);
      setFatherName(selectedTag.name);
      const modal = bootstrap.Modal.getInstance(modalRef.current);
      modal.hide();
    }
  };

  const onSubmit = (formData) => {
    const dataToSend = {
      ...formData,
      fatherId,
    };

    createTag(dataToSend, () => {
      reset();
      toast.success("Etiqueta creada con éxito 🎉");
      setTimeout(() => {
        navigate("/tags");
      }, 2000);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            {...register("description")}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Etiqueta padre</label>
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={showModal}
            >
              Seleccionar etiqueta base
            </button>
            {fatherName && (
              <span className="text-muted">Seleccionada: {fatherName}</span>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear etiqueta
        </button>
      </form>

      
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Seleccionar etiqueta base</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              {Array.isArray(tags) && tags.length > 0 ? (
                <TagsTreeModal tags={tags} onSelect={setSelectedTag} />
              ) : (
                <div className="text-muted">Cargando etiquetas...</div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                disabled={!selectedTag}
                onClick={handleAcceptFather}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}*/

/*- - - - -*/

/*
ORIGINAL FUNCIONA MODAL
import TagSelectorModal from "./TagSelectorModal";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../validators/tagValidator";
import { ToastContainer, toast } from "react-toastify";
import { useCreateTag } from "../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import TagsTreeModal from "../components/TagsTreeModal"; // ← Nuevo componente
import "react-toastify/dist/ReactToastify.css";
import * as bootstrap from "bootstrap";
import { selectTags } from "../features/tags/TagSelector";
import { useSelector } from "react-redux";

export default function CreateTagForm() {
  const [fatherTag, setFatherTag] = useState(null);

  const handleFatherSelected = (tag) => {
    setFatherTag(tag);
  };

  const showModal = () => {
    const modal = new bootstrap.Modal(document.getElementById("tagSelectorModal"));
    modal.show();
  };

  return (
    <>
      

      <div className="mb-3">
        <label className="form-label">Etiqueta padre</label>
        <div className="d-flex align-items-center gap-3">
          <button type="button" className="btn btn-secondary" onClick={showModal}>
            Seleccionar etiqueta base
          </button>
          {fatherTag && <span>Seleccionada: {fatherTag.name}</span>}
        </div>
      </div>

      

      <TagSelectorModal
        tags={useSelector(selectTags)}
        onSelect={handleFatherSelected}
      />
    </>
  );
}*/

/* - - -- - - - - - --  */

import TagSelectorModal from "./TagSelectorModal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../validators/tagValidator";
import { ToastContainer, toast } from "react-toastify";
import { useCreateTag } from "../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTags } from "../features/tags/TagSelector";
import * as bootstrap from "bootstrap";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import { ArrowLeft } from "lucide-react";

export default function CreateTagForm() {
  useGetAllTags(); //Esto es para que si le damos F5 sin querer las etiquetas sigan apareciendo.
  const tags = useSelector(selectTags);
  const [fatherTag, setFatherTag] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tagSchema),
  });

  const createTag = useCreateTag();
  const navigate = useNavigate();

  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  // Actualizar el valor father_id en el formulario cuando cambie fatherTag
  useEffect(() => {
    setValue("father_id", fatherTag ? fatherTag.tag_id : null);
  }, [fatherTag, setValue]);

  const onSubmit = (data) => {
    const dataToSend = {
      ...data,
    };

    console.log(dataToSend);
    createTag(dataToSend, () => {
      reset();
      toast.success("Etiqueta creada con éxito 🎉");
      setTimeout(() => {
        navigate("/tags");
      }, 3000);
    });
  };

  return (
   

    <>
      <div className="mb-3">
        <button
          type="button"
          className="btn-back-arrow"
          onClick={() => navigate("/tags")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="tag-form-dark p-4 rounded"
      >
        <h1 className="mb-4 text-info">Crear nueva etiqueta</h1>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Nombre</label>
          <input
            type="text"
            className={`form-control bg-dark text-light border-secondary ${
              errors.name ? "is-invalid" : ""
            }`}
            {...register("name")}
            placeholder="Ej: Ciencia, Historia, Tecnología"
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">
            Descripción
          </label>
          <textarea
            className={`form-control bg-dark text-light border-secondary textarea-overflow ${
              errors.description ? "is-invalid" : ""
            }`}
            rows="3"
            {...register("description")}
            placeholder="Describe brevemente esta etiqueta..."
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">
            Etiqueta padre
          </label>
          <div className="d-flex flex-column flex-md-row align-items-start gap-2">
            <button
              type="button"
              className="btn btn-purple-style"
              onClick={showModal}
            >
              Seleccionar etiqueta base
            </button>
            {fatherTag && (
              <span className="text-success small mt-1">
                Seleccionada: <strong>{fatherTag.name}</strong>
              </span>
            )}
          </div>
          {errors.father_id && (
            <div className="text-danger mt-1">{errors.father_id.message}</div>
          )}
        </div>

        <div className="d-grid d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-info px-4 btn-green-style">
            Crear etiqueta
          </button>
        </div>
      </form>

      <TagSelectorModal tags={tags} onSelect={setFatherTag} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}
