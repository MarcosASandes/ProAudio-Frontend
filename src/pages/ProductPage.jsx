/*import React from 'react';

export default function ProductPage() {
  return (
    <main>
      <h1 className="animated-underline">Productos</h1>
      <p>
        En esta página se mostrarán los productos.
      </p>
    </main>
  );
}*/

/*- - - -- - - -- -  - - -  */

/*import React from "react";
import { Plus, ChevronDown, ArrowRight } from "lucide-react";
import "../styles/products.css";

const products = [
  { brand: "SENNHEISER", model: "EW DX EM 2", price: 200, total: 4, available: 2 },
  { brand: "SENNHEISER", model: "EW DX - SK BODY", price: 400, total: 6, available: 6 },
  { brand: "SENNHEISER", model: "MMD 935 MIC CAP", price: 450, total: 4, available: 3 },
  { status: "yellow", brand: "", model: "MMD 935 MIC CAP", price: 450, total: 4, available: 3 },
  { status: "yellow", brand: "SENNHEISER", model: "MMD 935 MIC CAP", price: 450, total: 4, available: 3 },
  { status: "red", brand: "", model: "MMD 935 MIC CAP", price: 450, total: 4, available: 3 },
];

const ProductList = () => {
  return (
    <div className="container-fluid px-5 py-4 product-list">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
        <h1 className="title">Productos</h1>
        <div className="d-flex align-items-center gap-3">
          <div className="date-range text-center">
            <p className="small note">solo se mostrarán artículos que no estén en ningún proyecto dentro de este rango de fechas*</p>
            <div className="d-flex gap-2 justify-content-center mt-1">
              <button className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1">
                de: Hoy <ChevronDown size={16} />
              </button>
              <button className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1">
                a: 27/06/2025 <ChevronDown size={16} />
              </button>
            </div>
          </div>
          <button className="btn btn-purple d-flex align-items-center gap-2 rounded-pill px-3 py-2">
            Crear <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1">Filtros de etiquetas:</p>
        <div className="d-flex flex-wrap gap-2">
          <span className="badge filter-tag">sennheiser ✕</span>
          <span className="badge filter-tag">microfonía ✕</span>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-dark table-hover align-middle">
          <thead className="border-secondary">
            <tr>
              <th scope="col"></th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Alquiler / día (USD)</th>
              <th scope="col">Nº Artículos</th>
              <th scope="col">Disponibles</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>
                  {p.status && (
                    <span className={`status-dot ${p.status}`}></span>
                  )}
                </td>
                <td>{p.brand}</td>
                <td>{p.model}</td>
                <td>{p.price}</td>
                <td>{p.total}</td>
                <td>{p.available}</td>
                <td>
                  <ArrowRight size={18} className="text-purple" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;*/

/*-  - - --- -  ---  -- -  */

/*import React from "react";
import ProductFilters from "../components/ProductFilters";
import ProductTagsFilter from "../components/ProductTagsFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";

const ProductPage = () => {
  return (
    <div className="container-fluid px-5 py-4 product-list">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
        <h1 className="title">Productos</h1>
        <ProductFilters />
      </div>

      <div className="mt-3">
        <ProductTagsFilter />
      </div>

      <div className="mt-4">
        <ProductsTable />
      </div>

      <div className="mt-4 d-flex justify-content-center">
        <Pagination />
      </div>
    </div>
  );
};

export default ProductPage;*/

/*---------------------------------------------------------------------- ORIGINAL */

/*import React from "react";
import "../styles/products.css";

const ProductPage = () => {
  return (
    <div className="main-container">
      <div className="contenedor-base">
        <div className="fila fila-1">
          <div className="columna columna-1"></div>
          <div className="columna columna-2"></div>
        </div>
        <div className="fila fila-2"></div>
        <div className="fila fila-3"></div>
        <div className="fila fila-4"></div>
      </div>
    </div>
  );
};

export default ProductPage;*/

/*-------------------------------------------- */

/*ORIGINAL ANTERIOR */

/*import React from "react";
import ProductFilter from "../components/ProductFilter";
import ProductsTagsFilter from "../components/ProductsTagsFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import "../styles/products.css";

const ProductPage = () => {
  return (
    <div className="main-container">
      <div className="contenedor-base">
        <div className="fila fila-1">
          <div className="columna columna-1 d-flex align-items-start justify-content-start">
            <h1>Productos</h1>
          </div>
          <div className="columna columna-2">
            <ProductFilter />
          </div>
        </div>

        <div className="fila fila-2">
          <ProductsTagsFilter />
        </div>

        <div className="fila fila-3">
          <ProductsTable />
        </div>

        <div className="fila fila-4">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;*/

/*------------------------ */

/*ORIGINAL */

