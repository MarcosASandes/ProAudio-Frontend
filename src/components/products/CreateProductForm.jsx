import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validators/products/productValidator";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TagSelectorModal from "./../tags/TagSelectorModal";
import { useSelector } from "react-redux";
import { selectTags, selectTagsTypes } from "../../features/tags/TagSelector";
import useGetTagsTypes from "../../hooks/tags/useGetTagsTypes";
import styles from "../../styles/products/createProductForm.module.css";
import { getProductTagTypeLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import { Info, Pencil, X } from "lucide-react";
import { getCreateProductFormErrorMessages } from "../../utils/getErrorsMessages";

export default function CreateProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      prices: [{ value: "", description: "" }],
      photos: [],
      tags: [],
    },
  });

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
    replace: replacePrices,
  } = useFieldArray({ control, name: "prices" });
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });

  const createProduct = useCreateProduct();
  const navigate = useNavigate();
  const tags = useSelector(selectTags);

  const getTagNameById = (id) => {
    const tag = tags.find((t) => t.tag_id === id);
    return tag ? tag.name : null;
  };

  useGetTagsTypes();
  const allTagsTypes = useSelector(selectTagsTypes);

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedType, setSelectedType] = useState("DESCRIPTIVE");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedTag) {
      appendTag({ tag_id: selectedTag.tag_id, type: selectedType });
      setSelectedTag(null);
    }
  }, [selectedTag, selectedType, appendTag]);

  const onSubmit = (data) => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("file", file));
    const productRequestDto = {
      model: data.model,
      comments: data.comments,
      replacement_value: data.replacement_value,
      prices: data.prices,
      photos: data.photos,
      tags: data.tags,
    };
    const jsonBlob = new Blob([JSON.stringify(productRequestDto)], {
      type: "application/json",
    });
    formData.append("productRequestDto", jsonBlob);

    createProduct(formData, () => {
      reset();
      setSelectedFiles([]);
      setTimeout(() => navigate("/products"), 3000);
    });
  };
  const errorMessages = getCreateProductFormErrorMessages(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/products"} />
      <h2 className={styles.title}>Crear nuevo producto</h2>

      <div className={styles.formGroup}>
        <label htmlFor="txtModel">Modelo</label>
        <input
          id="txtModel"
          type="text"
          placeholder="Ej: SENNHEISER EW DX EM 2"
          {...register("model")}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtComments">Comentarios</label>
        <textarea
          id="txtComments"
          rows="3"
          placeholder="Comentarios adicionales sobre el producto..."
          {...register("comments")}
        />
      </div>

      {/* Valor de reposición + Fotos en la misma fila */}
      <div className={styles.rowGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="numReplacementValue">Valor de reposición (USD)</label>
          <input
            id="numReplacementValue"
            type="number"
            step="0.01"
            onWheel={(e) => e.target.blur()}
            placeholder="Ej: 500.00"
            {...register("replacement_value")}
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelWithIcon}>
            <label htmlFor="filePhotos">Seleccionar imágenes</label>
            <div className={styles.infoIconWrap} aria-hidden="true">
              <Info size={15} />
              <div className={styles.tooltip}>
                Límite de subida de imágenes: 10Mb.
              </div>
            </div>
          </div>
          <input
            id="filePhotos"
            type="file"
            accept="image/*"
            multiple
            {...register("photos")}
            onChange={(e) => {
              setSelectedFiles(Array.from(e.target.files));
            }}
          />
        </div>
      </div>

      <div className={styles.collapseSection}>
        <button
          className={styles.collapseButton}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsePrices"
          aria-expanded="false"
          aria-controls="collapsePrices"
        >
          Precios
        </button>
        <div className={`collapse ${styles.collapseBody}`} id="collapsePrices">
          {priceFields?.map((field, index) => {
            const isEditing = field.editMode ?? true;
            return (
              <div key={field.id} className={styles.priceItem}>
                {isEditing ? (
                  <>
                    <div className={styles.formGroup}>
                      <label>Valor</label>
                      <input
                        type="number"
                        step="0.01"
                        onWheel={(e) => e.target.blur()}
                        {...register(`prices.${index}.value`)}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Descripción</label>
                      <input
                        type="text"
                        {...register(`prices.${index}.description`)}
                      />
                    </div>
                    <div className={styles.priceActions}>
                      <button
                        type="button"
                        className={styles.acceptBtn}
                        onClick={() => {
                          const updated = getValues("prices")?.map((p, i) =>
                            i === index ? { ...p, editMode: false } : p
                          );
                          replacePrices(updated);
                        }}
                      >
                        Aceptar
                      </button>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removePrice(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.priceDisplay}>
                    <span>
                      <strong>{field.value} USD</strong> — {field.description}
                    </span>
                    <div>
                      <button
                        type="button"
                        className={styles.editBtn}
                        onClick={() => {
                          const updated = getValues("prices")?.map((p, i) =>
                            i === index ? { ...p, editMode: true } : p
                          );
                          replacePrices(updated);
                        }}
                      >
                        <Pencil size={16} />
                        Modificar
                      </button>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removePrice(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            className={styles.addPriceBtn}
            onClick={() =>
              appendPrice({
                value: "",
                description: "",
                editMode: true,
              })
            }
          >
            Agregar precio
          </button>
        </div>
      </div>

      <div className={styles.tagSection}>
        <button
          type="button"
          className={styles.tagButton}
          onClick={() => setIsModalOpen(true)}
        >
          Seleccionar etiqueta
        </button>
        <select
          className={styles.tagSelect}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {allTagsTypes.length === 0 ? (
            <option disabled>Cargando tipos...</option>
          ) : (
            allTagsTypes?.tag_types?.map((tipo) => (
              <option key={tipo} value={tipo}>
                {getProductTagTypeLabel(tipo)}
              </option>
            ))
          )}
        </select>
      </div>

      <div className={styles.tagList}>
        {tagFields?.map((tag, index) => {
          return (
            <div key={tag.id} className={styles.tagItem}>
              <span>
                {getTagNameById(tag.tag_id)} | Tipo:{" "}
                {getProductTagTypeLabel(tag.type)}
              </span>
              <button
                type="button"
                className={styles.removeTagBtn}
                onClick={() => removeTag(index)}
              >
                <X size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {errorMessages.length > 0 && (
        <div className={styles.errorSummary}>
          <h4>Por favor corrige los siguientes errores:</h4>
          <ul>
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.clearBtn} ${styles.productFormButtons}`}
          onClick={() => {
            reset();
            setSelectedFiles([]);
          }}
        >
          Limpiar formulario
        </button>

        <button
          type="submit"
          className={`${styles.submitBtn} ${styles.productFormButtons}`}
        >
          Crear producto
        </button>
      </div>

      {isModalOpen && (
        <TagSelectorModal
          tags={tags}
          onSelect={(tag) => {
            setSelectedTag(tag);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </form>
  );
}
