/*import { useRef, useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";

export default function TagSelectorModal({ tags, onSelect }) {
  const modalRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      new bootstrap.Modal(modalRef.current, { backdrop: "static" });
    }
  }, []);

  // Esta función recibe la etiqueta que selecciona el usuario en TagsTree
  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  // Cuando el usuario confirma la selección
  const handleConfirmSelection = () => {
    if (!selectedTag) return;
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onSelect(selectedTag);
  };

  const handleConfirmFatherNull = () => {
    setSelectedTag(null);
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onSelect(selectedTag);
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
      id="tagSelectorModal"
    >
      <div
        className={`modal-dialog modal-dialog-centered ${styles.customModalWidth}`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar etiqueta padre</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <TagsTree onSelectTag={handleSelectTag} selectionOnly={true} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!selectedTag}
              onClick={handleConfirmSelection}
            >
              Seleccionar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleConfirmFatherNull}
            >
              Convertir en etiqueta base
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}*/


/*------------------------------------- */


/*import { useRef, useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";
import stylesButtons from "../../styles/generic/buttonsStyles.module.css";

export default function TagSelectorModal({ tags, show, onSelect, onClose }) {
  const modalRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);

  // Inicializa y muestra/oculta modal según prop `show`
  useEffect(() => {
    if (!modalRef.current) return;
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });
    if (show) modalInstance.show();
    else modalInstance.hide();
  }, [show]);

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleConfirmSelection = () => {
    if (!selectedTag) return;
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onSelect(selectedTag);
    onClose?.();
    setSelectedTag(null);
  };

  const handleCancel = () => {
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onClose?.();
    setSelectedTag(null);
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
      id="tagSelectorModal"
    >
      <div className={`modal-dialog modal-dialog-centered ${styles.customModalWidth}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar etiqueta</h5>
            <button type="button" className="btn-close" onClick={handleCancel}></button>
          </div>
          <div className="modal-body">
            <TagsTree onSelectTag={handleSelectTag} selectionOnly={true} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
            <button
              type="button"
              className={`btn ${stylesButtons.btnPurple}`}
              disabled={!selectedTag}
              onClick={handleConfirmSelection}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}*/


/*---------------------------------------- */


/*import { useRef, useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";

export default function TagSelectorModal({ tags, onSelect, onClose }) {
  const modalRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);

  // Abrir modal automáticamente al montarse
  useEffect(() => {
    if (!modalRef.current) return;

    const modal = new bootstrap.Modal(modalRef.current, { backdrop: "static" });
    modal.show();

    // Cuando se oculta, llamar a onClose para actualizar el estado en el padre
    const handleHidden = () => {
      onClose();
    };

    modalRef.current.addEventListener("hidden.bs.modal", handleHidden);

    return () => {
      modalRef.current.removeEventListener("hidden.bs.modal", handleHidden);
      modal.hide();
    };
  }, []);

  // Selección en TagsTree
  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleConfirmSelection = () => {
    if (!selectedTag) return;
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onSelect(selectedTag);
  };

  const handleConvertToBase = () => {
    setSelectedTag(null);
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onSelect(null);
  };

  return (
    <div
      className={`modal fade ${styles.customModal}`}
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-centered ${styles.modalDialog}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar etiqueta</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                const modal = bootstrap.Modal.getInstance(modalRef.current);
                modal.hide();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <TagsTree onSelectTag={handleSelectTag} selectionOnly={true} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => bootstrap.Modal.getInstance(modalRef.current)?.hide()}>
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              disabled={!selectedTag}
              onClick={handleConfirmSelection}
            >
              Seleccionar
            </button>
            <button className="btn btn-outline-primary" onClick={handleConvertToBase}>
              Convertir en etiqueta base
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}*/

/*----------------------------------------------- */


