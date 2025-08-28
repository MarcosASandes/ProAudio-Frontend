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
  useGetAllTags(true); // Para que las etiquetas sigan apareciendo tras F5
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
