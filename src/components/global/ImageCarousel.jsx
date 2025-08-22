/*import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "../../styles/imageCarousel.css";

const ImageCarousel = ({ images, onDeletePhoto }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) {
      //Limpiar los URLs porque ya no hay imágenes
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
    return <p className="text-white">No hay imágenes disponibles.</p>;
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

            
            <button
              type="button"
              onClick={() => onDeletePhoto?.(id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "30px",
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

/*----------------------------------------------- */

/*import React, { useEffect, useState } from "react";
import styles from "../../styles/generic/imageCarousel.module.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImageCarousel({ images = [], onDeletePhoto }) {
  // items: [{ id, url }]
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) {
      // Revocar URLs anteriores y resetear
      setItems(prev => {
        prev.forEach(p => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
        return [];
      });
      setActive(0);
      return;
    }

    const urls = images.map((photo) => {
      const id = photo.photo_id ?? photo.id;
      let src = photo.url; // por si ya viene una url lista
      let blob = photo.image ?? photo.blob ?? photo.file;

      if (!src) {
        if (typeof blob === "string") {
          // Base64: si ya trae "data:image/..." la usamos directo
          if (blob.startsWith("data:")) {
            src = blob;
          } else {
            // base64 sin prefijo -> crear Blob
            const bytes = atob(blob);
            const arr = new Uint8Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
            blob = new Blob([arr], { type: "image/jpeg" });
            src = URL.createObjectURL(blob);
          }
        } else if (blob instanceof Blob) {
          src = URL.createObjectURL(blob);
        }
      }

      return { id, url: src };
    });

    // Revoco las anteriores y seteo las nuevas
    setItems(prev => {
      prev.forEach(p => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
      return urls;
    });

    // Si el activo quedó fuera de rango (p.ej. eliminaste la última)
    if (active > urls.length - 1) {
      setActive(Math.max(0, urls.length - 1));
    }

    // Cleanup por si el componente se desmonta inmediatamente
    return () => {
      urls.forEach(p => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
    };
  }, [images]); // <- importante

  const prev = () =>
    setActive(i => (items.length ? (i > 0 ? i - 1 : items.length - 1) : 0));
  const next = () =>
    setActive(i => (items.length ? (i < items.length - 1 ? i + 1 : 0) : 0));

  if (!items.length) {
    return <p className="text-white">No hay imágenes disponibles.</p>;
  }

  return (
    <div className={styles.carousel}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map(({ id, url }, idx) => (
          <div key={id ?? idx} className={styles.slide}>
            <img
              src={url}
              alt={`Imagen ${idx + 1}`}
              className={`${styles.img} ${idx === active ? "" : styles.pixelated}`}
            />
            <button
              type="button"
              className={styles.delete}
              onClick={() => onDeletePhoto?.(id)}
              aria-label="Eliminar foto"
              title="Eliminar foto"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.button} ${styles.prev}`}
        onClick={prev}
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.next}`}
        onClick={next}
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}*/

/*------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import styles from "../../styles/generic/imageCarousel.module.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImageCarousel({ images = [], onDeletePhoto }) {
  // items: [{ id, url }]
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const prevIdx = items.length ? (active - 1 + items.length) % items.length : 0;
  const nextIdx = items.length ? (active + 1) % items.length : 0;

  useEffect(() => {
    if (!images || images.length === 0) {
      // Revocar URLs anteriores y resetear
      setItems((prev) => {
        prev.forEach((p) => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
        return [];
      });
      setActive(0);
      return;
    }

    const urls = images.map((photo) => {
      const id = photo.photo_id ?? photo.id;
      let src = photo.url; // por si ya viene una url lista
      let blob = photo.image ?? photo.blob ?? photo.file;

      if (!src) {
        if (typeof blob === "string") {
          // Base64: si ya trae "data:image/..." la usamos directo
          if (blob.startsWith("data:")) {
            src = blob;
          } else {
            // base64 sin prefijo -> crear Blob
            const bytes = atob(blob);
            const arr = new Uint8Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
            blob = new Blob([arr], { type: "image/jpeg" });
            src = URL.createObjectURL(blob);
          }
        } else if (blob instanceof Blob) {
          src = URL.createObjectURL(blob);
        }
      }

      return { id, url: src };
    });

    // Revoco las anteriores y seteo las nuevas
    setItems((prev) => {
      prev.forEach((p) => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
      return urls;
    });

    // Si el activo quedó fuera de rango (p.ej. eliminaste la última)
    if (active > urls.length - 1) {
      setActive(Math.max(0, urls.length - 1));
    }

    // Cleanup por si el componente se desmonta inmediatamente
    return () => {
      urls.forEach((p) => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
    };
  }, [images]); // <- importante

  const prev = () =>
    setActive((i) => (items.length ? (i > 0 ? i - 1 : items.length - 1) : 0));
  const next = () =>
    setActive((i) => (items.length ? (i < items.length - 1 ? i + 1 : 0) : 0));

  if (!items.length) {
    return <p className="text-white">No hay imágenes disponibles.</p>;
  }

  return (
    <div className={styles.carousel}>
      {/* Previews laterales pixeladas */}
      <div
        className={`${styles.sidePreview} ${styles.left}`}
        aria-hidden="true"
      >
        <img
          src={items[prevIdx].url}
          alt=""
          className={`${styles.previewImg} ${styles.pixelated}`}
          draggable={false}
        />
      </div>
      <div
        className={`${styles.sidePreview} ${styles.right}`}
        aria-hidden="true"
      >
        <img
          src={items[nextIdx].url}
          alt=""
          className={`${styles.previewImg} ${styles.pixelated}`}
          draggable={false}
        />
      </div>

      {/*<div
        className={styles.track}
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map(({ id, url }, idx) => (
          <div key={id ?? idx} className={styles.slide}>
            <img
              src={url}
              alt={`Imagen ${idx + 1}`}
              className={`${styles.img} ${
                idx === active ? "" : styles.pixelated
              }`}
              draggable={false}
            />
            <button
              type="button"
              className={styles.delete}
              onClick={() => onDeletePhoto?.(id)}
              aria-label="Eliminar foto"
              title="Eliminar foto"
            >
              ✕
            </button>
          </div>
        ))}
      </div>*/}

      <div
        className={styles.track}
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map(({ id, url }, idx) => (
          <div key={id ?? idx} className={styles.slide}>
            {/* Contenedor relativo de la imagen */}
            <div className={styles.imgWrapper}>
              <img
                src={url}
                alt={`Imagen ${idx + 1}`}
                className={`${styles.img} ${
                  idx === active ? "" : styles.pixelated
                }`}
                draggable={false}
              />
              <button
                type="button"
                className={styles.delete}
                onClick={() => onDeletePhoto?.(id)}
                aria-label="Eliminar foto"
                title="Eliminar foto"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.button} ${styles.prev}`}
        onClick={prev}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        className={`${styles.button} ${styles.next}`}
        onClick={next}
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}
