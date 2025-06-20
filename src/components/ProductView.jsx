/*import React, { useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import TagSelectorModal from "../components/TagSelectorModal";
import * as bootstrap from "bootstrap";
import productsMockData from "../mock/productsMockData";

const ProductView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleAddTag = (tag) => {
    if (!selectedTags.find((t) => t.tag_id === tag.tag_id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((t) => t.tag_id !== tagId));
  };

  const showModal = () => {
    const modalEl = document.getElementById("tagSelectorModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Productos</h1>
        <button className="btn btn-primary">Crear producto</button>
      </div>

      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTags={selectedTags}
        onAddTag={showModal}
        onRemoveTag={handleRemoveTag}
      />

      <ProductsTable products={productsMockData} searchTerm={searchTerm} />

      <Pagination />

      <TagSelectorModal onSelect={handleAddTag} />
    </div>
  );
};

export default ProductView;*/

/* */

/*import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductFilter from "../components/ProductFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import TagSelectorModal from "../components/TagSelectorModal";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import {
  selectProducts,
  selectProductsPageable,
  selectProductsLoading,
  selectProductsError,
} from "../features/products/ProductSelector";
import { useNavigate } from "react-router-dom";

const ProductView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  

  const navigate = useNavigate();

  // ✅ Llamada a la API al montar
  useGetAllProducts();

  // ✅ Obtiene productos y paginación de la store
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

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Productos</h1>
        <button className="btn btn-primary" onClick={handleGoToCreate}>Crear producto</button>
      </div>

      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTags={selectedTags}
        onAddTag={() => setShowTagsModal(true)}
        onRemoveTag={handleRemoveTag}
      />

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ProductsTable products={products} searchTerm={searchTerm} />
      )}

      <Pagination pageable={pageable} />

      {showTagsModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccionar etiqueta</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTagsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <TagSelectorModal tags={null} onSelect={handleAddTag} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;*/

/*--------------------- */

/*import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductFilter from "../components/ProductFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import TagSelectorModal from "../components/TagSelectorModal";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import {
  selectProducts,
  selectProductsPageable,
  selectProductsLoading,
  selectProductsError,
} from "../features/products/ProductSelector";
import { useNavigate } from "react-router-dom";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import { selectTags } from "../features/tags/TagSelector";

const ProductView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [sortBy, setSortBy] = useState(""); // campo a ordenar
  const [direction, setDirection] = useState("asc"); // asc o desc
  const [showAdvancedFilterModal, setShowAdvancedFilterModal] = useState(false);

  useGetAllTags(); //Esto es para que si le damos F5 sin querer las etiquetas sigan apareciendo.
  const tags = useSelector(selectTags);

  // 🚩 NUEVO estado para página actual
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // fijo por ahora

  const navigate = useNavigate();

  // ✅ Llamada a la API al montar
  useGetAllProducts(currentPage, pageSize);

  // ✅ Obtiene productos y paginación de la store
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

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Productos</h1>
        <button className="btn btn-primary" onClick={handleGoToCreate}>
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
      />
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ProductsTable products={products} searchTerm={searchTerm} />
      )}
      
      <Pagination pageable={pageable} onPageChange={setCurrentPage} />
      

      <div className="modal fade" id="tagSelectorModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Seleccionar etiqueta</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <TagSelectorModal tags={tags} onSelect={handleAddTag} />
            </div>
          </div>
        </div>
      </div>

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
                    // Aquí puedes agregar lógica extra si necesitas guardar o llamar la API
                    console.log(`Ordenar por: ${sortBy} (${direction})`);
                    setShowAdvancedFilterModal(false);
                    setCurrentPage(1); // Opcional: reinicia a la página 1
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

/*----------------------- */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductFilter from "../components/ProductFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import TagSelectorModal from "../components/TagSelectorModal";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import {
  selectProducts,
  selectProductsPageable,
  selectProductsLoading,
  selectProductsError,
} from "../features/products/ProductSelector";
import { useNavigate } from "react-router-dom";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import { selectTags } from "../features/tags/TagSelector";
import * as bootstrap from "bootstrap";

const ProductView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("asc");
  const [showAdvancedFilterModal, setShowAdvancedFilterModal] = useState(false);

  useGetAllTags(); //Esto es para que si le damos F5 sin querer las etiquetas sigan apareciendo.
  const tags = useSelector(selectTags);

  // 🚩 NUEVO estado para página actual
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // fijo por ahora

  const navigate = useNavigate();

  useGetAllProducts(currentPage, pageSize, selectedTags, sortBy, direction);

  // ✅ Obtiene productos y paginación de la store
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
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Productos</h1>
        <button className="btn btn-primary" onClick={handleGoToCreate}>
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
      {/* 
      {showTagsModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccionar etiqueta</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTagsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <TagSelectorModal tags={null} onSelect={handleAddTag} />
              </div>
            </div>
          </div>
        </div>
      )}
        */}

      

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
                    // Aquí puedes agregar lógica extra si necesitas guardar o llamar la API
                    console.log(`Ordenar por: ${sortBy} (${direction})`);
                    setShowAdvancedFilterModal(false);
                    setCurrentPage(1); // Opcional: reinicia a la página 1
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
