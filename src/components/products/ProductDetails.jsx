import React, { useState } from "react";
import ImageCarousel from "../global/ImageCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";
import useDeleteProductPhoto from "../../hooks/products/useDeleteProductPhoto";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import { getProductStatusLabel } from "../../utils/getLabels";
import BackButton from "../global/BackButton";
import styles from "../../styles/products/productDetails.module.css";
import {
  Pencil,
  Trash,
  DollarSign,
  ShoppingBasket,
  Tags,
  PackageSearch,
  Image,
  Info,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  useGetProductDetails(id);
  const product = useSelector(selectSelectedProductDetails);
  const navigate = useNavigate();
  const { deleteProductPhoto } = useDeleteProductPhoto();
  const deleteProduct = useDeleteProduct();

  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showActionsModal, setShowActionsModal] = useState(false);

  if (!product) return <p className={styles.loading}>Cargando producto...</p>;

  const handleDeletePhotoRequest = (photoId) => {
    setPhotoToDelete(photoId);
    setShowConfirmModal(true);
  };

  const handleCancelDeletePhoto = () => {
    setPhotoToDelete(null);
    setShowConfirmModal(false);
  };

  const handleConfirmDeletePhoto = async () => {
    await deleteProductPhoto(photoToDelete, id);
    setPhotoToDelete(null);
    setShowConfirmModal(false);
  };

  const handleOpenDeleteProductModal = () => setShowDeleteProductModal(true);
  const handleCancelDeleteProduct = () => setShowDeleteProductModal(false);

  const handleConfirmDeleteProduct = async () => {
    const success = await deleteProduct(id);
    if (success) navigate("/products");
  };

  const handleGoToAddTags = () => {
    navigate("/product/" + id + "/tag/add");
  };

  const handleGoToAddPrices = () => {
    navigate("/product/" + id + "/prices/create");
  };

  const handleGoToUpdateProduct = () => {
    navigate("/product/edit/" + id);
  };

  const handleGoToViewArticles = () => {
    navigate(`/product/${id}/items`);
  };

  const handleGoToCreateArticles = () => {
    navigate(`/products/${id}/items/create`);
  };

  const handleGoToAddPhotos = () => {
    navigate("/product/" + id + "/photos/create");
  };

  const handleGoToAddTagsIcon = () => {
    navigate("/product/" + id + "/tag/add");
  };

  return (
    <div className={styles.generalContainer}>
      <BackButton target="/products" />

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>{product.model}</h1>
        {/*<p className={styles.subtitle}>Marca: {product?.brand || "N/A"}</p>*/}
        <p className={styles.subtitle}>
          Marca:{" "}
          {product?.brand ? (
            product.brand
          ) : (
            <span className={styles.labelWithIcon}>
              Sin marca
              <div
                className={`${styles.infoIconWrap} ${styles.dangerIconWrap}`}
                onClick={handleGoToAddTagsIcon}
                aria-hidden="true"
              >
                <Info size={15} />
                <div className={`${styles.tooltip} ${styles.tooltipRight}`}>
                  Este producto no tiene una marca registrada. Tienes que
                  agregar una etiqueta de marca correspondiente. Al hacer click
                  en el ícono te redireccionará al lugar correcto.
                </div>
              </div>
            </span>
          )}
        </p>
      </div>

      <div className={styles.mobileActionsButton}>
        <button
          className={styles.viewActionsButton}
          onClick={() => setShowActionsModal(true)}
        >
          Ver acciones
        </button>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.modifyButton}`}
          onClick={handleGoToUpdateProduct}
        >
          <Pencil size={16} /> Modificar
        </button>
        <button
          className={`${styles.actionButton} ${styles.viewArticlesButton}`}
          onClick={handleGoToViewArticles}
        >
          <PackageSearch size={16} /> Ver artículos
        </button>
        <button
          className={`${styles.actionButton} ${styles.createArticlesButton}`}
          onClick={handleGoToCreateArticles}
        >
          <ShoppingBasket size={16} /> Crear artículos
        </button>
        <button
          className={`${styles.actionButton} ${styles.addPhotosButton}`}
          onClick={handleGoToAddPhotos}
        >
          <Image size={16} /> Agregar fotos
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={handleOpenDeleteProductModal}
        >
          <Trash size={16} /> Eliminar
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "general" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("general")}
        >
          Información general
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "tags" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("tags")}
        >
          Etiquetas
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "prices" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("prices")}
        >
          Precios
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "gallery" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("gallery")}
        >
          Galería
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "general" && (
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Descripción del producto</h3>
            <p>{product.comments || "Sin descripción"}</p>
            <p className={styles.label}>Estado</p>
            <p className={styles.value}>
              {getProductStatusLabel(product.status)}
            </p>
            <p className={styles.label}>Valor de reposición</p>
            <p className={styles.value}>{product.replacement_value} USD</p>
            <p className={styles.label}>ID</p>
            <p className={styles.value}>{product.product_id}</p>
          </div>
        )}

        {activeTab === "tags" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Etiquetas</h3>
              <button className={styles.addButton} onClick={handleGoToAddTags}>
                <Tags size={16} /> Editar etiquetas
              </button>
            </div>

            <div className={styles.tagsGroup}>
              <div>
                <div className={styles.tagTypeTitle}>Descriptiva</div>
                <div className={styles.tagList}>
                  {product?.description_tags?.map((tag) => (
                    <div
                      key={tag.tag_id}
                      className={`${styles.tagBadge} ${styles.tagDescriptive}`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.tagTypeTitle}>Relación</div>
                <div className={styles.tagList}>
                  {product?.relation_tags?.map((tag) => (
                    <div
                      key={tag.tag_id}
                      className={`${styles.tagBadge} ${styles.tagRelation}`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.tagTypeTitle}>Dependencia</div>
                <div className={styles.tagList}>
                  {product?.dependency_tags?.map((tag) => (
                    <div
                      key={tag.tag_id}
                      className={`${styles.tagBadge} ${styles.tagDependency}`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "prices" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Precios</h3>
              <button
                className={styles.addButton}
                onClick={handleGoToAddPrices}
              >
                <DollarSign size={16} /> Editar precios
              </button>
            </div>
            {product.prices.length === 0 ? (
              <p className={styles.noData}>No hay precios disponibles.</p>
            ) : (
              product?.prices?.map((price) => (
                <div key={price.rent_price_id} className={styles.priceItem}>
                  <span>{price.value} USD</span>
                  <span>{price.description}</span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "gallery" && (
          <div
            className={`${styles.sectionContainer} ${styles.sectionContainerGallery}`}
          >
            <h3 className={styles.sectionTitle}>Galería</h3>
            <div className={styles.carouselWrapper}>
              <ImageCarousel
                images={product.photos || []}
                onDeletePhoto={handleDeletePhotoRequest}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>Confirmar eliminación</div>
            <div className={styles.modalText}>
              ¿Estás seguro/a de que deseas eliminar esta foto? Esta acción no
              se puede deshacer.
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={handleCancelDeletePhoto}
              >
                Cancelar
              </button>
              <button
                className={styles.confirmDeleteButton}
                onClick={handleConfirmDeletePhoto}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteProductModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>Confirmar eliminación</div>
            <div className={styles.modalText}>
              ¿Estás seguro/a de que deseas eliminar este producto? Esta acción
              no se puede deshacer.
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={handleCancelDeleteProduct}
              >
                Cancelar
              </button>
              <button
                className={styles.confirmDeleteButton}
                onClick={handleConfirmDeleteProduct}
              >
                Eliminar producto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para móviles */}
      {showActionsModal && (
        <div className={styles.actionsModalOverlay}>
          <div className={styles.actionsModal}>
            <h3 className={styles.actionsModalTitle}>Acciones</h3>
            <div className={styles.actionsModalContent}>
              <button
                className={`${styles.actionButton} ${styles.modifyButton}`}
                onClick={() => {
                  handleGoToUpdateProduct();
                  setShowActionsModal(false);
                }}
              >
                <Pencil size={16} /> Modificar
              </button>
              <button
                className={`${styles.actionButton} ${styles.viewArticlesButton}`}
                onClick={() => {
                  handleGoToViewArticles();
                  setShowActionsModal(false);
                }}
              >
                <PackageSearch size={16} /> Ver artículos
              </button>
              <button
                className={`${styles.actionButton} ${styles.createArticlesButton}`}
                onClick={() => {
                  handleGoToCreateArticles();
                  setShowActionsModal(false);
                }}
              >
                <ShoppingBasket size={16} /> Crear artículos
              </button>
              <button
                className={`${styles.actionButton} ${styles.addPhotosButton}`}
                onClick={() => {
                  handleGoToAddPhotos();
                  setShowActionsModal(false);
                }}
              >
                <Image size={16} /> Agregar fotos
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => {
                  handleOpenDeleteProductModal();
                  setShowActionsModal(false);
                }}
              >
                <Trash size={16} /> Eliminar
              </button>
            </div>
            <button
              className={styles.closeModalButton}
              onClick={() => setShowActionsModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
