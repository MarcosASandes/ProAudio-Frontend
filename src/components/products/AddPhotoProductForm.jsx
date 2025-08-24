/*import React, { useState } from "react";
import { useAddProductPhotos } from "../../hooks/products/useAddProductPhotos";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import styles from "../../styles/products/addPhotoProductForm.module.css";
import { showToast, showToastError } from "../../utils/toastUtils";
import { useParams } from "react-router-dom";
import BackButton from "../global/BackButton";

const AddPhotoProductForm = () => {
  const { id } = useParams();
  const productId = id;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { handleSubmit, reset } = useForm();
  const addProductPhotos = useAddProductPhotos();
  const navigate = useNavigate();

  const onSubmit = () => {
    if (selectedFiles.length === 0) {
      showToastError("Debes seleccionar al menos una foto.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    addProductPhotos(formData, productId, () => {
      reset();
      setSelectedFiles([]);
      setTimeout(() => {
        navigate("/product/" + productId);
      }, 3000);
    });
  };

  return (
    <div className={`p-4 rounded text-light ${styles.sectionContainer}`}>
      <BackButton target={"/product/" + productId} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-4 rounded text-light ${styles.sectionContainer}`}
      >
        <h1 className="pb-3">Agregar fotos</h1>
        <div className="mb-3">
          <label className="form-label fw-semibold">Seleccionar fotos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="form-control bg-dark text-light border-secondary"
            onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
          />
        </div>
        <button type="submit" className={`btn ${styles.btnPurple}`}>
          Agregar Fotos
        </button>
      </form>
    </div>
  );
};

export default AddPhotoProductForm;*/

/*----------------------------------------------------------- */

/*import React, { useState } from "react";
import { useAddProductPhotos } from "../../hooks/products/useAddProductPhotos";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/products/addPhotoProductForm.module.css";

const AddPhotoProductForm = () => {
  const { id } = useParams();
  const productId = id;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { handleSubmit, reset } = useForm();
  const addProductPhotos = useAddProductPhotos();
  const navigate = useNavigate();

  const onSubmit = () => {
    if (selectedFiles.length === 0) {
      showToastError("Debes seleccionar al menos una foto.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    addProductPhotos(formData, productId, () => {
      reset();
      setSelectedFiles([]);
      setTimeout(() => {
        navigate("/product/" + productId);
      }, 3000);
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={`/product/${productId}`} />
      <h2 className={styles.title}>Agregar fotos al producto</h2>

      <div className={styles.formGroup}>
        <label htmlFor="fileInput">Seleccionar fotos</label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <p className={styles.infoText}>Solamente apto para imágenes de 800kb.</p>
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles.fileList}>
          <h4 className={styles.fileListTitle}>Imágenes seleccionadas:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.clearBtn} ${styles.formButtons}`}
          onClick={() => {
            reset();
            setSelectedFiles([]);
          }}
        >
          Limpiar selección
        </button>

        <button
          type="submit"
          className={`${styles.submitBtn} ${styles.formButtons}`}
        >
          Agregar Fotos
        </button>
      </div>
    </form>
  );
};

export default AddPhotoProductForm;*/

/*----------------------------------------------- */

import React, { useState, useRef } from "react";
import { useAddProductPhotos } from "../../hooks/products/useAddProductPhotos";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/products/addPhotoProductForm.module.css";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import { useSelector } from "react-redux";

const AddPhotoProductForm = () => {
  const { id } = useParams();
  const productId = id;
  useGetProductById(id);
  const productStore = useSelector(selectSelectedProduct);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { handleSubmit, reset } = useForm();
  const addProductPhotos = useAddProductPhotos();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const onSubmit = () => {
    if (selectedFiles.length === 0) {
      showToastError("Debes seleccionar al menos una foto.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    addProductPhotos(formData, productId, () => {
      reset();
      setSelectedFiles([]);
      setTimeout(() => {
        navigate("/product/" + productId);
      }, 3000);
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <BackButton target={`/product/${productId}`} />
        <h2 className={styles.title}>Agregar fotos a {productStore?.model}</h2>

        <div className={styles.formGroup}>
          <label htmlFor="fileInput">Seleccionar fotos</label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <p className={styles.infoText}>
            Límite máximo de subida: 10Mb.
          </p>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.clearBtn} ${styles.formButtons}`}
            onClick={() => {
              reset();
              setSelectedFiles([]);
              if (fileInputRef.current) fileInputRef.current.value = null;
            }}
          >
            Limpiar selección
          </button>

          <button
            type="submit"
            className={`${styles.submitBtn} ${styles.formButtons}`}
          >
            Agregar Fotos
          </button>
        </div>
      </form>

      <aside className={styles.sidePanel}>
        <h4 className={styles.fileListTitle}>Imágenes seleccionadas</h4>
        <div className={styles.fileListScroll}>
          {selectedFiles.length > 0 ? (
            <ul className={styles.fileList}>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyList}>No hay imágenes seleccionadas.</p>
          )}
        </div>
      </aside>
    </div>
  );
};

export default AddPhotoProductForm;
