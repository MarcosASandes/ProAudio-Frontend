import * as bootstrap from "bootstrap";
import styles from "../../styles/products/productFilter.module.css";

export default function ProductFilter({
  searchTerm,
  onSearchChange,
  selectedTags,
  onAddTag,
  onRemoveTag,
  onOpenAdvancedFilter,
  onOpenTagsModal,
}) {
  return (
    <div className="mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input type="date" className="form-control" />
        </div>

        <div className="col-md-3">
          <input type="date" className="form-control" />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-secondary w-100"
            onClick={onOpenAdvancedFilter} // ✅ usa la prop
          >
            Filtros avanzados
          </button>
        </div>
      </div>

      <div className="mt-3">
        {selectedTags?.map((tag) => (
          <span
            key={tag.tag_id}
            className={styles.filterBadge}
            style={{ fontSize: "0.9rem", paddingRight: "0.5rem" }}
          >
            {tag.name}
            <button
              type="button"
              className={`btn-close btn-close-white btn-sm ${styles.closeBtnSmall}`}
              aria-label="Remove"
              style={{ fontSize: "0.6rem" }}
              onClick={() => onRemoveTag(tag.tag_id)}
            ></button>
          </span>
        ))}

        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={onOpenTagsModal}
        >
          +
        </button>
      </div>
    </div>
  );
}
