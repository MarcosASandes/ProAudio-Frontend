import { useRef, useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import TagsTree from "./TagsTree";

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
    onSelect(selectedTag); // Envío al componente padre
  };

  const handleConfirmFatherNull = () => {
    setSelectedTag(null);
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    onSelect(selectedTag);
  }

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
      id="tagSelectorModal"
    >
      <div className="modal-dialog modal-dialog-centered custom-modal-width">
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
            <TagsTree
              /*tags={tags}*/
              onSelectTag={handleSelectTag}
              selectionOnly={true}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
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
}
