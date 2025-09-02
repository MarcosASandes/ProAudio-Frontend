import React, { useState, useRef } from "react";
import TagNode from "./TagNode";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import useDeleteTag from "../../hooks/tags/useDeleteTag";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import styles from "../../styles/tags/tagsTree.module.css";
import { getEnabledDisabledLabel } from "../../utils/getLabels";

const TagsTree = ({ onSelectTag = null }) => {
  useGetAllTags(true);
  const tags = useSelector(selectTags);
  const [selectedPath, setSelectedPath] = useState([]);
  const modalRef = useRef();
  const confirmDeleteRef = useRef();
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const deleteTag = useDeleteTag();

  const getSubNodes = (padreId) =>
    tags.filter((etq) => etq.father_id === padreId);

  const getRoot = () => tags.filter((etq) => etq.father_id === null);

  const manageSelection = (etiqueta, nivel) => {
    const newPath = [...selectedPath.slice(0, nivel), etiqueta];
    setSelectedPath(newPath);
    if (onSelectTag) onSelectTag(etiqueta);
  };

  const handleModifyClick = () => {
    if (!selectedTag) return;
    const modalEl = document.getElementById("tagDetailModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    navigate(`/tag/edit/${selectedTag.tag_id}`);
  };

  const levels = [];
  if (selectedPath.length === 0) {
    levels.push(getRoot());
  } else {
    for (let i = 0; i < selectedPath.length; i++) {
      const actual = selectedPath[i];
      levels.push(getSubNodes(actual.father_id ?? null));
    }
    const ultima = selectedPath[selectedPath.length - 1];
    const hijasUltima = getSubNodes(ultima.tag_id);
    if (hijasUltima.length > 0) levels.push(hijasUltima);
  }

  const selectedTag = selectedPath[selectedPath.length - 1];

  const handleDelete = async () => {
    if (!selectedTag) return;

    const success = await deleteTag(selectedTag.tag_id);

    if (success) {
      setShowConfirmDeleteModal(false);
      setShowDetailsModal(false);

      setSelectedPath([]);
    }
  };

  return (
    <div className="container py-4">
      <div className={`mb-3 ${styles.tagsTree}`}>
        {levels?.map((grupo, i) => (
          <div
            key={i}
            className={`d-flex flex-wrap gap-2 mb-2 ${styles.tagRow}`}
          >
            {grupo?.map((etq) => {
              const estaSeleccionada = selectedPath[i]?.tag_id === etq.tag_id;
              const hijas = getSubNodes(etq.tag_id);
              return (
                <TagNode
                  key={etq.tag_id}
                  tag={etq}
                  isRoot={etq.father_id === null}
                  isSelected={estaSeleccionada}
                  haveNodes={hijas.length > 0}
                  onClick={() => manageSelection(etq, i)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {!onSelectTag && (
        <>
          <button
            className={styles.actionButton}
            disabled={!selectedTag}
            onClick={() => setShowDetailsModal(true)}
          >
            Ver detalles
          </button>

          {/* Modal de detalles */}
          {showDetailsModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <h5 className={styles.modalTitle}>
                    {selectedTag?.name || "Etiqueta"}
                  </h5>
                  <button
                    className={styles.closeButton}
                    onClick={() => setShowDetailsModal(false)}
                  >
                    ×
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <p>
                    <strong>ID:</strong> {selectedTag?.tag_id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {selectedTag?.name}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {selectedTag?.description || "Sin descripción"}
                  </p>
                  <p>
                    <strong>Estado:</strong>{" "}
                    {getEnabledDisabledLabel(selectedTag?.status)}
                  </p>
                </div>
                <div className={styles.modalFooter}>
                  <button
                    className={styles.actionButton}
                    onClick={handleModifyClick}
                  >
                    Modificar
                  </button>
                  <button
                    className={styles.dangerButton}
                    onClick={() => setShowConfirmDeleteModal(true)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal  de eliminación */}
          {showConfirmDeleteModal && (
            <div className={styles.deleteModalOverlay}>
              <div className={styles.deleteModal}>
                <h2 className={styles.deleteModalTitle}>
                  ⚠️ Eliminar etiqueta
                </h2>
                <p className={styles.deleteModalText}>
                  Si tienes artículos categorizados con esta etiqueta no podrás
                  eliminarla. <br />
                  <strong>¿Seguro/a que deseas continuar?</strong>
                </p>
                <div className={styles.deleteModalActions}>
                  <button
                    onClick={() => setShowConfirmDeleteModal(false)}
                    className={styles.cancelButton}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className={styles.confirmDeleteButton}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TagsTree;
