import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TagSelectorModal from "./../tags/TagSelectorModal";
import { useSelector } from "react-redux";
import { selectTags } from "../../features/tags/TagSelector";
import * as bootstrap from "bootstrap";
import styles from "../../styles/products/productsTagsFilter.module.css";

const ProductsTagsFilter = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const tags = useSelector(selectTags);

  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  useEffect(() => {
    if (selectedTag && !activeTags.some((t) => t.tag_id === selectedTag.tag_id)) {
      setActiveTags((prev) => [...prev, selectedTag]);
      setSelectedTag(null);
    }
  }, [selectedTag, activeTags]);

  const removeTag = (id) => {
    setActiveTags((prev) => prev.filter((tag) => tag.tag_id !== id));
  };

  return (
    <div className={`${styles.tagsFilterWrapper} d-flex align-items-center justify-content-between w-100`}>
      <div className={`${styles.tagsFilterContainer} d-flex align-items-center gap-2 flex-grow-1 flex-wrap`}>
        {activeTags?.map((tag) => (
          <span key={tag.tag_id} className={`${styles.tagBadge}`}>
            {tag.name}
            <span className={styles.removeTag} onClick={() => removeTag(tag.tag_id)}>✕</span>
          </span>
        ))}
      </div>

      <button
        className={`${styles.btnTagAdd} btn d-flex align-items-center justify-content-center ms-2`}
        onClick={showModal}
      >
        <Plus size={18} />
      </button>


      <TagSelectorModal tags={tags} onSelect={setSelectedTag} />
    </div>
  );
};

export default ProductsTagsFilter;
