import React, { useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/productDetails.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useDeleteProductPhoto from "../hooks/products/useDeleteProductPhoto";
import useDeleteProduct from "../hooks/products/useDeleteProduct";

const ProductDetails = ({ id, product }) => {
  const navigate = useNavigate();
  const { deleteProductPhoto } = useDeleteProductPhoto();
  const deleteProduct = useDeleteProduct();

  // 👉 Estado para modal de eliminación de FOTO
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 👉 Estado para modal de eliminación de PRODUCTO
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);

  // 👉 Eliminar foto
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

  // 👉 Abrir modal para eliminar PRODUCTO
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
    <div className="container py-4">
      <div className="mb-3">
        <button
          type="button"
          className="btn-back-arrow"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <div className="text-center mb-4">
        <h1 className="fw-bold">{product.model}</h1>
        <h5 className="text-muted">Marca: {product.brand || "N/A"}</h5>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="w-100" style={{ maxWidth: "900px" }}>
          <ImageCarousel
            images={product.photos || []}
            onDeletePhoto={handleDeletePhotoRequest}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
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
          className="btn btn-secondary"
          onClick={() => navigate("/product/" + id + "/tag/add")}
        >
          Agregar etiquetas
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/product/" + id + "/prices/create")}
        >
          Agregar precios
        </button>

        {/* ✅ Nuevo botón: Borrar producto */}
        <button
          className="btn btn-danger"
          onClick={handleOpenDeleteProductModal}
        >
          Borrar producto
        </button>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="seccion mb-4">
            <h5 className="fw-semibold">Etiquetas del producto</h5>
            {product.description_tags.length === 0 ? (
              <p>No hay etiquetas descriptivas.</p>
            ) : (
              <ul>
                {product.description_tags.map((tag) => (
                  <li key={tag.tag_id}>
                    {tag.name} – {tag.description || ""} (
                    {tag.status})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="seccion mb-4">
            <div>
              <h5 className="fw-semibold">Descripción del producto</h5>
              <p>{product.comments}</p>
            </div>
            <div>
              <h5 className="fw-semibold">Estado</h5>
              <p className="text-muted">{product.status}</p>
            </div>
            <div>
              <h5 className="fw-semibold">Valor de reposición</h5>
              <p className="text-muted">{product.replacement_value}</p>
            </div>
          </div>

          <div className="seccion">
            <h5 className="fw-semibold">Precios</h5>
            {product.prices.length === 0 ? (
              <p>No hay precios disponibles.</p>
            ) : (
              <ul>
                {product.prices.map((price) => (
                  <li key={price.rent_price_id}>
                    ${price.value} – {price.description} ({price.status})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="seccion mb-4">
            <h5 className="fw-semibold">Etiquetas de relación</h5>
            {product.relation_tags.length === 0 ? (
              <p>No hay relaciones.</p>
            ) : (
              <ul>
                {product.relation_tags.map((tag) => (
                  <li key={tag.tag_id}>
                    {tag.name} – {tag.description || "Sin descripción"} (
                    {tag.status})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="seccion mb-4">
            <h5 className="fw-semibold">Dependencias</h5>
            {product.dependency_tags.length === 0 ? (
              <p>No hay dependencias.</p>
            ) : (
              <ul>
                {product.dependency_tags.map((tag) => (
                  <li key={tag.tag_id}>
                    {tag.name} – {tag.description || "Sin descripción"} (
                    {tag.status})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="seccion mb-4">
            <h5 className="fw-semibold">Actividad</h5>
            <p className="text-muted">Próximamente...</p>
          </div>

          <div className="seccion">
            <h5 className="fw-semibold">Balance</h5>
            <p className="text-muted">Próximamente...</p>
          </div>
        </div>
      </div>

      {/* ✅ Modal confirmación de eliminación de FOTO */}
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

      {/* ✅ Modal confirmación de eliminación de PRODUCTO */}
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
