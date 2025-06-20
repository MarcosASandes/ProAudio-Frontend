/*import React from "react";
import { ChevronDown, Plus } from "lucide-react";
import "../styles/products.css";

const ProductFilter = () => {
  return (
    <div className="product-filter d-flex align-items-center justify-content-between gap-3 w-100">
      
      <input
        type="text"
        className="form-control form-control-sm search-input"
        placeholder="Buscar por marca o modelo..."
      />

      <div className="d-flex gap-2 align-items-center">
        <button className="btn btn-outline-light btn-sm rounded-pill d-flex align-items-center gap-1">
          desde: Hoy <ChevronDown size={14} />
        </button>
        <button className="btn btn-outline-light btn-sm rounded-pill d-flex align-items-center gap-1">
          hasta: 27/06/2025 <ChevronDown size={14} />
        </button>
      </div>

      <button className="btn btn-purple d-flex align-items-center gap-1 btn-sm px-3 py-2">
        Crear <Plus size={16} />
      </button>
    </div>
  );
};

export default ProductFilter;*/

/*---------------------- */

/*ORIGINA ANTERIOR */

/*import React from "react";
import { ChevronDown, Plus } from "lucide-react";
import "../styles/products.css";

const ProductFilter = ({ search, setSearch }) => {
  return (
    <div className="product-filter d-flex align-items-center justify-content-between gap-3 w-100">
      
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control form-control-sm search-input"
        placeholder="Buscar por marca o modelo..."
      />

      <div className="d-flex gap-2 align-items-center">
        <button className="btn btn-outline-light btn-sm rounded-pill d-flex align-items-center gap-1">
          desde: Hoy <ChevronDown size={14} />
        </button>
        <button className="btn btn-outline-light btn-sm rounded-pill d-flex align-items-center gap-1">
          hasta: 27/06/2025 <ChevronDown size={14} />
        </button>
      </div>

      <button className="btn btn-purple d-flex align-items-center gap-1 btn-sm px-3 py-2">
        Crear <Plus size={16} />
      </button>
    </div>
  );
};

export default ProductFilter;*/

/*CAMBIADO A PRODUCTFILTER PARA PROBAR */

// components/ProductFilters.jsx

/*import React from "react";

const ProductFilters = () => {
  return (
    <div className="card mb-4 p-3">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label htmlFor="search" className="form-label">
            Buscar producto
          </label>
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Buscar..."
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="startDate" className="form-label">
            Fecha desde
          </label>
          <input type="date" id="startDate" className="form-control" />
        </div>

        <div className="col-md-3">
          <label htmlFor="endDate" className="form-label">
            Fecha hasta
          </label>
          <input type="date" id="endDate" className="form-control" />
        </div>

        <div className="col-md-2">
          <button className="btn btn-secondary w-100">Filtros avanzados</button>
        </div>
      </div>

      <div className="mt-3 d-flex align-items-center">
        <span className="me-2">Etiquetas:</span>
        
        <button className="btn btn-outline-primary btn-sm">+</button>
      </div>
    </div>
  );
};

export default ProductFilters;*/

/*-------------------- */

/*import React from "react";

const ProductFilter = ({ searchTerm, onSearchChange }) => {
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
          <button className="btn btn-secondary w-100">Filtros avanzados</button>
        </div>
      </div>

      <div className="mt-3">
        <div className="d-inline-block border p-2 rounded me-2">
          
          <span>Etiqueta 1</span>
        </div>
        <button className="btn btn-outline-primary btn-sm">+</button>
      </div>
    </div>
  );
};

export default ProductFilter;*/

/*-------------------------- */

/*import React from "react";

const ProductFilter = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onOpenTagsModal,
}) => {
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
          <button className="btn btn-secondary w-100">Filtros avanzados</button>
        </div>
      </div>

      <div className="mt-3">
        {selectedTags.map((tag) => (
          <div
            key={tag.tag_id}
            className="d-inline-block border p-2 rounded me-2"
          >
            {tag.name}
          </div>
        ))}

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={onOpenTagsModal}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;*/

/*-------------------------------- */

/*import * as bootstrap from 'bootstrap';

export default function ProductFilter({
  searchTerm,
  onSearchChange,
  selectedTags,
  onAddTag,
  onRemoveTag,
  onOpenAdvancedFilter,
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
        {selectedTags.map((tag) => (
          <div
            key={tag.tag_id}
            className="d-inline-block border p-2 rounded me-2"
          >
            <span>{tag.name}</span>
            <button
              className="btn btn-sm btn-link text-danger ms-2"
              onClick={() => onRemoveTag(tag.tag_id)}
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            const modalEl = document.getElementById("tagSelectorModal");
            if (modalEl) {
              const modal = new bootstrap.Modal(modalEl);
              modal.show();
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}*/

/*----------------------- */

import * as bootstrap from "bootstrap";

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
        {selectedTags.map((tag) => (
          <span
            key={tag.tag_id}
            className="badge bg-primary text-light me-2 mb-2 d-inline-flex align-items-center"
            style={{ fontSize: "0.9rem", paddingRight: "0.5rem" }}
          >
            {tag.name}
            <button
              type="button"
              className="btn-close btn-close-white btn-sm ms-2"
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
