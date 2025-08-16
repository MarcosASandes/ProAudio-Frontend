/*import TagSelectorModal from "./TagSelectorModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../../validators/tags/tagValidator";
import { ToastContainer, toast } from "react-toastify";
import { useCreateTag } from "../../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import * as bootstrap from "bootstrap";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/tags/createTagForm.module.css";


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
          className={styles.btnBackArrow}
          onClick={() => navigate("/tags")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.tagFormDark} p-4 rounded`}
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
            className={`form-control bg-dark text-light border-secondary ${styles.textareaOverflow} ${errors.description ? "is-invalid" : ""}`}
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
              className={`btn ${styles.btnPurpleStyle}`}
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
          <button type="submit" className={`btn btn-info px-4 ${styles.btnGreenStyle}`}>
            Crear etiqueta
          </button>
        </div>
      </form>

      <TagSelectorModal tags={tags} onSelect={setFatherTag} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}*/

/*------------------------------------------------------------- */

/*import TagSelectorModal from "./TagSelectorModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../../validators/tags/tagValidator";
import { ToastContainer } from "react-toastify";
import { useCreateTag } from "../../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/tags/createTagForm.module.css";

export default function CreateTagForm() {
  useGetAllTags(); // Para que las etiquetas sigan apareciendo tras F5
  const tags = useSelector(selectTags);
  const [fatherTag, setFatherTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // control de visibilidad del modal

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

  useEffect(() => {
    setValue("father_id", fatherTag ? fatherTag.tag_id : null);
  }, [fatherTag, setValue]);

  const onSubmit = (data) => {
    const dataToSend = { ...data };
    createTag(dataToSend, () => {
      reset();
      setTimeout(() => navigate("/tags"), 3000);
    });
  };

  return (
    <>
      <div className="mb-3">
        <button
          type="button"
          className={styles.btnBackArrow}
          onClick={() => navigate("/tags")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.tagFormDark} p-4 rounded`}
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
            className={`form-control bg-dark text-light border-secondary ${styles.textareaOverflow} ${
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
              className={`btn ${styles.btnPurpleStyle}`}
              onClick={() => setIsModalOpen(true)}
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
          <button
            type="submit"
            className={`btn btn-info px-4 ${styles.btnGreenStyle}`}
          >
            Crear etiqueta
          </button>
        </div>
      </form>

      
      {isModalOpen && (
        <TagSelectorModal
          tags={tags}
          onSelect={(tag) => {
            setFatherTag(tag);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}*/

/*----------------------------------------- */

/*import TagSelectorModal from "./TagSelectorModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../../validators/tags/tagValidator";
import { useCreateTag } from "../../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/tags/createTagForm.module.css";

export default function CreateTagForm() {
  useGetAllTags();
  const tags = useSelector(selectTags);
  const [fatherTag, setFatherTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    setValue("father_id", fatherTag ? fatherTag.tag_id : null);
  }, [fatherTag, setValue]);

  const onSubmit = (data) => {
    const dataToSend = { ...data };
    createTag(dataToSend, () => {
      reset();
      setTimeout(() => navigate("/tags"), 3000);
    });
  };

  return (
    <div className={styles.container}>
     
      <div className={styles.backButtonContainer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/tags")}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
      </div>

    
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Crear nueva etiqueta</h1>

  
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Ej: Ciencia, Historia, Tecnología"
            className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>


        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Descripción
          </label>
          <textarea
            id="description"
            rows="3"
            {...register("description")}
            placeholder="Describe brevemente esta etiqueta..."
            className={`${styles.textarea} ${
              errors.description ? styles.invalid : ""
            }`}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

     
        <div className={styles.formGroup}>
          <label className={styles.label}>Etiqueta padre</label>
          <div className={styles.fatherSelector}>
            <button
              type="button"
              className={styles.selectButton}
              onClick={() => setIsModalOpen(true)}
            >
              Seleccionar etiqueta base
            </button>
            {fatherTag && (
              <span className={styles.selected}>
                Seleccionada: <strong>{fatherTag.name}</strong>
              </span>
            )}
          </div>
          {errors.father_id && (
            <span className={styles.error}>{errors.father_id.message}</span>
          )}
        </div>


        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Crear etiqueta
          </button>
        </div>
      </form>

     
      {isModalOpen && (
        <TagSelectorModal
          tags={tags}
          onSelect={(tag) => {
            setFatherTag(tag);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}*/

/*------------------------------------------------- */

import TagSelectorModal from "./TagSelectorModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../../validators/tags/tagValidator";
import BackButton from "../global/BackButton";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import { useCreateTag } from "../../hooks/tags/useCreateTag";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import styles from "../../styles/tags/createTagForm.module.css";

export default function CreateTagForm() {
  useGetAllTags(); // Para que las etiquetas sigan apareciendo tras F5
  const tags = useSelector(selectTags);

  const [fatherTag, setFatherTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    setValue("father_id", fatherTag ? fatherTag.tag_id : null);
  }, [fatherTag, setValue]);

  const onSubmit = (data) => {
    const dataToSend = { ...data };
    createTag(dataToSend, () => {
      reset();
      setTimeout(() => navigate("/tags"), 3000);
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/tags"} />
      <h2 className={styles.title}>Crear etiqueta</h2>

      {/* Nombre */}
      <div className={styles.formGroup}>
        <label htmlFor="txtName">Nombre</label>
        <input
          id="txtName"
          type="text"
          {...register("name")}
          placeholder="Ej: Microfonía, Monitoreo, Receptor..."
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      {/* Descripción */}
      <div className={styles.formGroup}>
        <label htmlFor="txtDescription">Descripción</label>
        <textarea
          id="txtDescription"
          rows="4"
          {...register("description")}
          placeholder="Describe brevemente esta etiqueta..."
        />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      {/* Etiqueta padre (usa el mismo layout de formGroup) 
      <div className={styles.formGroup}>
        <label>Etiqueta padre</label>
        <div>
          <button
            type="button"
            className={`${styles.submitBtn} ${styles.clientFormButtons}`}
            onClick={() => setIsModalOpen(true)}
          >
            Seleccionar etiqueta base
          </button>
          {fatherTag && (
            <p style={{ marginTop: "0.5rem", color: "#7CFC7C" }}>
              Seleccionada: <strong>{fatherTag.name}</strong>
            </p>
          )}
        </div>
        {errors.father_id && (
          <p className={styles.error}>{errors.father_id.message}</p>
        )}
      </div>*/}

      <div className="mb-3">
        <label className="form-label text-light fw-semibold">
          Etiqueta padre
        </label>
        <div className="d-flex flex-column flex-md-row align-items-start gap-2">
          <button
            type="button"
            className={`${styles.submitBtn} ${styles.clientFormButtons}`}
            onClick={() => setIsModalOpen(true)}
          >
            Seleccionar
          </button>
          {fatherTag && (
            <span className={`badge ${styles.badgeOrange}`}>
              {fatherTag.name}
            </span>
          )}
        </div>
        {errors.father_id && (
          <div className="text-danger mt-1">{errors.father_id.message}</div>
        )}
      </div>

      {/* Botones (idénticos al cliente) */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.clearBtn} ${styles.clientFormButtons}`}
          onClick={() => {
            reset();
            setFatherTag(null);
            setValue("father_id", null);
          }}
        >
          Limpiar formulario
        </button>

        <button
          type="submit"
          className={`${styles.submitBtn} ${styles.clientFormButtons}`}
        >
          Crear Etiqueta
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TagSelectorModal
          tags={tags}
          onSelect={(tag) => {
            setFatherTag(tag);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </form>
  );
}
