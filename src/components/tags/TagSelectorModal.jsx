import React, { useState } from "react";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";

const TagSelectorModal = ({ onSelect, onClose }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSelect = () => {
    if (!selectedTag) return;
    onSelect(selectedTag);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Seleccionar etiqueta</h5>
        </div>

        <div className={styles.modalBody}>
          <TagsTree onSelectTag={setSelectedTag} />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancelar
          </button>
          <button
            className={styles.selectButton}
            disabled={!selectedTag}
            onClick={handleSelect}
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSelectorModal;

