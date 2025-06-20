/*import React from 'react';
import ImageCarousel from '../components/ImageCarousel';

const ProductDetails = ({ product }) => {
  return (
    <div className="container mt-4">
      <h2>Modelo: {product.model}</h2>
      <h5 className="text-muted">Marca: {product.brand || 'N/A'}</h5>

      <div className="mt-3">
        <ImageCarousel images={product.photos ? product.photos.map(p => p.image) : []} />
      </div>

      <div className="mt-4">
        <p><strong>Comentarios:</strong> {product.comments}</p>
        <p><strong>Valor de reposición:</strong> ${product.replacement_value}</p>

        <div className="mt-3">
          <strong>Precios:</strong>
          {product.prices.length === 0 ? (
            <p>No hay precios disponibles.</p>
          ) : (
            <ul>
              {product.prices.map((price, index) => (
                <li key={index}>${price}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-3">
          <strong>Etiquetas descriptivas:</strong>
          {product.description_tags.length === 0 ? (
            <p>No hay etiquetas descriptivas.</p>
          ) : (
            <ul>
              {product.description_tags.map((tag) => (
                <li key={tag.tag_id}>{tag.name} ({tag.description || 'Sin descripción'})</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-3">
          <strong>Relaciones:</strong>
          {product.relation_tags.length === 0 ? (
            <p>No hay relaciones.</p>
          ) : (
            <ul>
              {product.relation_tags.map((tag) => (
                <li key={tag.tag_id}>{tag.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-3">
          <strong>Dependencias:</strong>
          {product.dependency_tags.length === 0 ? (
            <p>No hay dependencias.</p>
          ) : (
            <ul>
              {product.dependency_tags.map((tag) => (
                <li key={tag.tag_id}>{tag.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;*/

/*-------------------------- */

/*import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import '../styles/imageCarousel.css';

const ProductDetails = ({ product }) => {
  return (
    <div className="container mt-4">
      <h2>Modelo: {product.model}</h2>
      <h5 className="text-muted">Marca: {product.brand || 'N/A'}</h5>

      <div className="mt-3">
        <ImageCarousel images={product.photos ? product.photos.map(p => p.image) : []} />
      </div>

      <div className="mt-4">
        <p><strong>Comentarios:</strong> {product.comments}</p>
        <p><strong>Valor de reposición:</strong> ${product.replacement_value}</p>

        
        <div className="mt-3">
          <strong>Precios:</strong>
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

        
        <div className="mt-3">
          <strong>Etiquetas descriptivas:</strong>
          {product.description_tags.length === 0 ? (
            <p>No hay etiquetas descriptivas.</p>
          ) : (
            <ul>
              {product.description_tags.map((tag) => (
                <li key={tag.tag_id}>
                  {tag.name} – {tag.description || 'Sin descripción'} ({tag.status})
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <div className="mt-3">
          <strong>Relaciones:</strong>
          {product.relation_tags.length === 0 ? (
            <p>No hay relaciones.</p>
          ) : (
            <ul>
              {product.relation_tags.map((tag) => (
                <li key={tag.tag_id}>
                  {tag.name} – {tag.description || 'Sin descripción'} ({tag.status})
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <div className="mt-3">
          <strong>Dependencias:</strong>
          {product.dependency_tags.length === 0 ? (
            <p>No hay dependencias.</p>
          ) : (
            <ul>
              {product.dependency_tags.map((tag) => (
                <li key={tag.tag_id}>
                  {tag.name} – {tag.description || 'Sin descripción'} ({tag.status})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;*/

/*--------------------- */

