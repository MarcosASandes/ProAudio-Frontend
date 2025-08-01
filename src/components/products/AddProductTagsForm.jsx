import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { selectTags } from "../../features/tags/TagSelector";
import { useAddProductTag } from "../../hooks/products/useAddProductTag";
import { useDeleteProductTag } from "../../hooks/products/useDeleteProductTag";
import { toast } from "react-toastify";
import TagSelectorModal from "./../tags/TagSelectorModal";
import * as bootstrap from "bootstrap";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { selectTagsTypes } from "../../features/tags/TagSelector";
import useGetTagsTypes from "../../hooks/tags/useGetTagsTypes";
import styles from "../../styles/products/addProductTagsForm.module.css";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import { showToast, showToastError } from "../../utils/toastUtils";

const AddProductTagsForm = ({ productId }) => {
  const product = useSelector(selectSelectedProductDetails);
  const allTags = useSelector(selectTags);

  useGetTagsTypes();
  const allTagsTypes = useSelector(selectTagsTypes);

  const addProductTag = useAddProductTag();
  const deleteProductTag = useDeleteProductTag();

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { tags: [] },
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedType, setSelectedType] = useState("DESCRIPTIVE");

  //ToDo: Ponerlo en el archivo JS de labels
  const getNameFormat = (tipo) => {
    switch (tipo) {
      case "DESCRIPTIVE":
        return "Descriptiva";
      case "RELATION":
        return "Relación";
      case "DEPENDENCY":
        return "Dependencia";
      default:
        return tipo;
    }
  };

  // Mostrar modal selector de etiqueta
  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  // Agregar etiqueta seleccionada + tipo al FieldArray local
  const handleAddLocalTag = () => {
    if (!selectedTag) {
      showToastError("Selecciona una etiqueta primero.");
      return;
    }

    appendTag({
      tag_id: selectedTag.tag_id,
      type: selectedType,
    });

    setSelectedTag(null);
    //showToast("Etiqueta agregada a lista local.")
  };


  // Submit: agregar cada etiqueta de FieldArray al backend + store
  const onSubmit = async (data) => {
    try {
      if (data.tags.length === 0) {
        showToastError("Agrega al menos una etiqueta.");
        return;
      }

      for (const tag of data.tags) {
        await addProductTag(productId, tag.tag_id, tag.type);
      }

      reset({ tags: [] });
    } catch (error) {
      console.error(error);
      //toast.error("Error agregando etiquetas.");
    }
  };

  // Eliminar etiqueta EXISTENTE (ya vinculada)
  const handleDeleteExistingTag = async (tagId, type) => {
    try {
      await deleteProductTag(productId, tagId, type);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className={styles.sectionContainer}>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButtom.btnBackArrow}
          onClick={() => navigate("/product/" + productId)}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.sectionContainer}
      >
        <h1 className="pb-3">Agregar etiquetas</h1>
        <h5 className="text-light">Etiquetas Actuales</h5>

        <div className="mb-3">
          <h6 className="text-danger">Descriptivas</h6>
          {product?.description_tags?.length === 0 ? (
            <p className="text-white">No hay.</p>
          ) : (
            <ul className="list-group">
              {product?.description_tags?.map((tag) => (
                <li
                  key={`${tag.tag_id}-DESCRIPTIVE`}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {tag.name} ({tag.status})
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDeleteExistingTag(tag.tag_id, "DESCRIPTIVE")
                    }
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <h6 className="text-success">Relación</h6>
          {product?.relation_tags?.length === 0 ? (
            <p className="text-white">No hay.</p>
          ) : (
            <ul className="list-group">
              {product?.relation_tags?.map((tag) => (
                <li
                  key={`${tag.tag_id}-RELATION`}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {tag.name} ({tag.status})
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDeleteExistingTag(tag.tag_id, "RELATION")
                    }
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <h6 className="text-primary">Dependencia</h6>
          {product?.dependency_tags?.length === 0 ? (
            <p className="text-white">No hay.</p>
          ) : (
            <ul className="list-group">
              {product?.dependency_tags?.map((tag) => (
                <li
                  key={`${tag.tag_id}-DEPENDENCY`}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {tag.name} ({tag.status})
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDeleteExistingTag(tag.tag_id, "DEPENDENCY")
                    }
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <h5 className="text-light">Agregar nuevas relaciones</h5>

        <div className="mb-3">
          <button
            type="button"
            className={styles.selectTagButton}
            onClick={showModal}
          >
            Seleccionar etiqueta
          </button>

          <select
            className="form-select w-auto d-inline-block ms-2"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {allTagsTypes.length === 0 ? (
              <option disabled>Cargando tipos...</option>
            ) : (
              allTagsTypes?.tag_types?.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {getNameFormat(tipo)}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={handleAddLocalTag}
          >
            Agregar a lista local
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {tagFields.map((tag, index) => (
            <div
              key={tag.id}
              className={`badge rounded-pill d-flex align-items-center ${
                tag.type === "DESCRIPTIVE"
                  ? "bg-primary"
                  : tag.type === "RELATION"
                  ? "bg-success"
                  : "bg-warning text-dark"
              }`}
            >
              <span>
                ID: {tag.tag_id} | Tipo: {tag.type}
              </span>
              <button
                type="button"
                className="btn-close ms-2"
                aria-label="Quitar"
                onClick={() => removeTag(index)}
                style={{ filter: "invert(1)" }}
              ></button>
            </div>
          ))}
        </div>

        <button type="submit" className={`btn mt-3 ${styles.btnPurple}`}>
          Guardar nuevas relaciones
        </button>

        <TagSelectorModal tags={allTags} onSelect={setSelectedTag} />
      </form>
    </div>
  );
};

export default AddProductTagsForm;

