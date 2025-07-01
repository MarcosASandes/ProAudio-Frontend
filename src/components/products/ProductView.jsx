import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import ProductsTable from "./ProductsTable";
import Pagination from "../global/Pagination";
import TagSelectorModal from "../tags/TagSelectorModal";
import useGetAllProducts from "../../hooks/products/useGetAllProducts";
import {
  selectProducts,
  selectProductsPageable,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/ProductSelector";
import { useNavigate } from "react-router-dom";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import { selectTags } from "../../features/tags/TagSelector";
import * as bootstrap from "bootstrap";
import styles from "../../styles/products/productView.module.css";

const ProductView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("asc");
  const [showAdvancedFilterModal, setShowAdvancedFilterModal] = useState(false);

  useGetAllTags(); //Esto es para que si le damos F5 sin querer las etiquetas sigan apareciendo.
  const tags = useSelector(selectTags);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  useGetAllProducts(currentPage, pageSize, selectedTags, sortBy, direction);

  const products = useSelector(selectProducts);
  const pageable = useSelector(selectProductsPageable);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const handleAddTag = (tag) => {
    if (!selectedTags.find((t) => t.tag_id === tag.tag_id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagsModal(false);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((t) => t.tag_id !== tagId));
  };

  const handleGoToCreate = () => {
    navigate("/product/create");
  };

  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  return (
    <div className={`container my-4`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Productos</h1>
        <button className={`btn ${styles.btnPurple}`} onClick={handleGoToCreate}>
          Crear producto
        </button>
      </div>
      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTags={selectedTags}
        onAddTag={() => setShowTagsModal(true)}
        onRemoveTag={handleRemoveTag}
        onOpenAdvancedFilter={() => setShowAdvancedFilterModal(true)}
        onOpenTagsModal={showModal}
      />
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ProductsTable products={products} searchTerm={searchTerm} />
      )}
      {/* ✅ Ahora le pasas setCurrentPage a la paginación */}
      <Pagination pageable={pageable} onPageChange={setCurrentPage} />
        <TagSelectorModal tags={tags} onSelect={handleAddTag} />

      {showAdvancedFilterModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filtros avanzados</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAdvancedFilterModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="sortBy" className="form-label">
                    Ordenar por
                  </label>
                  <select
                    id="sortBy"
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="id">ID</option>
                    <option value="brand">Brand</option>
                    <option value="model">Model</option>
                    <option value="items">Items</option>
                    <option value="available">Available</option>
                    <option value="comments">Comments</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="direction" className="form-label">
                    Dirección
                  </label>
                  <select
                    id="direction"
                    className="form-select"
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                  >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAdvancedFilterModal(false)}
                >
                  Cerrar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    console.log(`Ordenar por: ${sortBy} (${direction})`);
                    setShowAdvancedFilterModal(false);
                    setCurrentPage(1);
                  }}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
