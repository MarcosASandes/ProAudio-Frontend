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
