import React, { useEffect, useState } from "react";
import styles from "../../styles/generic/imageCarousel.module.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImageCarousel({ images = [], onDeletePhoto }) {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const prevIdx = items.length ? (active - 1 + items.length) % items.length : 0;
  const nextIdx = items.length ? (active + 1) % items.length : 0;

  useEffect(() => {
    if (!images || images.length === 0) {
      setItems((prev) => {
        prev.forEach((p) => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
        return [];
      });
      setActive(0);
      return;
    }

    const urls = images.map((photo) => {
      const id = photo.photo_id ?? photo.id;
      let src = photo.url;
      let blob = photo.image ?? photo.blob ?? photo.file;

      if (!src) {
        if (typeof blob === "string") {
          if (blob.startsWith("data:")) {
            src = blob;
          } else {
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

    setItems((prev) => {
      prev.forEach((p) => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
      return urls;
    });

    if (active > urls.length - 1) {
      setActive(Math.max(0, urls.length - 1));
    }

    return () => {
      urls.forEach((p) => /^blob:/.test(p.url) && URL.revokeObjectURL(p.url));
    };
  }, [images]);

  const prev = () =>
    setActive((i) => (items.length ? (i > 0 ? i - 1 : items.length - 1) : 0));
  const next = () =>
    setActive((i) => (items.length ? (i < items.length - 1 ? i + 1 : 0) : 0));

  if (!items.length) {
    return <p className={styles.noDataImages}>No hay imágenes disponibles.</p>;
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
