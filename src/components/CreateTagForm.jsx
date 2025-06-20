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