/*import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import '../styles/productDetails.css';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({id, product }) => {

    const navigate = useNavigate();
    console.log("ID DEL PRODUCTO")

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
        <h5 className="text-muted">Marca: {product.brand || 'N/A'}</h5>
      </div>

      
      <div className="d-flex justify-content-center mb-4">
        <div className="w-100" style={{ maxWidth: '900px' }}>
          <ImageCarousel images={product.photos ? product.photos.map(p => p.image) : []} />
        </div>
      </div>

      
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        <button className="btn btn-primary">Ver artículos</button>
        <button className="btn btn-success">Crear artículos</button>
        <button className="btn btn-warning" onClick={() => navigate("/product/edit/" + id)}>Editar producto</button>
        <button className="btn btn-secondary" onClick={() => navigate("/product/" + id + "/photos/create")}>Agregar fotos</button>
        <button className="btn btn-secondary">Agregar etiquetas</button>
      </div>

      
      <div className="row mt-4">
        
        <div className="col-md-6 mb-4">
          <div className="seccion mb-4">
            <h5 className="fw-semibold">Etiquetas del producto</h5>
            {product.description_tags.length === 0 ? (
              <p>No hay etiquetas descriptivas.</p>
            ) : (
              <ul>
                {product.description_tags.map(tag => (
                  <li key={tag.tag_id}>
                    {tag.name} – {tag.description || 'Sin descripción'} ({tag.status})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="seccion mb-4">
            <h5 className="fw-semibold">Descripción del producto</h5>
            <p>{product.comments}</p>
          </div>

          <div className="seccion">
            <h5 className="fw-semibold">Precios</h5>
            {product.prices.length === 0 ? (
              <p>No hay precios disponibles.</p>
            ) : (
              <ul>
                {product.prices.map(price => (
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
                {product.relation_tags.map(tag => (
                  <li key={tag.tag_id}>
                    {tag.name} – {tag.description || 'Sin descripción'} ({tag.status})
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
                {product.dependency_tags.map(tag => (
                  <li key={tag.tag_id}>
                    {tag.name} – {tag.description || 'Sin descripción'} ({tag.status})
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
    </div>
  );
};

export default ProductDetails;*/

/*-------------------------------- */

/*import React, { useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/productDetails.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useDeleteProductPhoto from "../hooks/products/useDeleteProductPhoto";



const ProductDetails = ({ id, product }) => {
  const navigate = useNavigate();
  const { deleteProductPhoto } = useDeleteProductPhoto();

  // 👉 Estado local para fotos (copiamos del prop para poder eliminar en tiempo real)
  const [photos, setPhotos] = useState(product.photos || []);

  // 👉 Estados para modal de confirmación
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 👉 Abrir modal y guardar qué foto eliminar
  const handleDeletePhotoRequest = (photoId) => {
    setPhotoToDelete(photoId);
    setShowConfirmModal(true);
  };

  // 👉 Cancelar modal
  const handleCancelDelete = () => {
    setPhotoToDelete(null);
    setShowConfirmModal(false);
  };

  // 👉 Confirmar eliminación
  const handleConfirmDelete = async () => {
    try {
      console.log("Eliminar foto con ID:", photoToDelete);

      // 👉 Llama al hook que hace TODO (API + store)
      await deleteProductPhoto(photoToDelete, id);

      // ⚠️ NO filtrar local, confía en que el store se actualiza
    } catch (error) {
      console.error("Error eliminando foto:", error);
    } finally {
      setPhotoToDelete(null);
      setShowConfirmModal(false);
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
            images={photos} // ✅ usamos estado local, no props
            onDeletePhoto={handleDeletePhotoRequest} // ✅ pasamos callback
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        <button className="btn btn-primary">Ver artículos</button>
        <button className="btn btn-success">Crear artículos</button>
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
        <button className="btn btn-secondary">Agregar etiquetas</button>
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
                    {tag.name} – {tag.description || "Sin descripción"} (
                    {tag.status})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="seccion mb-4">
            <h5 className="fw-semibold">Descripción del producto</h5>
            <p>{product.comments}</p>
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

      
      <Modal show={showConfirmModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta foto? Esta acción no se
          puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetails;*/

/*----------------------------------------- */

/*VERSION FUNCIONAL Y MAS ACTUALIZADA ABAJO */

