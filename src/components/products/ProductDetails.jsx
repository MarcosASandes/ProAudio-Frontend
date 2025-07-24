import React, { useState } from "react";
import ImageCarousel from "../global/ImageCarousel";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useDeleteProductPhoto from "../../hooks/products/useDeleteProductPhoto";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";
import styles from "../../styles/products/ProductDetails.module.css";
import stylesUnderline from "../../styles/generic/animatedUnderline.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css"

const ProductDetails = ({ id, product }) => {
  const navigate = useNavigate();
  const { deleteProductPhoto } = useDeleteProductPhoto();
  const deleteProduct = useDeleteProduct();

  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);

  const handleDeletePhotoRequest = (photoId) => {
    setPhotoToDelete(photoId);
    setShowConfirmModal(true);
  };
  const handleCancelDeletePhoto = () => {
    setPhotoToDelete(null);
    setShowConfirmModal(false);
  };
  const handleConfirmDeletePhoto = async () => {
    try {
      await deleteProductPhoto(photoToDelete, id);
    } catch (error) {
      console.error("Error eliminando foto:", error);
    } finally {
      setPhotoToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const handleOpenDeleteProductModal = () => {
    setShowDeleteProductModal(true);
  };
  const handleCancelDeleteProduct = () => {
    setShowDeleteProductModal(false);
  };
  const handleConfirmDeleteProduct = async () => {
    try {
      const success = await deleteProduct(id);
      if (success) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className={`container py-4 ${styles.generalContainer}`}>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButton.btnBackArrow}
          onClick={() => navigate("/products")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <div className="text-center mb-4">
        <h1 className="fw-bold">{product.model}</h1>
        <h5 className={styles.subtitle}>Marca: {product.brand || "N/A"}</h5>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="w-100" style={{ maxWidth: "900px" }}>
          <ImageCarousel
            images={product.photos || []}
            onDeletePhoto={handleDeletePhotoRequest}
          />
        </div>
      </div>

      <div className={`mb-5 ${styles.actionBar}`}>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/product/${id}/items`)}
        >
          Ver artículos
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/products/${id}/items/create`)}
        >
          Crear artículos
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/product/edit/" + id)}
        >
          Editar producto
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/product/" + id + "/photos/create")}
        >
          Agregar fotos
        </button>
        <button
          className="btn btn-danger"
          onClick={handleOpenDeleteProductModal}
        >
          Borrar producto
        </button>
      </div>

      <div className="row mt-4">
        {/* 🟥 Columna izquierda: ETIQUETAS + BALANCE/ACTIVIDAD */}
        <div className="col-md-6 mb-4">
          {/* 🔴🟢🔵 Etiquetas combinadas */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Etiquetas</h5>
            <div className={styles.tagsGroup}>
              <div>
                <div className={styles.tagTypeTitle}>Descriptiva</div>
                <div className={styles.tagList}>
                  {product.description_tags.map((tag) => (
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
                  {product.relation_tags.map((tag) => (
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
                  {product.dependency_tags.map((tag) => (
                    <div
                      key={tag.tag_id}
                      className={`${styles.tagBadge} ${styles.tagDependency}`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={styles.actionButton}
                onClick={() => navigate("/product/" + id + "/tag/add")}
              >
                Agregar etiquetas
              </button>
            </div>
          </div>

          {/* ⬇️ Actividad y Balance debajo */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Actividad</h5>
            <p>Próximamente...</p>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Balance</h5>
            <p>Próximamente...</p>
          </div>
        </div>

        {/* 🟪 Columna derecha: DESCRIPCIÓN + PRECIOS */}
        <div className="col-md-6 mb-4">
          {/* Descripción / Estado / Valor */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Descripción del producto</h5>
            <p>{product.comments}</p>
            <h5 className={`fw-semibold mt-3 ${stylesUnderline.animatedUnderline}`}>Estado</h5>
            <p>{product.status}</p>
            <h5 className={`fw-semibold mt-3 ${stylesUnderline.animatedUnderline}`}>Valor de reposición</h5>
            <p>{product.replacement_value}</p>
          </div>

          {/* 💰 Precios */}
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Precios</h5>
            {product.prices.length === 0 ? (
              <p>No hay precios disponibles.</p>
            ) : (
              product.prices.map((price) => (
                <div key={price.rent_price_id} className={styles.priceItem}>
                  <span>${price.value}</span>
                  <span>{price.description}</span>
                </div>
              ))
            )}
            <button
              className={styles.actionButton}
              onClick={() => navigate("/product/" + id + "/prices/create")}
            >
              Agregar precios
            </button>
          </div>
        </div>
      </div>

      <Modal show={showConfirmModal} onHide={handleCancelDeletePhoto} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta foto? Esta acción no se
          puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDeletePhoto}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDeletePhoto}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteProductModal}
        onHide={handleCancelDeleteProduct}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto? Esta acción no se
          puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDeleteProduct}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDeleteProduct}>
            Eliminar producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetails;
