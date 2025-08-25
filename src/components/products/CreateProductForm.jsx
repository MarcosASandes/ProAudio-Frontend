/*import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validators/products/productValidator";
import { ToastContainer, toast } from "react-toastify";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagSelectorModal from "./../tags/TagSelectorModal";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import { ArrowLeft } from "lucide-react";
//import "../../styles/products.css";
import { selectTagsTypes } from "../../features/tags/TagSelector";
import useGetTagsTypes from "../../hooks/tags/useGetTagsTypes";
import styles from "../../styles/products/createProductForm.module.css";
import { getProductTagTypeLabel } from "../../utils/getLabels";

export default function CreateProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
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
  } = useFieldArray({
    control,
    name: "prices",
  });

  const {
    fields: photoFields,
    append: appendPhoto,
    remove: removePhoto,
  } = useFieldArray({
    control,
    name: "photos",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const createProduct = useCreateProduct();
  const navigate = useNavigate();
  const tags = useSelector(selectTags);

  useGetTagsTypes();
  const allTagsTypes = useSelector(selectTagsTypes);

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedType, setSelectedType] = useState("DESCRIPTIVE");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  useEffect(() => {
    if (selectedTag) {
      appendTag({
        tag_id: selectedTag.tag_id,
        type: selectedType,
      });
      setSelectedTag(null);
    }
  }, [selectedTag, selectedType, appendTag]);

  const onSubmit = (data) => {
    const formData = new FormData();

    // ✅ Agregar el archivo seleccionado (usamos solo uno por ahora)
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
    }

    // ✅ Agregar el productRequestDto como JSON en un Blob
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

    // ✅ Otros parámetros que pide el backend
    //formData.append("name", data.model); // ⚠️ o lo que prefieras

    // ✅ Enviar con createProduct
    createProduct(formData, () => {
      reset();
      setSelectedFiles([]);
      setTimeout(() => {
        navigate("/products");
      }, 3000);
    });
  };

  return (
    
    <div className={`${styles.formDark} ${styles.containerWithOverflow} p-4 rounded`}>
      <div className="mb-3">
        <button
          type="button"
          className={styles.btnBackArrow}
          onClick={() => navigate("/products")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.formDark} p-4 rounded`}
      >
        <h1 className="mb-4 text-info">Crear nuevo producto</h1>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Modelo</label>
          <input
            type="text"
            className={`form-control bg-dark text-light border-secondary ${
              errors.model ? "is-invalid" : ""
            }`}
            {...register("model")}
            placeholder="Ej: SENNHEISER EW DX EM 2"
          />
          {errors.model && (
            <div className="invalid-feedback">{errors.model.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">
            Comentarios
          </label>
          <textarea
            className={`form-control bg-dark text-light border-secondary ${
              styles.textareaOverflow
            } ${errors.comments ? "is-invalid" : ""}`}
            rows="3"
            {...register("comments")}
            placeholder="Comentarios adicionales sobre el producto..."
          />
          {errors.comments && (
            <div className="invalid-feedback">{errors.comments.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">
            Valor de reposición ($)
          </label>
          <input
            type="number"
            step="0.01"
            onWheel={(e) => e.target.blur()}
            className={`form-control bg-dark text-light border-secondary ${
              errors.replacement_value ? "is-invalid" : ""
            }`}
            {...register("replacement_value")}
            placeholder="Ej: 500.00"
          />
          {errors.replacement_value && (
            <div className="invalid-feedback">
              {errors.replacement_value.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <button
            className={`w-100 text-start ${styles.collapseButton}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePrices"
            aria-expanded="false"
            aria-controls="collapsePrices"
          >
            Precios
          </button>
          <div
            className={`collapse mt-2 ${styles.collapseBody}`}
            id="collapsePrices"
          >
            {priceFields?.map((field, index) => {
              const isEditing = field.editMode ?? true; // por defecto true si no existe

              return (
                <div
                  key={field.id}
                  className="border p-3 mb-2 rounded bg-secondary bg-opacity-10"
                >
                  {isEditing ? (
                    <>
                      <div className="mb-2">
                        <label className="form-label text-light">Valor</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          onWheel={(e) => e.target.blur()}
                          {...register(`prices.${index}.value`)}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label text-light">
                          Descripción
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...register(`prices.${index}.description`)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-sm me-2"
                        onClick={() => {
                          // Aceptar: cambia editMode a false
                          const updated = getValues("prices")?.map((p, i) =>
                            i === index ? { ...p, editMode: false } : p
                          );
                          replacePrices(updated);
                        }}
                      >
                        Aceptar precio
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removePrice(index)}
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                      <div className="text-light">
                        <strong>${field.value}</strong> — {field.description}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            // Modificar: vuelve a editMode true
                            const updated = getValues("prices")?.map((p, i) =>
                              i === index ? { ...p, editMode: true } : p
                            );
                            replacePrices(updated);
                          }}
                        >
                          Modificar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removePrice(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              className="btn btn-primary btn-sm"
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

            {errors.prices && (
              <div className="text-danger mt-1">{errors.prices.message}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="mb-3">
            <button
              className={`w-100 text-start ${styles.collapseButton}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePhotos"
              aria-expanded="false"
              aria-controls="collapsePhotos"
            >
              Fotos
            </button>
            <div className={`collapse mt-2 ${styles.collapseBody}`} id="collapsePhotos">
              <div className="border p-3 mb-2 rounded bg-secondary bg-opacity-10">
                <div className="mb-3">
                  <label className="form-label text-light fw-semibold">
                    Seleccionar imágenes
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="form-control bg-dark text-light border-secondary"
                    onChange={(e) =>
                      setSelectedFiles(Array.from(e.target.files))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className={`w-100 text-start ${styles.collapseButton}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTags"
          aria-expanded="false"
          aria-controls="collapseTags"
        >
          Etiquetas
        </button>

        <div className={`collapse mt-2 ${styles.collapseBody}`} id="collapseTags">
          <div className="d-flex flex-column flex-md-row align-items-start gap-2 mb-2">
            <button
              type="button"
              className={styles.purpleButton}
              onClick={showModal}
            >
              Seleccionar etiqueta
            </button>
            <select
              className="form-select w-auto"
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

          <div className="d-flex flex-wrap gap-2">
            {tagFields?.map((tag, index) => (
              <div
                key={tag.id}
                className="badge rounded-pill bg-info text-dark d-flex align-items-center"
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
        </div>

        <div className="d-grid d-md-flex justify-content-md-end pt-3">
          <button type="submit" className={`btn btn-info px-4 ${styles.greenButton}`}>
            Crear producto
          </button>
        </div>
      </form>

      <TagSelectorModal tags={tags} onSelect={setSelectedTag} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}*/

