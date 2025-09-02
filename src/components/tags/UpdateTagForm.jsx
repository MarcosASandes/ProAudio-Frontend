import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../../validators/tags/tagValidator";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import { useUpdateTag } from "../../hooks/tags/useUpdateTag";
import { useNavigate } from "react-router-dom";
import TagSelectorModal from "./TagSelectorModal";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import styles from "../../styles/tags/updateTagForm.module.css";
import BackButton from "../global/BackButton";
import { useParams } from "react-router-dom";
import { Info } from "lucide-react";

export default function UpdateTagForm() {
  const { tagId } = useParams();
  useGetAllTags(false);
  const tags = useSelector(selectTags);
  const tag = tags.find((t) => t.tag_id === Number(tagId));
  const updateTag = useUpdateTag();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(tagSchema),
    defaultValues: {
      name: "",
      description: "",
      father_id: null,
    },
  });

  const [fatherTag, setFatherTag] = useState(null);

  useEffect(() => {
    if (tag) {
      reset({
        name: tag.name,
        description: tag.description,
        father_id: tag.father_id,
      });

      const father = tags.find((t) => t.tag_id === tag.father_id) || null;
      setFatherTag(father);
    }
  }, [tag, reset, tags]);

  useEffect(() => {
    setValue("father_id", fatherTag ? fatherTag.tag_id : null);
  }, [fatherTag, setValue]);

  const handleConvertToBase = () => {
    if (fatherTag) {
      setFatherTag(null);
      setValue("father_id", null, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data) => {
    const updatedData = {
      ...tag,
      ...data,
      father_id: data.father_id ?? null,
    };

    updateTag(tagId, updatedData, () => {
      reset();
      setTimeout(() => {
        navigate("/tags");
      }, 3000);
    });
  };

  if (tags.length === 0) {
    return <p>Cargando etiquetas...</p>;
  }

  if (!tag) {
    return <p>Etiqueta no encontrada para ID {tagId}.</p>;
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <BackButton target="/tags" />
        <h2 className={styles.title}>Editar etiqueta</h2>

        <div className={styles.formGroup}>
          <label htmlFor="txtName">Nombre</label>
          <input
            id="txtName"
            type="text"
            {...register("name")}
            placeholder="Ej: Ciencia, Historia, Tecnología"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="txtDescription">Descripción</label>
          <textarea
            id="txtDescription"
            rows="4"
            {...register("description")}
            placeholder="Actualiza la descripción..."
          />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelWithIcon}>
                <label>Etiqueta padre</label>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Info size={15} />
                  <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                    Cambiar la jerarquía de etiquetas puede generar problemas en productos y proyectos. Usar con cuidado.
                  </div>
                </div>
              </div>
          
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className={`${styles.clientFormButtons} ${styles.submitBtn}`}
              onClick={() => setIsModalOpen(true)}
            >
              Seleccionar
            </button>
            {fatherTag && (
              <span className={styles.badgeOrange}>{fatherTag.name}</span>
            )}
          </div>
          {errors.father_id && (
            <p className={styles.error}>{errors.father_id.message}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.convertToBase} ${styles.clientFormButtons}`}
            onClick={handleConvertToBase}
            disabled={!tag.father_id}
          >
            Convertir a etiqueta base
          </button>
          <button
            type="button"
            className={`${styles.clearBtn} ${styles.clientFormButtons}`}
            onClick={() => {
              reset({
                name: tag.name,
                description: tag.description,
                father_id: tag.father_id,
              });
              const father =
                tags.find((t) => t.tag_id === tag.father_id) || null;
              setFatherTag(father);
            }}
          >
            Limpiar formulario
          </button>
          <button
            type="submit"
            className={`${styles.submitBtn} ${styles.clientFormButtons}`}
            disabled={!isDirty}
          >
            Guardar cambios
          </button>
        </div>
      </form>

      {isModalOpen && (
        <TagSelectorModal
          tags={tags}
          onSelect={(tag) => {
            setFatherTag(tag);
            setValue("father_id", tag.tag_id, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