/*import React, { useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductsTagsFilter from "../components/ProductsTagsFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import "../styles/products.css";

const ProductPage = () => {
  const [search, setSearch] = useState("");

  const allProducts = [
    {
      id: 1,
      brand: "SENNHEISER",
      model: "EW DX EM 2",
      price: 200,
      total: 4,
      available: 2,
      status: "green",
    },
    {
      id: 2,
      brand: "SENNHEISER",
      model: "EW DX - SK BODY",
      price: 400,
      total: 6,
      available: 6,
      status: "green",
    },
    {
      id: 3,
      brand: "",
      model: "MMD 935 MIC CAP",
      price: 450,
      total: 4,
      available: 3,
      status: "yellow",
    },
    {
      id: 4,
      brand: "SENNHEISER",
      model: "Otro modelo",
      price: 500,
      total: 2,
      available: 0,
      status: "red",
    },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const query = search.toLowerCase();
    return (
      product.brand.toLowerCase().includes(query) ||
      product.model.toLowerCase().includes(query)
    );
  });

  return (
    <div className="main-container">
      <div className="productos-scroll-wrapper">
        <div className="contenedor-base">
          <div className="fila fila-1">
            <div className="columna columna-1 d-flex align-items-start justify-content-start">
              <h1>Productos</h1>
            </div>
            <div className="columna columna-2">
              <ProductFilter search={search} setSearch={setSearch} />
            </div>
          </div>

          <div className="fila fila-2">
            <ProductsTagsFilter />
          </div>

          <div className="fila fila-3">
            <ProductsTable products={filteredProducts} />
          </div>

          <div className="fila fila-4">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;*/

/*
 <div className="main-container">
      <div className="contenedor-base">
        <div className="fila fila-1">
          <div className="columna columna-1 d-flex align-items-start justify-content-start">
            <h1>Productos</h1>
          </div>
          <div className="columna columna-2">
            <ProductFilter search={search} setSearch={setSearch} />
          </div>
        </div>

        <div className="fila fila-2">
          <ProductsTagsFilter />
        </div>

        <div className="fila fila-3">
          <ProductsTable products={filteredProducts} />
        </div>

        <div className="fila fila-4">
          <Pagination />
        </div>
      </div>
    </div>*/

// pages/ProductPage.jsx

/*---------------------------- */

/*
import React from "react";
import ProductFilter from "../components/ProductFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import productsMockData from "../mock/productsMockData";
import { useState } from "react";

const ProductPage = () => {
  // 🔑 Estado para el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // 🔑 Datos de prueba
  const products = [
    {
      id: 1,
      brand: "Yamaha",
      model: "MG10XU",
      rentalPrice: 20,
      totalItems: 5,
      availableItems: 3,
    },
    {
      id: 2,
      brand: "Behringer",
      model: "X32",
      rentalPrice: 50,
      totalItems: 2,
      availableItems: 2,
    },
    {
      id: 3,
      brand: "Pioneer",
      model: "DJM-900NXS2",
      rentalPrice: 40,
      totalItems: 4,
      availableItems: 1,
    },
  ];

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Productos</h1>
        <button className="btn btn-primary">Crear producto</button>
      </div>

    
      <ProductFilter 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

     
      <ProductsTable 
        products={productsMockData} 
        searchTerm={searchTerm} 
      />

      <Pagination />
    </div>
  );
};

export default ProductPage;*/

/*--------------------- */

/*import React from "react";
import ProductFilter from "../components/ProductFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import productsMockData from "../mock/productsMockData";
import { useState } from "react";
import TagSelectorModal from "../components/TagSelectorModal";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);

  const products = [
    {
      id: 1,
      brand: "Yamaha",
      model: "MG10XU",
      rentalPrice: 20,
      totalItems: 5,
      availableItems: 3,
    },
    {
      id: 2,
      brand: "Behringer",
      model: "X32",
      rentalPrice: 50,
      totalItems: 2,
      availableItems: 2,
    },
    {
      id: 3,
      brand: "Pioneer",
      model: "DJM-900NXS2",
      rentalPrice: 40,
      totalItems: 4,
      availableItems: 1,
    },
  ];

  // 🚩 Ejemplo de tags del árbol
  const tags = [
    { tag_id: 1, father_id: null, name: "Audio" },
    { tag_id: 2, father_id: 1, name: "Consolas" },
    { tag_id: 3, father_id: 1, name: "Micrófonos" },
    { tag_id: 4, father_id: null, name: "Iluminación" },
  ];

  const handleAddTag = (tag) => {
    // Evita duplicados
    if (!selectedTags.find((t) => t.tag_id === tag.tag_id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagsModal(false); // Cierra modal
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
        onOpenTagsModal={() => setShowTagsModal(true)}
      />

      <ProductsTable products={productsMockData} searchTerm={searchTerm} />

      <Pagination />


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
             
                <TagSelectorModal onSelect={handleAddTag} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;*/


/*------------------------------ */

/*import React, { useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductsTable from "../components/ProductsTable";
import Pagination from "../components/Pagination";
import TagSelectorModal from "../components/TagSelectorModal";
import * as bootstrap from "bootstrap";
import productsMockData from "../mock/productsMockData";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleAddTag = (tag) => {
    // Evita duplicados
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
        onAddTag={showModal} // 👈 mismo patrón
        onRemoveTag={handleRemoveTag}
      />

      <ProductsTable products={productsMockData} searchTerm={searchTerm} />

      <Pagination />

      
      <TagSelectorModal onSelect={handleAddTag} />
    </div>
  );
};

export default ProductPage;*/


/*----------------------------- */

import React from "react";
import ProductView from "../components/ProductView";

const ProductPage = () => {
  return (
    <div className="product-page">
      <ProductView />
    </div>
  );
};

export default ProductPage;