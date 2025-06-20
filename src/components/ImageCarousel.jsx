/*import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ images }) => {
  if (images.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  return (
    <Carousel>
      {images.map((url, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={url}
            alt={`Imagen ${index + 1}`}
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;*/

/*------------------------- */

/*import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ images }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    // Convertimos blobs a URLs
    const urls = images.map((blob) => {
      // Si es un string base64, convertirlo a blob primero
      if (typeof blob === 'string') {
        const byteCharacters = atob(blob);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
          byteCharacters.charCodeAt(i)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const fileBlob = new Blob([byteArray], { type: 'image/jpeg' }); // o 'image/png' si corresponde
        return URL.createObjectURL(fileBlob);
      }

      // Si ya es un Blob real
      return URL.createObjectURL(blob);
    });

    setImageUrls(urls);

    return () => {
      // Limpiar URLs para evitar memory leaks
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  if (imageUrls.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  return (
    <Carousel>
      {imageUrls.map((url, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={url}
            alt={`Imagen ${index + 1}`}
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;*/

/*---------------------------------- */

/*import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/imageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const urls = images.map((blob) => {
      if (typeof blob === 'string') {
        const byteCharacters = atob(blob);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
          byteCharacters.charCodeAt(i)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const fileBlob = new Blob([byteArray], { type: 'image/jpeg' });
        return URL.createObjectURL(fileBlob);
      }

      return URL.createObjectURL(blob);
    });

    setImageUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  if (imageUrls.length === 0) {
    return <p className="text-muted small">No hay imágenes disponibles.</p>;
  }

  return (
    <div className="carousel-wrapper">
      <Carousel indicators={false} interval={3000} controls={imageUrls.length > 1}>
        {imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block mx-auto carousel-img"
              src={url}
              alt={`Imagen ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;*/

/*CAMBIO CON CLICK EN IMAGEN PARA AGRANDAR  --------------------------------*/

/*import React, { useEffect, useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import '../styles/imageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Para el modal

  useEffect(() => {
    if (!images || images.length === 0) return;

    const urls = images.map((blob) => {
      if (typeof blob === 'string') {
        const byteCharacters = atob(blob);
        const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const fileBlob = new Blob([byteArray], { type: 'image/jpeg' });
        return URL.createObjectURL(fileBlob);
      }
      return URL.createObjectURL(blob);
    });

    setImageUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  if (imageUrls.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  return (
    <>
      <Carousel>
        {imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 carousel-thumb"
              src={url}
              alt={`Imagen ${index + 1}`}
              style={{ maxHeight: '300px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => setSelectedImage(url)}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      
      <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} centered size="lg">
        <Modal.Body className="p-0">
          <img src={selectedImage} alt="Ampliada" className="w-100" style={{ maxHeight: '90vh', objectFit: 'contain' }} />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button className="btn btn-outline-secondary" onClick={() => setSelectedImage(null)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageCarousel;*/

/*----------------- */

/*import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const urls = images.map((blob) => {
      if (typeof blob === 'string') {
        const byteCharacters = atob(blob);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
          byteCharacters.charCodeAt(i)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const fileBlob = new Blob([byteArray], { type: 'image/jpeg' });
        return URL.createObjectURL(fileBlob);
      }
      return URL.createObjectURL(blob);
    });

    setImageUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  if (imageUrls.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  return (
    <Carousel indicators={false} controls={true} interval={null} fade={false}>
      {imageUrls.map((url, index) => (
        <Carousel.Item key={index}>
          <div
            style={{
              maxHeight: '300px',
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              className="d-block"
              src={url}
              alt={`Imagen ${index + 1}`}
              style={{
                maxHeight: '280px',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;*/

/*----------------------------------- */

/*import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "../styles/imageCarousel.css";

const ImageCarousel = ({ images, onDeletePhoto }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const urls = images.map((photo) => {
      const blob = photo.image;
      if (typeof blob === "string") {
        const byteCharacters = atob(blob);
        const byteNumbers = Array.from(
          { length: byteCharacters.length },
          (_, i) => byteCharacters.charCodeAt(i)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const fileBlob = new Blob([byteArray], { type: "image/jpeg" });
        return { url: URL.createObjectURL(fileBlob), id: photo.photo_id };
      }
      return { url: URL.createObjectURL(blob), id: photo.photo_id };
    });

    setImageUrls(urls);

    return () => {
      urls.forEach((obj) => URL.revokeObjectURL(obj.url));
    };
  }, [images]);

  if (imageUrls.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  return (
    <Carousel indicators={false} controls={true} interval={null} fade={false}>
      {imageUrls.map(({ url, id }, index) => (
        <Carousel.Item key={index} style={{ position: "relative" }}>
          <div
            style={{
              maxHeight: "300px",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              className="d-block"
              src={url}
              alt={`Imagen ${index + 1}`}
              style={{
                maxHeight: "280px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />

           
            <button
              type="button"
              onClick={() => onDeletePhoto?.(id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255, 0, 0, 0.7)",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;*/

/*------------------------------ */

import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "../styles/imageCarousel.css";

const ImageCarousel = ({ images, onDeletePhoto }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) {
      // Limpiar los URLs porque ya no hay imágenes
      setImageUrls([]);
      setActiveIndex(0);
      return;
    }

    const urls = images.map((photo) => {
      const blob = photo.image;
      if (typeof blob === "string") {
        const byteCharacters = atob(blob);
        const byteNumbers = Array.from(
          { length: byteCharacters.length },
          (_, i) => byteCharacters.charCodeAt(i)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const fileBlob = new Blob([byteArray], { type: "image/jpeg" });
        return { url: URL.createObjectURL(fileBlob), id: photo.photo_id };
      }
      return { url: URL.createObjectURL(blob), id: photo.photo_id };
    });

    setImageUrls(urls);

    if (activeIndex >= urls.length) {
      setActiveIndex(urls.length - 1);
    }

    // ✅ Revoca URLs cuando cambian las imágenes o se desmonta
    return () => {
      urls.forEach((obj) => URL.revokeObjectURL(obj.url));
    };
  }, [images]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  if (imageUrls.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={handleSelect}
      indicators={false}
      controls={true}
      interval={null}
      fade={false}
    >
      {imageUrls.map(({ url, id }, index) => (
        <Carousel.Item key={id} style={{ position: "relative" }}>
          <div
            style={{
              maxHeight: "300px",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              className="d-block"
              src={url}
              alt={`Imagen ${index + 1}`}
              style={{
                maxHeight: "280px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />

            {/* Botón en la esquina superior derecha */}
            <button
              type="button"
              onClick={() => onDeletePhoto?.(id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255, 0, 0, 0.7)",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