/*---------------------------------------------------- */

/*import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validators/products/productValidator";
import { ToastContainer } from "react-toastify";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TagSelectorModal from "./../tags/TagSelectorModal";
import { useSelector } from "react-redux";
import { selectTags, selectTagsTypes } from "../../features/tags/TagSelector";
import useGetTagsTypes from "../../hooks/tags/useGetTagsTypes";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/products/createProductForm.module.css";
import { getProductTagTypeLabel } from "../../utils/getLabels";

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

  const { fields: priceFields, append: appendPrice, remove: removePrice, replace: replacePrices } = useFieldArray({ control, name: "prices" });
  const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({ control, name: "photos" });
  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({ control, name: "tags" });

  const createProduct = useCreateProduct();
  const navigate = useNavigate();
  const tags = useSelector(selectTags);

  useGetTagsTypes();
  const allTagsTypes = useSelector(selectTagsTypes);

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedType, setSelectedType] = useState("DESCRIPTIVE");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // control modal

  useEffect(() => {
    if (selectedTag) {
      appendTag({ tag_id: selectedTag.tag_id, type: selectedType });
      setSelectedTag(null);
    }
  }, [selectedTag, selectedType, appendTag]);

  const onSubmit = (data) => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("file", file));
    const productRequestDto = { model: data.model, comments: data.comments, replacement_value: data.replacement_value, prices: data.prices, photos: data.photos, tags: data.tags };
    const jsonBlob = new Blob([JSON.stringify(productRequestDto)], { type: "application/json" });
    formData.append("productRequestDto", jsonBlob);

    createProduct(formData, () => {
      reset();
      setSelectedFiles([]);
      setTimeout(() => navigate("/products"), 3000);
    });
  };

  return (
    <div className={`${styles.formDark} ${styles.containerWithOverflow} p-4 rounded`}>
      <div className="mb-3">
        <button type="button" className={styles.btnBackArrow} onClick={() => navigate("/products")}>
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.formDark} p-4 rounded`}>
        <h1 className="mb-4 text-info">Crear nuevo producto</h1>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Modelo</label>
          <input
            type="text"
            className={`form-control bg-dark text-light border-secondary ${errors.model ? "is-invalid" : ""}`}
            {...register("model")}
            placeholder="Ej: SENNHEISER EW DX EM 2"
          />
          {errors.model && <div className="invalid-feedback">{errors.model.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Comentarios</label>
          <textarea
            className={`form-control bg-dark text-light border-secondary ${styles.textareaOverflow} ${errors.comments ? "is-invalid" : ""}`}
            rows="3"
            {...register("comments")}
            placeholder="Comentarios adicionales sobre el producto..."
          />
          {errors.comments && <div className="invalid-feedback">{errors.comments.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Valor de reposición ($)</label>
          <input
            type="number"
            step="0.01"
            onWheel={(e) => e.target.blur()}
            className={`form-control bg-dark text-light border-secondary ${errors.replacement_value ? "is-invalid" : ""}`}
            {...register("replacement_value")}
            placeholder="Ej: 500.00"
          />
          {errors.replacement_value && <div className="invalid-feedback">{errors.replacement_value.message}</div>}
        </div>

        <div className="mb-3">
          <button
            className={`w-100 text-start ${styles.collapseButton}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePrices"
            aria-expanded="false"
            aria-controls="collapsePrices"
          >
            Precios
          </button>
          <div
            className={`collapse mt-2 ${styles.collapseBody}`}
            id="collapsePrices"
          >
            {priceFields?.map((field, index) => {
              const isEditing = field.editMode ?? true; // por defecto true si no existe

              return (
                <div
                  key={field.id}
                  className="border p-3 mb-2 rounded bg-secondary bg-opacity-10"
                >
                  {isEditing ? (
                    <>
                      <div className="mb-2">
                        <label className="form-label text-light">Valor</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          onWheel={(e) => e.target.blur()}
                          {...register(`prices.${index}.value`)}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label text-light">
                          Descripción
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...register(`prices.${index}.description`)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-sm me-2"
                        onClick={() => {
                          // Aceptar: cambia editMode a false
                          const updated = getValues("prices")?.map((p, i) =>
                            i === index ? { ...p, editMode: false } : p
                          );
                          replacePrices(updated);
                        }}
                      >
                        Aceptar precio
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removePrice(index)}
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                      <div className="text-light">
                        <strong>${field.value}</strong> — {field.description}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            // Modificar: vuelve a editMode true
                            const updated = getValues("prices")?.map((p, i) =>
                              i === index ? { ...p, editMode: true } : p
                            );
                            replacePrices(updated);
                          }}
                        >
                          Modificar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removePrice(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              className="btn btn-primary btn-sm"
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

            {errors.prices && (
              <div className="text-danger mt-1">{errors.prices.message}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="mb-3">
            <button
              className={`w-100 text-start ${styles.collapseButton}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePhotos"
              aria-expanded="false"
              aria-controls="collapsePhotos"
            >
              Fotos
            </button>
            <div className={`collapse mt-2 ${styles.collapseBody}`} id="collapsePhotos">
              <div className="border p-3 mb-2 rounded bg-secondary bg-opacity-10">
                <div className="mb-3">
                  <label className="form-label text-light fw-semibold">
                    Seleccionar imágenes
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="form-control bg-dark text-light border-secondary"
                    onChange={(e) =>
                      setSelectedFiles(Array.from(e.target.files))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-start gap-2 mb-2">
          <button type="button" className={styles.purpleButton} onClick={() => setIsModalOpen(true)}>
            Seleccionar etiqueta
          </button>
          <select className="form-select w-auto" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
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

        <div className="d-flex flex-wrap gap-2">
          {tagFields?.map((tag, index) => (
            <div key={tag.id} className="badge rounded-pill bg-info text-dark d-flex align-items-center">
              <span>ID: {tag.tag_id} | Tipo: {tag.type}</span>
              <button type="button" className="btn-close ms-2" aria-label="Quitar" onClick={() => removeTag(index)} style={{ filter: "invert(1)" }}></button>
            </div>
          ))}
        </div>

        <div className="d-grid d-md-flex justify-content-md-end pt-3">
          <button type="submit" className={`btn btn-info px-4 ${styles.greenButton}`}>Crear producto</button>
        </div>
      </form>

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

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}*/

