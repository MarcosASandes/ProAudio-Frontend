import React, { useState } from "react";
import styles from "../../styles/products/productFilter.module.css";
import {
  getDirectionLabel,
  getProductsSortByOptionsLabel,
} from "../../utils/getLabels";

const ProductFilter = ({
  searchTerm,
  onSearchChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionChange,
  selectedTags,
  onRemoveTag,
  onOpenTagsModal,
  sortByOptions = [],
  directionOptions = [],
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* Toggle en móviles */}
      <button
        className={styles.filterToggleBtn}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      <div className={`${styles.container} ${showFilters ? styles.show : ""}`}>
        <div className="row align-items-end">
          {/* Buscador */}
          <div className="col-md-4 mb-2">
            <label htmlFor="txtProductSearcher" className={styles.label}>
              Buscar modelo:
            </label>
            <input
              id="txtProductSearcher"
              type="text"
              className={`form-control ${styles.inputSearch}`}
              placeholder="Modelo de producto..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Fecha desde */}
          {/*<div className="col-md-2 mb-2">
            <label htmlFor="dateProductFrom" className={styles.label}>Fecha desde:</label>
            <input
            id="dateProductFrom"
              type="date"
              className={`form-control ${styles.inputDate}`}
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
            />
          </div>*/}

          {/* Fecha hasta */}
          {/*<div className="col-md-2 mb-2">
            <label htmlFor="dateProductTo" className={styles.label}>Fecha hasta:</label>
            <input
            id="dateProductTo"
              type="date"
              className={`form-control ${styles.inputDate}`}
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
            />
          </div>*/}

          {/* Ordenar por */}
          <div className="col-md-2 mb-2">
            <label htmlFor="slcProductSortBy" className={styles.label}>
              Ordenar por:
            </label>
            <select
              id="slcProductSortBy"
              className={`form-select ${styles.select}`}
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              {sortByOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getProductsSortByOptionsLabel(opt)}
                </option>
              ))}
            </select>
          </div>

          {/* Dirección */}
          <div className="col-md-2 mb-2">
            <label htmlFor="slcProductDirection" className={styles.label}>
              Dirección:
            </label>
            <select
              id="slcProductDirection"
              className={`form-select ${styles.select}`}
              value={direction}
              onChange={(e) => onDirectionChange(e.target.value)}
            >
              {directionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getDirectionLabel(opt)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtro de etiquetas */}
        <div className={`mt-3 ${styles.tagsWrapper}`}>
          <label className={styles.label}>Etiquetas:</label>
          <div className={styles.tagsContainer}>
            {selectedTags?.map((tag) => (
              <span key={tag.tag_id} className={styles.filterBadge}>
                {tag.name}
                <button
                  type="button"
                  className={`btn-close btn-close-white btn-sm ${styles.closeBtnSmall}`}
                  aria-label="Remove"
                  onClick={() => onRemoveTag(tag.tag_id)}
                ></button>
              </span>
            ))}

            <button
              type="button"
              className={styles.addTagBtn}
              onClick={onOpenTagsModal}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
