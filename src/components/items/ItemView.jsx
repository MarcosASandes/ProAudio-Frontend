import React, { useState } from "react";
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

const ItemView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { id } = useParams();
  useGetStatuses();

  const statuses = useSelector(selectStatuses);

  useGetItemsByProduct(id, currentPage - 1, pageSize, selectedStatus, sortBy, direction);

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

      {/* Modal de Filtros Avanzados */}
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
                <option value="">Seleccionar...</option>
                <option value="ID">ID</option>
                <option value="LOCATION">Ubicación</option>
                <option value="BOUGHT_AT">Fecha de compra</option>
              </select>

              <label className="form-label">Dirección</label>
              <select
                className="form-select"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
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

export default ItemView;
