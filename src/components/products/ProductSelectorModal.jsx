import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetAllProducts from "../../hooks/products/useGetAllProducts";
import Pagination from "../global/Pagination";
import styles from "../../styles/products/productSelectorModal.module.css";
import {
  selectProducts,
  selectProductsPageable,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/ProductSelector";
import { useMemo } from "react";
import { Target } from "lucide-react";
import TagSelectorModal from "../tags/TagSelectorModal";

const ProductSelectorModal = ({ onClose, onSelect }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const size = 10;
  useGetAllProducts(page, size, selectedTags, sortBy, direction, searchTerm);

  const products = useSelector(selectProducts);
  const pageable = useSelector(selectProductsPageable);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, dateFrom, dateTo, selectedTags, sortBy, direction]);

  const handleConfirmSelection = () => {
    if (selectedProduct) {
      onSelect(selectedProduct);
    }
  };

  const handleAddTag = (tag) => {
    if (!selectedTags.some((t) => t.tag_id === tag.tag_id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagsModal(false);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((t) => t.tag_id !== tagId));
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Seleccionar producto</h2>
          </div>

          {/* Body */}
          <div className={styles.modalBody}>
            {/* Mobile: botón para abrir filtros */}
            <div className={styles.mobileFiltersButton}>
              <button className={styles.mobileFiltersButtonStyles} onClick={() => setShowFiltersModal(true)}>
                Filtros
              </button>
            </div>

            <div className={styles.filtersDesktop}>
              {/* Filtros */}
              <div className={styles.filters}>
                <input
                  type="text"
                  placeholder="Buscar modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.inputSearch}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.select}
                >
                  <option className={styles.selectOption} value="id">
                    ID
                  </option>
                  <option className={styles.selectOption} value="brand">
                    Marca
                  </option>
                  <option className={styles.selectOption} value="model">
                    Modelo
                  </option>
                </select>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className={styles.select}
                >
                  <option className={styles.selectOption} value="desc">
                    Descendente
                  </option>
                  <option className={styles.selectOption} value="asc">
                    Ascendente
                  </option>
                </select>
              </div>
            </div>

            {/* NUEVO: filtro de etiquetas */}
            <div className={`${styles.tagsWrapper} mt-1`}>
              <div className={styles.tagsContainer}>
                {selectedTags.map((tag) => (
                  <span key={tag.tag_id} className={styles.filterBadge}>
                    {tag.name}
                    <button
                      type="button"
                      className={`btn-close btn-close-white btn-sm ${styles.closeBtnSmall}`}
                      aria-label="Remove"
                      onClick={() => handleRemoveTag(tag.tag_id)}
                    ></button>
                  </span>
                ))}
                <button
                  type="button"
                  className={styles.addTagBtn}
                  onClick={() => setShowTagsModal(true)}
                >
                  +
                </button>
              </div>
            </div>

            {loading && (
              <p className={styles.loadingText}>Cargando productos...</p>
            )}
            {error && <p className={styles.errorText}>{error}</p>}

            {!loading && !error && (
              <>
                {/* Tabla */}
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product) => (
                        <tr
                          key={product.id}
                          className={
                            selectedProduct?.id === product.id
                              ? styles.selectedRow
                              : ""
                          }
                        >
                          <td>{product.id}</td>
                          <td>{product.brand ? product.brand : "-"}</td>
                          <td>{product.model ? product.model : "-"}</td>
                          <td>
                            <button
                              className={`${styles.selectRowButton} ${
                                selectedProduct?.id ===
                                product.id
                                  ? styles.selectedButtonStyle
                                  : ""
                              }`}
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Target size={16} /> Seleccionar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination pageable={pageable} onPageChange={setPage} />
              </>
            )}
          </div>

          {/* Footer */}
          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmSelection}
              disabled={!selectedProduct}
            >
              Confirmar selección
            </button>
          </div>
        </div>
      </div>

      {/* Modal de etiquetas */}
      {showTagsModal && (
        <TagSelectorModal
          onSelect={handleAddTag}
          onClose={() => setShowTagsModal(false)}
        />
      )}

      {showFiltersModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.filtersModalContent}>
            <h3 className={styles.filtersModalTitle}>Filtros</h3>

            <div className={styles.filters}>
              <input
                type="text"
                placeholder="Buscar modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.inputSearch}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.select}
              >
                <option className={styles.selectOption} value="id">
                  ID
                </option>
                <option className={styles.selectOption} value="brand">
                  Marca
                </option>
                <option className={styles.selectOption} value="model">
                  Modelo
                </option>
              </select>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className={styles.select}
              >
                <option className={styles.selectOption} value="desc">
                  Descendente
                </option>
                <option className={styles.selectOption} value="asc">
                  Ascendente
                </option>
              </select>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.filtersModalBtnClose} onClick={() => setShowFiltersModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSelectorModal;
