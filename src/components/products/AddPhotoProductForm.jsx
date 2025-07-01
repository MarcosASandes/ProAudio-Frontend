import React, { useState } from "react";
import { useAddProductPhotos } from "../../hooks/products/useAddProductPhotos";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";
import styles from "../../styles/products/addPhotoProductForm.module.css";

const AddPhotoProductForm = ({ productId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { handleSubmit, reset } = useForm();
  const addProductPhotos = useAddProductPhotos();
  const navigate = useNavigate();

  const onSubmit = () => {
    if (selectedFiles.length === 0) {
      toast.error("Debes seleccionar al menos una foto.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    addProductPhotos(formData, productId, () => {
      toast.success("Fotos agregadas correctamente 🎉");
      reset();
      setSelectedFiles([]);
      setTimeout(() => {
        navigate("/product/" + productId);
      }, 3000);
    });
  };

  return (
    <>
      <button
        type="button"
        className={stylesBackButtom.btnBackArrow}
        onClick={() => navigate("/product/" + productId)}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>
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
    </>
  );
};

export default AddPhotoProductForm;