/*---------------------------------------------------------------------------------- */

/*import { useForm, useFieldArray } from "react-hook-form";
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

  const { fields: priceFields, append: appendPrice, remove: removePrice, replace: replacePrices } = useFieldArray({ control, name: "prices" });
  const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({ control, name: "photos" });
  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({ control, name: "tags" });

  const createProduct = useCreateProduct();
  const navigate = useNavigate();
  const tags = useSelector(selectTags);

  useGetTagsTypes();
  const allTagsTypes = useSelector(selectTagsTypes);

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedType, setSelectedType] = useState("DESCRIPTIVE");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // control modal

  useEffect(() => {
    if (selectedTag) {
      appendTag({ tag_id: selectedTag.tag_id, type: selectedType });
      setSelectedTag(null);
    }
  }, [selectedTag, selectedType, appendTag]);

  const onSubmit = (data) => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("file", file));
    const productRequestDto = { model: data.model, comments: data.comments, replacement_value: data.replacement_value, prices: data.prices, photos: data.photos, tags: data.tags };
    const jsonBlob = new Blob([JSON.stringify(productRequestDto)], { type: "application/json" });
    formData.append("productRequestDto", jsonBlob);

    createProduct(formData, () => {
      reset();
      setSelectedFiles([]);
      setTimeout(() => navigate("/products"), 3000);
    });
  };

  return (
    <div className={`${styles.formDark} ${styles.containerWithOverflow} p-4 rounded`}>
      <BackButton target={"/products"} />

      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.formDark} p-4 rounded`}>
        <h1 className="mb-4 text-info">Crear nuevo producto</h1>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Modelo</label>
          <input
            type="text"
            className={`form-control bg-dark text-light border-secondary ${errors.model ? "is-invalid" : ""}`}
            {...register("model")}
            placeholder="Ej: SENNHEISER EW DX EM 2"
          />
          {errors.model && <div className="invalid-feedback">{errors.model.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Comentarios</label>
          <textarea
            className={`form-control bg-dark text-light border-secondary ${styles.textareaOverflow} ${errors.comments ? "is-invalid" : ""}`}
            rows="3"
            {...register("comments")}
            placeholder="Comentarios adicionales sobre el producto..."
          />
          {errors.comments && <div className="invalid-feedback">{errors.comments.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label text-light fw-semibold">Valor de reposición ($)</label>
          <input
            type="number"
            step="0.01"
            onWheel={(e) => e.target.blur()}
            className={`form-control bg-dark text-light border-secondary ${errors.replacement_value ? "is-invalid" : ""}`}
            {...register("replacement_value")}
            placeholder="Ej: 500.00"
          />
          {errors.replacement_value && <div className="invalid-feedback">{errors.replacement_value.message}</div>}
        </div>

        <div className="mb-3">
          <button
            className={`w-100 text-start ${styles.collapseButton}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePrices"
            aria-expanded="false"
            aria-controls="collapsePrices"
          >
            Precios
          </button>
          <div
            className={`collapse mt-2 ${styles.collapseBody}`}
            id="collapsePrices"
          >
            {priceFields?.map((field, index) => {
              const isEditing = field.editMode ?? true; // por defecto true si no existe

              return (
                <div
                  key={field.id}
                  className="border p-3 mb-2 rounded bg-secondary bg-opacity-10"
                >
                  {isEditing ? (
                    <>
                      <div className="mb-2">
                        <label className="form-label text-light">Valor</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          onWheel={(e) => e.target.blur()}
                          {...register(`prices.${index}.value`)}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label text-light">
                          Descripción
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...register(`prices.${index}.description`)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-sm me-2"
                        onClick={() => {
                          // Aceptar: cambia editMode a false
                          const updated = getValues("prices")?.map((p, i) =>
                            i === index ? { ...p, editMode: false } : p
                          );
                          replacePrices(updated);
                        }}
                      >
                        Aceptar precio
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removePrice(index)}
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                      <div className="text-light">
                        <strong>${field.value}</strong> — {field.description}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            // Modificar: vuelve a editMode true
                            const updated = getValues("prices")?.map((p, i) =>
                              i === index ? { ...p, editMode: true } : p
                            );
                            replacePrices(updated);
                          }}
                        >
                          Modificar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removePrice(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              className="btn btn-primary btn-sm"
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

            {errors.prices && (
              <div className="text-danger mt-1">{errors.prices.message}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="mb-3">
            <button
              className={`w-100 text-start ${styles.collapseButton}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePhotos"
              aria-expanded="false"
              aria-controls="collapsePhotos"
            >
              Fotos
            </button>
            <div className={`collapse mt-2 ${styles.collapseBody}`} id="collapsePhotos">
              <div className="border p-3 mb-2 rounded bg-secondary bg-opacity-10">
                <div className="mb-3">
                  <label className="form-label text-light fw-semibold">
                    Seleccionar imágenes
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="form-control bg-dark text-light border-secondary"
                    onChange={(e) =>
                      setSelectedFiles(Array.from(e.target.files))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-start gap-2 mb-2">
          <button type="button" className={styles.purpleButton} onClick={() => setIsModalOpen(true)}>
            Seleccionar etiqueta
          </button>
          <select className="form-select w-auto" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
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

        <div className="d-flex flex-wrap gap-2">
          {tagFields?.map((tag, index) => (
            <div key={tag.id} className="badge rounded-pill bg-info text-dark d-flex align-items-center">
              <span>ID: {tag.tag_id} | Tipo: {tag.type}</span>
              <button type="button" className="btn-close ms-2" aria-label="Quitar" onClick={() => removeTag(index)} style={{ filter: "invert(1)" }}></button>
            </div>
          ))}
        </div>

        <div className="d-grid d-md-flex justify-content-md-end pt-3">
          <button type="submit" className={`btn btn-info px-4 ${styles.greenButton}`}>Crear producto</button>
        </div>
      </form>

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

    </div>
  );
}*/

