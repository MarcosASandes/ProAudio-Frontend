/*import React, { useState } from "react";
import { useSelector } from "react-redux";
import ItemFilter from "./ItemFilter";
import ItemTable from "./ItemTable";
import useGetItemsByProduct from "../../hooks/items/useGetItemsByProduct";
import {
  selectItems,
  selectItemsPageable,
  selectItemsLoadingAllItems,
  selectItemsErrorAllItems,
} from "../../features/items/ItemSelector";
import useGetStatuses from "../../hooks/items/useGetStatuses";
import { selectStatuses } from "../../features/items/ItemSelector";
import { useParams } from "react-router-dom";
import ItemPagination from "./ItemPagination";
import * as bootstrap from "bootstrap";
import { ArrowLeft } from "lucide-react";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { useNavigate } from "react-router-dom";
import { getItemsSortByOptionsLabel, getDirectionLabel } from "../../utils/getLabels";

const ItemView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { id } = useParams();
  useGetStatuses();
  const navigate = useNavigate();

  //ToDo: Consumir desde el backend
  const sortByOptions = ["ID", "LOCATION", "BOUGHT_AT"];
  //ToDo: Consumir desde el backend
  const directionOptions = ["ASC", "DESC"];

  const statuses = useSelector(selectStatuses);

  useGetItemsByProduct(
    id,
    currentPage - 1,
    pageSize,
    selectedStatus,
    sortBy,
    direction
  );

  const items = useSelector(selectItems);
  const pageable = useSelector(selectItemsPageable);
  const loading = useSelector(selectItemsLoadingAllItems);
  const error = useSelector(selectItemsErrorAllItems);

  const [showAdvancedFilterModal, setShowAdvancedFilterModal] = useState(false);

  const showModal = () => {
    const modalEl = document.getElementById("advancedFilterModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  return (
    <div className="container my-4">
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButton.btnBackArrow}
          onClick={() => navigate("/product/" + id)}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <h1>Artículos</h1>
      <ItemFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onOpenAdvancedFilter={showModal}
        statuses={statuses}
      />

      {loading && <p>Cargando artículos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ItemTable items={items} searchTerm={searchTerm} />
      )}

      <ItemPagination pageable={pageable} onPageChange={setCurrentPage} />

      
      <div
        className="modal fade"
        id="advancedFilterModal"
        tabIndex="-1"
        aria-labelledby="advancedFilterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="advancedFilterModalLabel">
                Filtros avanzados
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Ordenar por</label>
              <select
                className="form-select mb-3"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {sortByOptions?.map((opt) => (
                  <option key={opt} value={opt}>
                    {getItemsSortByOptionsLabel(opt)}
                  </option>
                ))}
              </select>

              <label className="form-label">Dirección</label>
              <select
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setCurrentPage(1)}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemView;*/

/*------------------------------------------------------------- */

/*import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ItemFilter from "./ItemFilter";
import ItemTable from "./ItemTable";
import ItemPagination from "./ItemPagination";

import useGetItemsByProduct from "../../hooks/items/useGetItemsByProduct";
import useGetStatuses from "../../hooks/items/useGetStatuses";

import {
  selectItems,
  selectItemsPageable,
  selectItemsLoadingAllItems,
  selectItemsErrorAllItems,
  selectStatuses,
} from "../../features/items/ItemSelector";

import styles from "../../styles/items/itemView.module.css";

const ItemView = () => {
  // Estados de filtros y paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("ID");
  const [direction, setDirection] = useState("DESC");
  const [selectedStatus, setSelectedStatus] = useState(""); // string
  const [page, setPage] = useState(1);
  const size = 10;

  const { id } = useParams(); // product id (contexto)
  const navigate = useNavigate();

  // Cargar estados disponibles y los ítems
  useGetStatuses();
  useGetItemsByProduct(id, page - 1, size, selectedStatus, sortBy, direction);

  // Datos desde el store
  const items = useSelector(selectItems);
  const pageable = useSelector(selectItemsPageable);
  const loading = useSelector(selectItemsLoadingAllItems);
  const error = useSelector(selectItemsErrorAllItems);
  const statuses = useSelector(selectStatuses);

  // Resetear a página 1 cuando cambien filtros
  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, selectedStatus]);

  return (
    <div className={styles.container}>
     
      <div className={styles.header}>
        <h2 className={styles.title}>Artículos</h2>
      
      </div>

      
      <ItemFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statuses={statuses}
      />

     
      <div className={styles.tableWrapper}>
        {loading && <p>Cargando artículos...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ItemTable items={items} searchTerm={searchTerm} />
        )}
      </div>

  
      <ItemPagination pageable={pageable} onPageChange={setPage} />
    </div>
  );
};

export default ItemView;*/

/*---------------------------------- */

import React, { useState, useEffect } from "react";
import ItemFilter from "./ItemFilter";
import ItemTable from "./ItemTable";
import ItemPagination from "./ItemPagination";
import styles from "../../styles/items/itemView.module.css";
import useGetItemsByProduct from "../../hooks/items/useGetItemsByProduct";
import useGetStatuses from "../../hooks/items/useGetStatuses";
import { useSelector } from "react-redux";
import {
  selectItems,
  selectItemsPageable,
  selectStatuses,
} from "../../features/items/ItemSelector";
import { useNavigate, useParams } from "react-router-dom";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";

const ItemView = () => {
  // Estados de filtros y paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("ID");
  const [direction, setDirection] = useState("DESC");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);
  const size = 10;
  const { id } = useParams();
  const navigate = useNavigate();
  useGetProductById(id);
  const productReference = useSelector(selectSelectedProduct);

  // Llamada al hook para obtener items según filtros
  useGetStatuses();
  useGetItemsByProduct(id, page - 1, size, selectedStatus, sortBy, direction);

  // Obtener datos desde el store
  const items = useSelector(selectItems);
  const pageable = useSelector(selectItemsPageable);
  const statuses = useSelector(selectStatuses);

  // Cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, selectedStatus]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {productReference?.model ? (
          <h2 className={styles.title}>
            Artículos de {productReference?.model}
          </h2>
        ) : (
          <h2 className={styles.title}>Artículos</h2>
        )}
        {/* Botón de creación si se desea */}
        {/* <button className={styles.createButton} onClick={() => navigate("/item/create")}>Crear artículo</button> */}
      </div>

      {/* Filtros */}
      <ItemFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        direction={direction}
        onDirectionChange={setDirection}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statuses={statuses}
      />

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        <ItemTable items={items} searchTerm={searchTerm} />
      </div>

      {/* Paginación */}
      <ItemPagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default ItemView;
