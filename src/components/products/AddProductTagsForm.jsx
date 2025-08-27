import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { selectTags, selectTagsTypes } from "../../features/tags/TagSelector";
import { useAddProductTag } from "../../hooks/products/useAddProductTag";
import { useDeleteProductTag } from "../../hooks/products/useDeleteProductTag";
import TagSelectorModal from "./../tags/TagSelectorModal";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useGetTagsTypes from "../../hooks/tags/useGetTagsTypes";
import { showToastError } from "../../utils/toastUtils";
import { getProductTagTypeLabel } from "../../utils/getLabels";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";
import BackButton from "../global/BackButton";
import styles from "../../styles/products/addProductTagsForm.module.css";

const AddProductTagsForm = () => {
  const { id } = useParams();
  const productId = id;
  useGetProductDetails(productId);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLocalTag = () => {
    if (!selectedTag) {
      showToastError("Selecciona una etiqueta primero.");
      return;
    }
    appendTag({ tag_id: selectedTag.tag_id, type: selectedType });
    setSelectedTag(null);
  };

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
    }
  };

  const handleDeleteExistingTag = async (tagId, type) => {
    try {
      await deleteProductTag(productId, tagId, type);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/product/" + productId} />
      <h2 className={styles.title}>Agregar etiquetas</h2>
      <div className={styles.twoColumnLayout}>
        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Etiquetas actuales</h3>

          {/* Descriptivas */}
          <div className={styles.tagGroup}>
            <div
              className={styles.tagGroupHeader}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <h4 className={`${styles.tagGroupTitle} ${styles.descriptive}`}>
                Descriptivas
              </h4>
              <div className={styles.infoIconWrap} aria-hidden="true">
                <Info size={20} />
                <div className={styles.tooltip}>
                  En esta categoria se agrupan las etiquetas que describen al producto.
                </div>
              </div>
            </div>
            {product?.description_tags?.length === 0 ? (
              <p className={styles.noTags}>No hay.</p>
            ) : (
              <div className={styles.badgeScrollContainer}>
                <div className={styles.badgeContainer}>
                  {product?.description_tags?.map((tag) => (
                    <div
                      key={`${tag.tag_id}-DESCRIPTIVE`}
                      className={`${styles.tagBadge} ${styles.badgeDescriptive}`}
                    >
                      <span>{tag.name}</span>
                      <button
                        type="button"
                        className={styles.removeBadgeBtn}
                        onClick={() =>
                          handleDeleteExistingTag(tag.tag_id, "DESCRIPTIVE")
                        }
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Relación */}
          <div className={styles.tagGroup}>
            <div
              className={styles.tagGroupHeader}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <h4 className={`${styles.tagGroupTitle} ${styles.relation}`}>
                Relación
              </h4>
              <div className={styles.infoIconWrap} aria-hidden="true">
                <Info size={20} />
                <div className={styles.tooltip}>
                  Las etiquetas de relación sirven para marcar aquellos productos que se utilizan comúnmente con el actual.
                </div>
              </div>
            </div>
            {product?.relation_tags?.length === 0 ? (
              <p className={styles.noTags}>No hay.</p>
            ) : (
              <div className={styles.badgeScrollContainer}>
                <div className={styles.badgeContainer}>
                  {product?.relation_tags?.map((tag) => (
                    <div
                      key={`${tag.tag_id}-RELATION`}
                      className={`${styles.tagBadge} ${styles.badgeRelation}`}
                    >
                      <span>{tag.name}</span>
                      <button
                        type="button"
                        className={styles.removeBadgeBtn}
                        onClick={() =>
                          handleDeleteExistingTag(tag.tag_id, "RELATION")
                        }
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dependencia */}
          <div className={styles.tagGroup}>
            <div
              className={styles.tagGroupHeader}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <h4 className={`${styles.tagGroupTitle} ${styles.dependency}`}>
                Dependencia
              </h4>
              <div className={styles.infoIconWrap} aria-hidden="true">
                <Info size={20} />
                <div className={styles.tooltip}>
                  Las de dependencia indican que es obligatorio que, al agregar un producto a un proyecto, éstos tengan las mismas asignadas de forma descriptiva.
                </div>
              </div>
            </div>
            {product?.dependency_tags?.length === 0 ? (
              <p className={styles.noTags}>No hay.</p>
            ) : (
              <div className={styles.badgeScrollContainer}>
                <div className={styles.badgeContainer}>
                  {product?.dependency_tags?.map((tag) => (
                    <div
                      key={`${tag.tag_id}-DEPENDENCY`}
                      className={`${styles.tagBadge} ${styles.badgeDependency}`}
                    >
                      <span>{tag.name}</span>
                      <button
                        type="button"
                        className={styles.removeBadgeBtn}
                        onClick={() =>
                          handleDeleteExistingTag(tag.tag_id, "DEPENDENCY")
                        }
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.sectionTitle}>Agregar nuevas relaciones</h3>

          <div className={styles.formGroupRow}>
            <button
              type="button"
              className={styles.selectTagButton}
              onClick={() => setIsModalOpen(true)}
            >
              Seleccionar etiqueta
            </button>

            <select
              className={styles.select}
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

            <button
              type="button"
              className={styles.addBtn}
              onClick={handleAddLocalTag}
            >
              Asignar
            </button>
          </div>

          <div className={styles.badgeScrollContainer}>
            <div className={styles.badgeContainer}>
              {tagFields.map((tag, index) => (
                <div
                  key={tag.id}
                  className={`${styles.tagBadge} ${
                    tag.type === "DESCRIPTIVE"
                      ? styles.badgeDescriptive
                      : tag.type === "RELATION"
                      ? styles.badgeRelation
                      : styles.badgeDependency
                  }`}
                >
                  <span>
                    ID: {tag.tag_id} | Tipo: {tag.type}
                  </span>
                  <button
                    type="button"
                    className={styles.removeBadgeBtn}
                    onClick={() => removeTag(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={tagFields.length === 0}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TagSelectorModal
          tags={allTags}
          onSelect={(tag) => {
            setSelectedTag(tag);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </form>
  );
};

export default AddProductTagsForm;
