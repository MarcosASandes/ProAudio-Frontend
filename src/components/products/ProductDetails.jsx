/*import React, { useState } from "react";
import ImageCarousel from "../global/ImageCarousel";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useDeleteProductPhoto from "../../hooks/products/useDeleteProductPhoto";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";
import styles from "../../styles/products/ProductDetails.module.css";
import stylesUnderline from "../../styles/generic/animatedUnderline.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css"
import { getProductStatusLabel } from "../../utils/getLabels";

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
        <div className="col-md-6 mb-4">
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Etiquetas</h5>
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
              <button
                className={styles.actionButton}
                onClick={() => navigate("/product/" + id + "/tag/add")}
              >
                Agregar etiquetas
              </button>
            </div>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Actividad</h5>
            <p>Próximamente...</p>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Balance</h5>
            <p>Próximamente...</p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
      
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Descripción del producto</h5>
            <p>{product.comments}</p>
            <h5 className={`fw-semibold mt-3 ${stylesUnderline.animatedUnderline}`}>Estado</h5>
            <p>{getProductStatusLabel(product.status)}</p>
            <h5 className={`fw-semibold mt-3 ${stylesUnderline.animatedUnderline}`}>Valor de reposición</h5>
            <p>{product.replacement_value}</p>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>Precios</h5>
            {product.prices.length === 0 ? (
              <p>No hay precios disponibles.</p>
            ) : (
              product?.prices?.map((price) => (
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
          ¿Estás seguro/a de que deseas eliminar esta foto? Esta acción no se
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
          ¿Estás seguro/a de que deseas eliminar este producto? Esta acción no se
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

export default ProductDetails;*/

/*---------------------------------------- */

/*import React, { useState } from "react";
import ImageCarousel from "../global/ImageCarousel";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useDeleteProductPhoto from "../../hooks/products/useDeleteProductPhoto";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";
import styles from "../../styles/products/ProductDetails.module.css";
import stylesUnderline from "../../styles/generic/animatedUnderline.module.css";
import { getProductStatusLabel } from "../../utils/getLabels";
import { useParams } from "react-router-dom";
import useGetProductDetails from "../../hooks/products/useGetProductDetails";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";
import BackButton from "../global/BackButton";

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
      <BackButton target={"/products"} />

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
        <div className="col-md-6 mb-4">
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
              Etiquetas
            </h5>
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
              <button
                className={styles.actionButton}
                onClick={() => navigate("/product/" + id + "/tag/add")}
              >
                Agregar etiquetas
              </button>
            </div>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
              Actividad
            </h5>
            <p>Próximamente...</p>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
              Balance
            </h5>
            <p>Próximamente...</p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
              Descripción del producto
            </h5>
            <p>{product.comments}</p>
            <h5
              className={`fw-semibold mt-3 ${stylesUnderline.animatedUnderline}`}
            >
              Estado
            </h5>
            <p>{getProductStatusLabel(product.status)}</p>
            <h5
              className={`fw-semibold mt-3 ${stylesUnderline.animatedUnderline}`}
            >
              Valor de reposición
            </h5>
            <p>{product.replacement_value}</p>
          </div>

          <div className={`${styles.sectionContainer} mb-4`}>
            <h5 className={`fw-semibold ${stylesUnderline.animatedUnderline}`}>
              Precios
            </h5>
            {product.prices.length === 0 ? (
              <p>No hay precios disponibles.</p>
            ) : (
              product?.prices?.map((price) => (
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
          ¿Estás seguro/a de que deseas eliminar esta foto? Esta acción no se
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
          ¿Estás seguro/a de que deseas eliminar este producto? Esta acción no
          se puede deshacer.
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

export default ProductDetails;*/

/*---------------------------------------------------------- */

/*import React, { useState } from "react";
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

  return (
    <div className={styles.generalContainer}>
      <BackButton target={"/products"} />

      <h1 className={styles.title}>{product.model}</h1>
      <p className={styles.subtitle}>Marca: {product.brand || "N/A"}</p>

      <div className="mb-4 d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "900px" }}>
          <ImageCarousel
            images={product.photos || []}
            onDeletePhoto={handleDeletePhotoRequest}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.modifyButton}`}
          onClick={() => navigate("/product/edit/" + id)}
        >
          Editar
        </button>
        <button
          className={`${styles.actionButton} ${styles.outletButton}`}
          onClick={() => navigate(`/product/${id}/items`)}
        >
          Ver artículos
        </button>
        <button
          className={`${styles.actionButton} ${styles.returnButton}`}
          onClick={() => navigate(`/products/${id}/items/create`)}
        >
          Crear artículos
        </button>
        <button
          className={`${styles.actionButton} ${styles.downloadButton}`}
          onClick={() => navigate("/product/" + id + "/photos/create")}
        >
          Agregar fotos
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={handleOpenDeleteProductModal}
        >
          Borrar producto
        </button>
      </div>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "general" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("general")}
        >
          Información
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

      <div className={styles.tabContent}>
        {activeTab === "general" && (
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Descripción del producto</h3>
            <p>{product.comments}</p>
            <p className={styles.label}>Estado</p>
            <p className={styles.value}>
              {getProductStatusLabel(product.status)}
            </p>
            <p className={styles.label}>Valor de reposición</p>
            <p className={styles.value}>{product.replacement_value}</p>
          </div>
        )}

        {activeTab === "tags" && (
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Etiquetas</h3>
            
          </div>
        )}

        {activeTab === "prices" && (
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Precios</h3>
            
          </div>
        )}

        {activeTab === "gallery" && (
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Galería</h3>
            <ImageCarousel
              images={product.photos || []}
              onDeletePhoto={handleDeletePhotoRequest}
            />
          </div>
        )}
      </div>

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
    </div>
  );
};

export default ProductDetails;*/

/*-------------------------------------------------------------- */

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
  ChevronDown,
  ChevronUp,
  ShoppingBasket,
  Tags,
  PackageSearch,
  Image,
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

  return (
    <div className={styles.generalContainer}>
      <BackButton target="/products" />

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>{product.model}</h1>
        <p className={styles.subtitle}>Marca: {product.brand || "N/A"}</p>
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
          </div>
        )}

        {activeTab === "tags" && (
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Etiquetas</h3>
              <button className={styles.addButton} onClick={handleGoToAddTags}>
                <Tags size={16} /> Agregar etiquetas
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
                <DollarSign size={16} /> Agregar precios
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
          <div className={styles.sectionContainer}>
            <h3 className={styles.sectionTitle}>Galería</h3>
            <ImageCarousel
              images={product.photos || []}
              onDeletePhoto={handleDeletePhotoRequest}
            />
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
