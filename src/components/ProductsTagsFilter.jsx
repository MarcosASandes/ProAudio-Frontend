import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TagSelectorModal from "./TagSelectorModal";
import { useSelector } from "react-redux";
import { selectTags } from "../features/tags/TagSelector";
import * as bootstrap from "bootstrap";
import "../styles/products.css";

const ProductsTagsFilter = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const tags = useSelector(selectTags); // lista total de etiquetas disponibles

  // abrir el modal
  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  // cuando se selecciona una etiqueta desde el modal, agregarla al estado
  useEffect(() => {
    if (selectedTag && !activeTags.some((t) => t.tag_id === selectedTag.tag_id)) {
      setActiveTags((prev) => [...prev, selectedTag]);
      setSelectedTag(null);
    }
  }, [selectedTag, activeTags]);

  // eliminar etiqueta
  const removeTag = (id) => {
    setActiveTags((prev) => prev.filter((tag) => tag.tag_id !== id));
  };

  return (
    <div className="tags-filter-wrapper d-flex align-items-center justify-content-between w-100">
      <div className="tags-filter-container d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
        {activeTags.map((tag) => (
          <span key={tag.tag_id} className="badge tag-badge">
            {tag.name}
            <span className="remove-tag" onClick={() => removeTag(tag.tag_id)}>✕</span>
          </span>
        ))}
      </div>

      <button
        className="btn btn-tag-add d-flex align-items-center justify-content-center ms-2"
        onClick={showModal}
      >
        <Plus size={18} />
      </button>

      {/* MODAL: debe estar en el DOM para funcionar */}
      <TagSelectorModal tags={tags} onSelect={setSelectedTag} />
    </div>
  );
};

export default ProductsTagsFilter;
