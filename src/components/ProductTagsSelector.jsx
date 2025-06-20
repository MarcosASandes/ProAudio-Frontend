import TagSelectorModal from "./TagSelectorModal";
import { useEffect } from "react";
import * as bootstrap from "bootstrap";

export default function ProductTagsSelector({
  appendTag,
  removeTag,
  tagFields,
  selectedType,
  setSelectedType,
  selectedTag,
  setSelectedTag,
}) {
  useEffect(() => {
    if (selectedTag) {
      appendTag({
        tag_id: selectedTag.tag_id,
        type: selectedType,
      });

      // Cerrar modal después de agregar
      const modalEl = document.getElementById("tagSelectorModal");
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      }

      setSelectedTag(null);
    }
  }, [selectedTag]);

  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label text-light fw-semibold">Etiquetas</label>
      <div className="d-flex flex-column flex-md-row align-items-start gap-2 mb-2">
        <button
          type="button"
          className="btn btn-purple-style"
          onClick={showModal}
        >
          Seleccionar etiqueta
        </button>
        <select
          className="form-select w-auto"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="DESCRIPTIVE">Descriptiva</option>
          <option value="RELATIVE">Relativa</option>
        </select>
      </div>

      {tagFields.map((tag, index) => (
        <div
          key={tag.id}
          className="d-flex align-items-center gap-2 mb-1"
        >
          <span className="text-light">
            ID: {tag.tag_id} | Tipo: {tag.type}
          </span>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => removeTag(index)}
          >
            Quitar
          </button>
        </div>
      ))}

      {/* Modal que NO necesita props de tags */}
      <TagSelectorModal onSelect={setSelectedTag} />
    </div>
  );
}