/*import React, { useState, useRef, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";

export default function TagSelectorModal({ tags, onSelect, onClose }) {
  const modalRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      const modalInstance = new bootstrap.Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      modalInstance.show();
    }
  }, []);

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleConfirmSelection = () => {
    if (selectedTag) {
      onSelect(selectedTag);
      const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
      modalInstance.hide();
    }
  };

  const handleCancel = () => {
    onClose();
    const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
    modalInstance.hide();
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles.modalContent}`}>
          <div className={`modal-header ${styles.modalHeader}`}>
            <h5 className={styles.modalTitle}>Seleccionar etiqueta</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCancel}
            ></button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.tagsTreeWrapper}>
              <TagsTree onSelectTag={handleSelectTag} />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={`btn ${styles.cancelButton}`}
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              className={`btn ${styles.selectButton}`}
              disabled={!selectedTag}
              onClick={handleConfirmSelection}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}*/

/*-------------------------------------------- */












/*import React, { useState, useRef, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";

export default function TagSelectorModal({ tags, onSelect, onClose }) {
  const modalRef = useRef();
  const modalInstanceRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstanceRef.current = new bootstrap.Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      modalInstanceRef.current.show();
    }

    return () => {
      // Al desmontar, destruir la instancia para eliminar backdrop
      modalInstanceRef.current?.dispose();
    };
  }, []);

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleConfirmSelection = () => {
    if (selectedTag) {
      onSelect(selectedTag);
      modalInstanceRef.current?.hide();
    }
  };

  const handleCancel = () => {
    onClose();
    modalInstanceRef.current?.hide();
  };

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles.modalContent}`}>
          <div className={`modal-header ${styles.modalHeader}`}>
            <h5 className={styles.modalTitle}>Seleccionar etiqueta</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCancel}
            ></button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.tagsTreeWrapper}>
              <TagsTree onSelectTag={handleSelectTag} />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button className={`btn ${styles.cancelButton}`} onClick={handleCancel}>
              Cancelar
            </button>
            <button
              className={`btn ${styles.selectButton}`}
              disabled={!selectedTag}
              onClick={handleConfirmSelection}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}*/





/*------------------------------------------------ */


/*import React, { useRef, useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";

const TagSelectorModal = ({ tags, onSelect, onClose }) => {
  const modalRef = useRef();
  const [selectedTag, setSelectedTag] = useState(null);
  const [modalInstance, setModalInstance] = useState(null);

  // Inicializamos el modal al montar el componente
  useEffect(() => {
    if (modalRef.current) {
      const modal = new bootstrap.Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      setModalInstance(modal);
      modal.show();

      // Cerramos modal al desmontar
      return () => modal.hide();
    }
  }, []);

  // Cuando se confirma la selección
  const handleConfirmSelection = () => {
    if (!selectedTag) return;
    modalInstance.hide();
    onSelect(selectedTag);
  };

  // Cuando se cancela
  const handleCancel = () => {
    modalInstance.hide();
    onClose();
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-centered`}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>Seleccionar etiqueta</h5>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.tagsTreeWrapper}>
              <TagsTree onSelectTag={setSelectedTag} />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={styles.selectButton}
              disabled={!selectedTag}
              onClick={handleConfirmSelection}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSelectorModal;*/

/*-------------------------------------------- */












/*import React, { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";
import styles from "../../styles/tags/tagSelectorModal.module.css";

const TagSelectorModal = ({ onSelect, onClose }) => {
  const modalRef = useRef(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      const modal = new bootstrap.Modal(modalRef.current, {
        backdrop: true,
        keyboard: true,
      });
      modal.show();

      return () => {
        modal.hide();
      };
    }
  }, []);

  const handleCancel = () => {
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onClose?.();
  };

  const handleSelect = () => {
    if (!selectedTag) return;
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onSelect(selectedTag);
  };

  return (
    <div
      className={`modal fade ${styles.modalFade}`}
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-centered ${styles.modalDialog}`}>
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
    </div>
  );
};

export default TagSelectorModal;*/













/*------------------------------------------------- */

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

