/*import React, { useState } from "react";
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
import {
  getDirectionLabel,
  getProductsSortByOptionsLabel,
} from "../../utils/getLabels";

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

  //ToDo: Consumir desde el backend
  const sortByOptions = ["id", "brand", "model"];
  //ToDo: Consumir desde el backend
  const directionOptions = ["asc", "desc"];

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
        <button
          className={`btn ${styles.btnPurple}`}
          onClick={handleGoToCreate}
        >
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
                    <option value="">Seleccionar</option>
                    {sortByOptions?.map((opt) => (
                      <option key={opt} value={opt}>
                        {getProductsSortByOptionsLabel(opt)}
                      </option>
                    ))}
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
                    {directionOptions?.map((opt) => (
                      <option key={opt} value={opt}>
                        {getDirectionLabel(opt)}
                      </option>
                    ))}
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

export default ProductView;*/

/*----------------------------------------------------- */

/*import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import ProductsTable from "./ProductsTable";
import Pagination from "../global/Pagination";
import TagSelectorModal from "../tags/TagSelectorModal";
import useGetAllProducts from "../../hooks/products/useGetAllProducts";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import {
  selectProducts,
  selectProductsPageable,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/ProductSelector";
import { selectTags } from "../../features/tags/TagSelector";
import styles from "../../styles/products/productView.module.css";
import {
  getDirectionLabel,
  getProductsSortByOptionsLabel,
} from "../../utils/getLabels";
import { useNavigate } from "react-router-dom";

const ProductView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showAdvancedFilterModal, setShowAdvancedFilterModal] = useState(false);
  const [page, setPage] = useState(1);
  const size = 10;

  const navigate = useNavigate();

  useGetAllTags();
  const tags = useSelector(selectTags);

  useGetAllProducts(page, size, selectedTags, sortBy, direction);
  const products = useSelector(selectProducts);
  const pageable = useSelector(selectProductsPageable);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const sortByOptions = ["id", "brand", "model"];
  const directionOptions = ["desc", "asc"];

  const handleAddTag = (tag) => {
    if (!selectedTags.find((t) => t.tag_id === tag.tag_id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagsModal(false);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((t) => t.tag_id !== tagId));
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, selectedTags]);

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h2 className={styles.title}>Productos</h2>
        <button
          className={styles.createButton}
          onClick={() => navigate("/product/create")}
        >
          Crear producto
        </button>
      </div>

      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        selectedTags={selectedTags}
        onRemoveTag={handleRemoveTag}
        onOpenTagsModal={() => setShowTagsModal(true)}
        sortByOptions={sortByOptions}
        directionOptions={directionOptions}
      />

      
      <div className={styles.tableWrapper}>
        {loading && <p>Cargando productos...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ProductsTable products={products} searchTerm={searchTerm} />
        )}
      </div>

   
      <div className={styles.paginationWrapper}>
        <Pagination pageable={pageable} onPageChange={setPage} />
      </div>

      
      {showTagsModal && (
        <TagSelectorModal
          tags={tags}
          onSelect={handleAddTag}
          onClose={() => setShowTagsModal(false)}
        />
      )}

     
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
                    {sortByOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {getProductsSortByOptionsLabel(opt)}
                      </option>
                    ))}
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
                    {directionOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {getDirectionLabel(opt)}
                      </option>
                    ))}
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
                    setShowAdvancedFilterModal(false);
                    setPage(1);
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

export default ProductView;*/


/*------------------------------------------------------------ */


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import ProductsTable from "./ProductsTable";
import Pagination from "../global/Pagination";
import TagSelectorModal from "../tags/TagSelectorModal";
import useGetAllProducts from "../../hooks/products/useGetAllProducts";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import {
  selectProducts,
  selectProductsPageable,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/ProductSelector";
import { selectTags } from "../../features/tags/TagSelector";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/products/productView.module.css";

const ProductView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [page, setPage] = useState(1);
  const size = 10;

  const navigate = useNavigate();

  // Hooks para obtener datos
  useGetAllTags();
  const tags = useSelector(selectTags);

  useGetAllProducts(page, size, selectedTags, sortBy, direction, searchTerm, dateFrom, dateTo);
  const products = useSelector(selectProducts);
  const pageable = useSelector(selectProductsPageable);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const sortByOptions = ["id", "brand", "model"];
  const directionOptions = ["desc", "asc"];

  const handleAddTag = (tag) => {
    if (!selectedTags.find((t) => t.tag_id === tag.tag_id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagsModal(false);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((t) => t.tag_id !== tagId));
  };

  // Reset página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [searchTerm, dateFrom, dateTo, selectedTags, sortBy, direction]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Productos</h2>
        <button
          className={styles.createButton}
          onClick={() => navigate("/product/create")}
        >
          Crear producto
        </button>
      </div>

      {/* Filtros */}
      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        selectedTags={selectedTags}
        onRemoveTag={handleRemoveTag}
        onOpenTagsModal={() => setShowTagsModal(true)}
        sortByOptions={sortByOptions}
        directionOptions={directionOptions}
      />

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        {loading && <p>Cargando productos...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ProductsTable products={products} searchTerm={searchTerm} />
        )}
      </div>

      {/* Paginación */}
      <div className={styles.paginationWrapper}>
        <Pagination pageable={pageable} onPageChange={setPage} />
      </div>

      {/* Modal de etiquetas */}
      {showTagsModal && (
        <TagSelectorModal
          tags={tags}
          onSelect={handleAddTag}
          onClose={() => setShowTagsModal(false)}
        />
      )}
    </div>
  );
};

export default ProductView;
