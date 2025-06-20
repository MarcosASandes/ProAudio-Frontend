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
