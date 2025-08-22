import React, { useState, useEffect } from "react";
import ItemFilter from "./ItemFilter";
import ItemTable from "./ItemTable";
import Pagination from "../global/Pagination";
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
import { Plus } from "lucide-react";
import BackButton from "../global/BackButton";

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

  const handleGoToCreateItems = () => {
    const productId = id;
    navigate(`/products/${productId}/items/create`);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, direction, selectedStatus]);

  return (
    <div className={styles.container}>
      <BackButton target={"/products"} />
      {/* Header */}
      <div className={styles.header}>
        {productReference?.model ? (
          <h2 className={styles.title}>
            Artículos de {productReference?.model}
          </h2>
        ) : (
          <h2 className={styles.title}>Artículos</h2>
        )}
        <button className={styles.createButton} onClick={handleGoToCreateItems}>
          <Plus size={16} className={styles.icon} />
          <span className={styles.buttonText}>Crear artículos</span>
        </button>
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
      <Pagination pageable={pageable} onPageChange={handlePageChange} />
    </div>
  );
};

export default ItemView;