/*--------------------------------------------------------- */

/*import { useForm, useFieldArray } from "react-hook-form";
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
  const { fields: tagFields, append: appendTag, remove: removeTag } =
    useFieldArray({ control, name: "tags" });

  const createProduct = useCreateProduct();
  const navigate = useNavigate();
  const tags = useSelector(selectTags);

  useGetTagsTypes();
  const allTagsTypes = useSelector(selectTagsTypes);

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedType, setSelectedType] = useState("DESCRIPTIVE");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // control modal

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
        {errors.model && <p className={styles.error}>{errors.model.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="txtComments">Comentarios</label>
        <textarea
          id="txtComments"
          rows="3"
          placeholder="Comentarios adicionales sobre el producto..."
          {...register("comments")}
        />
        {errors.comments && (
          <p className={styles.error}>{errors.comments.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="numReplacementValue">Valor de reposición ($)</label>
        <input
          id="numReplacementValue"
          type="number"
          step="0.01"
          onWheel={(e) => e.target.blur()}
          placeholder="Ej: 500.00"
          {...register("replacement_value")}
        />
        {errors.replacement_value && (
          <p className={styles.error}>{errors.replacement_value.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="filePhotos">Seleccionar imágenes</label>
        <input
          id="filePhotos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
        />
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
                      <strong>${field.value}</strong> — {field.description}
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
                        Modificar
                      </button>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removePrice(index)}
                      >
                        X
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

          {errors.prices && (
            <p className={styles.error}>{errors.prices.message}</p>
          )}
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
        {tagFields?.map((tag, index) => (
          <div key={tag.id} className={styles.tagItem}>
            <span>
              ID: {tag.tag_id} | Tipo: {tag.type}
            </span>
            <button
              type="button"
              className={styles.removeTagBtn}
              onClick={() => removeTag(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

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
}*/

/*----------------------------------------------- */

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

  console.log("Estos son los tags: ", tags);

  useGetTagsTypes();
  const allTagsTypes = useSelector(selectTagsTypes);

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedType, setSelectedType] = useState("DESCRIPTIVE");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // control modal

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
          {/*<input
            id="filePhotos"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
          />*/}
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

      {/*<div className={styles.tagList}>
        {tagFields?.map((tag, index) => (
          <div key={tag.id} className={styles.tagItem}>
            <span>
              ID: {tag.tag_id} | Tipo: {tag.type}
            </span>
            <button
              type="button"
              className={styles.removeTagBtn}
              onClick={() => removeTag(index)}
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>*/}

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
