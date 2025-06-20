import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagSchema } from "../validators/tagValidator";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTags, selectSelectedTag } from "../features/tags/TagSelector";
import { useUpdateTag } from "../hooks/tags/useUpdateTag";
import { useNavigate } from "react-router-dom";
import TagSelectorModal from "./TagSelectorModal";
import { ToastContainer, toast } from "react-toastify";
import * as bootstrap from "bootstrap";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import { ArrowLeft } from "lucide-react";

export default function UpdateTagForm({ tagId }) {
  /*useGetTagById(tagId);*/
  useGetAllTags();
  /*const tag = useSelector(selectSelectedTag);*/
  const tags = useSelector(selectTags);
  const tag = tags.find((t) => t.tag_id === Number(tagId));
  const updateTag = useUpdateTag();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
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

      // También setear la etiqueta padre en estado local para mostrarla
      const father = tags.find((t) => t.tag_id === tag.father_id) || null;
      setFatherTag(father);
    }
  }, [tag, reset, tags]);

  useEffect(() => {
    // Cuando cambia fatherTag actualizamos el form field father_id
    setValue("father_id", fatherTag ? fatherTag.tag_id : null);
  }, [fatherTag, setValue]);

  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
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
      toast.success("Etiqueta modificada con éxito 🎉");
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
        <h1 className="mb-4 text-info">Editar etiqueta</h1>

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
            placeholder="Actualiza la descripción de la etiqueta..."
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
            Guardar cambios
          </button>
        </div>
      </form>

      <TagSelectorModal tags={tags} onSelect={setFatherTag} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}