/*import React, { useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/productDetails.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useDeleteProductPhoto from "../hooks/products/useDeleteProductPhoto";

const ProductDetails = ({ id, product }) => {
  const navigate = useNavigate();
  const { deleteProductPhoto } = useDeleteProductPhoto();

  // 👉 ✅ Elimina estado local de fotos (usamos siempre product.photos del store)

  // 👉 Estados para modal de confirmación
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 👉 Abrir modal y guardar qué foto eliminar
  const handleDeletePhotoRequest = (photoId) => {
    setPhotoToDelete(photoId);
    setShowConfirmModal(true);
  };

  // 👉 Cancelar modal
  const handleCancelDelete = () => {
    setPhotoToDelete(null);
    setShowConfirmModal(false);
  };

  // 👉 Confirmar eliminación
  const handleConfirmDelete = async () => {
    try {
      console.log("Eliminar foto con ID:", photoToDelete);

      // 👉 Llama al hook que hace TODO (API + store)
      await deleteProductPhoto(photoToDelete, id);

      // ⚠️ NO filtrar local, confía en que el store se actualiza
    } catch (error) {
      console.error("Error eliminando foto:", error);
    } finally {
      setPhotoToDelete(null);
      setShowConfirmModal(false);
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
            images={product.photos || []} // ✅ siempre del store
            onDeletePhoto={handleDeletePhotoRequest}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        <button className="btn btn-primary">Ver artículos</button>
        <button className="btn btn-success">Crear artículos</button>
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
        <button className="btn btn-secondary" onClick={() => navigate("/product/" + id + "/prices/create")}>Agregar precios</button>
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
                    {tag.name} – {tag.description || "Sin descripción"} (
                    {tag.status})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="seccion mb-4">
            <h5 className="fw-semibold">Descripción del producto</h5>
            <p>{product.comments}</p>
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

      <Modal show={showConfirmModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta foto? Esta acción no se
          puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetails;*/

/*--------------------------- */

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
        <button className="btn btn-primary">Ver artículos</button>
        <button className="btn btn-success">Crear artículos</button>
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

/*----------------------------- */

/*import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedProductDetails } from "../features/products/ProductSelector";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/productDetails.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useDeleteProductPhoto from "../hooks/products/useDeleteProductPhoto";

const ProductDetails = ({ id }) => {
  const navigate = useNavigate();
  const { deleteProductPhoto } = useDeleteProductPhoto();

  // ✅ Ahora siempre trae el producto de la store
  const product = useSelector(selectSelectedProductDetails);

  // Estados para modal de confirmación
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeletePhotoRequest = (photoId) => {
    setPhotoToDelete(photoId);
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setPhotoToDelete(null);
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Eliminar foto con ID:", photoToDelete);
      await deleteProductPhoto(photoToDelete, id);
    } catch (error) {
      console.error("Error eliminando foto:", error);
    } finally {
      setPhotoToDelete(null);
      setShowConfirmModal(false);
    }
  };

  // ✅ Si por alguna razón no hay product (ej: refresco) muestra fallback.
  if (!product) {
    return <p className="text-center mt-5">Cargando producto...</p>;
  }

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
        <button className="btn btn-primary">Ver artículos</button>
        <button className="btn btn-success">Crear artículos</button>
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/product/edit/${id}`)}
        >
          Editar producto
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/product/${id}/photos/create`)}
        >
          Agregar fotos
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/product/${id}/prices/create`)}
        >
          Agregar precios
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
                    {tag.name} – {tag.description || "Sin descripción"} ({tag.status})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="seccion mb-4">
            <h5 className="fw-semibold">Descripción del producto</h5>
            <p>{product.comments}</p>
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
                    {tag.name} – {tag.description || "Sin descripción"} ({tag.status})
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
                    {tag.name} – {tag.description || "Sin descripción"} ({tag.status})
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

      <Modal show={showConfirmModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta foto? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetails;*/
