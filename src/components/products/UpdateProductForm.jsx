/*import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productUpdateSchema } from "../../validators/products/productUpdateValidator";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import useGetProductById from "../../hooks/products/useGetProductById";
import useGetProductStatus from "../../hooks/products/useGetProductStatus";
import { selectProductStatus, selectSelectedProduct } from "../../features/products/ProductSelector";
import styles from "../../styles/products/updateProductForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { getProductStatusLabel } from "../../utils/getLabels";
import { useParams } from "react-router-dom";

export default function UpdateProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const updateProduct = useUpdateProduct();
  useGetProductById(productId);
  const product = useSelector(selectSelectedProduct);

  useGetProductStatus();
  const allProductStatus = useSelector(selectProductStatus);

  const getNameFormat = (tipo) => {
    switch (tipo) {
      case "ACTIVE":
        return "Activo";
      case "UNUSED":
        return "Sin uso";
      case "ELIMINATED":
        return "Eliminado";
      default:
        return tipo;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productUpdateSchema),
    defaultValues: {
      model: "",
      comments: "",
      replacement_value: 0,
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        model: product.model,
        comments: product.comments,
        replacement_value: product.replacement_value,
        status: product.status || "UNUSED",
      });
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    updateProduct(productId, data, () => {
      setTimeout(() => {
        navigate("/product/" + productId);
      }, 2000);
    });
  };

  if (!product) {
    return <p>Producto no encontrado para ID {productId}.</p>;
  }

  return (
    <div className={`${styles.productFormDark} p-4 rounded`}>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButton.btnBackArrow}
          onClick={() => navigate("/product/" + productId)}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.productFormDark} p-4 rounded`}
      >
        <h1 className="mb-4 text-info">Editar Producto</h1>

        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input
            type="text"
            className={`form-control ${errors.model ? "is-invalid" : ""}`}
            {...register("model")}
          />
          {errors.model && (
            <div className="invalid-feedback">{errors.model.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Comentarios</label>
          <textarea
            className={`form-control ${errors.comments ? "is-invalid" : ""}`}
            rows="3"
            {...register("comments")}
          />
          {errors.comments && (
            <div className="invalid-feedback">{errors.comments.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Valor de reemplazo</label>
          <input
            type="number"
            step="0.01"
            onWheel={(e) => e.target.blur()}
            className={`form-control ${
              errors.replacement_value ? "is-invalid" : ""
            }`}
            {...register("replacement_value")}
          />
          {errors.replacement_value && (
            <div className="invalid-feedback">
              {errors.replacement_value.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select className="form-select" {...register("status")}>

            {allProductStatus.length === 0 ? (
              <option disabled>Cargando tipos...</option>
            ) : (
              allProductStatus?.status_list
                .filter((tipo) => tipo !== "ELIMINATED")
                .map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {getProductStatusLabel(tipo)}
                  </option>
                ))
            )}
          </select>
        </div>

        <div className="d-grid d-md-flex justify-content-md-end">
          <button type="submit" className={`btn btn-info px-4 ${styles.btnPurple}`}>
            Guardar cambios
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}*/



/*-------------------------------------------------------- */




/*import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productUpdateSchema } from "../../validators/products/productUpdateValidator";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import styles from "../../styles/products/updateProductForm.module.css";
import stylesBackButton from "../../styles/generic/backButton.module.css";
import { useParams } from "react-router-dom";

export default function UpdateProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const updateProduct = useUpdateProduct();
  useGetProductById(productId);
  const product = useSelector(selectSelectedProduct);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productUpdateSchema),
    defaultValues: {
      model: "",
      comments: "",
      replacement_value: 0,
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        model: product.model,
        comments: product.comments,
        replacement_value: product.replacement_value,
        status: product.status || "UNUSED",
      });
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    updateProduct(productId, data, () => {
      setTimeout(() => {
        navigate("/product/" + productId);
      }, 2000);
    });
  };

  if (!product) {
    return <p>Producto no encontrado para ID {productId}.</p>;
  }

  return (
    <div className={`${styles.productFormDark} p-4 rounded`}>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButton.btnBackArrow}
          onClick={() => navigate("/product/" + productId)}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.productFormDark} p-4 rounded`}
      >
        <h1 className="mb-4 text-info">Editar Producto</h1>

        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input
            type="text"
            className={`form-control ${errors.model ? "is-invalid" : ""}`}
            {...register("model")}
          />
          {errors.model && (
            <div className="invalid-feedback">{errors.model.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Comentarios</label>
          <textarea
            className={`form-control ${errors.comments ? "is-invalid" : ""}`}
            rows="3"
            {...register("comments")}
          />
          {errors.comments && (
            <div className="invalid-feedback">{errors.comments.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Valor de reemplazo</label>
          <input
            type="number"
            step="0.01"
            onWheel={(e) => e.target.blur()}
            className={`form-control ${
              errors.replacement_value ? "is-invalid" : ""
            }`}
            {...register("replacement_value")}
          />
          {errors.replacement_value && (
            <div className="invalid-feedback">
              {errors.replacement_value.message}
            </div>
          )}
        </div>

        <div className="d-grid d-md-flex justify-content-md-end">
          <button type="submit" className={`btn btn-info px-4 ${styles.btnPurple}`}>
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}*/



/*-------------------------------------------------------- */


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productUpdateSchema } from "../../validators/products/productUpdateValidator";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";
import { useNavigate, useParams } from "react-router-dom";
import useGetProductById from "../../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../../features/products/ProductSelector";
import styles from "../../styles/products/updateProductForm.module.css";
import BackButton from "../global/BackButton";

export default function UpdateProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const updateProduct = useUpdateProduct();
  useGetProductById(productId);
  const product = useSelector(selectSelectedProduct);

  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(productUpdateSchema),
    defaultValues: {
      model: "",
      comments: "",
      replacement_value: 0,
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (product) {
      const data = {
        model: product.model,
        comments: product.comments,
        replacement_value: product.replacement_value,
        status: product.status || "UNUSED",
      };
      setInitialData(data);
      reset(data);
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    updateProduct(productId, data, () => {
      setTimeout(() => {
        navigate("/product/" + productId);
      }, 2000);
    });
  };

  const handleReset = () => {
    if (initialData) {
      reset(initialData);
    }
  };

  if (!product) {
    return <p>Producto no encontrado para ID {productId}.</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={`/product/${productId}`} />
      <h2 className={styles.title}>Actualizar Producto</h2>

      <div className={styles.formGroup}>
        <label htmlFor="model">Modelo</label>
        <input id="model" {...register("model")} />
        {errors.model && (
          <span className={styles.error}>{errors.model.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="comments">Comentarios</label>
        <textarea id="comments" {...register("comments")} />
        {errors.comments && (
          <span className={styles.error}>{errors.comments.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="replacement_value">Valor de reemplazo</label>
        <input
          id="replacement_value"
          type="number"
          step="0.01"
          onWheel={(e) => e.target.blur()}
          {...register("replacement_value")}
        />
        {errors.replacement_value && (
          <span className={styles.error}>
            {errors.replacement_value.message}
          </span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={`${styles.productFormButtons} ${styles.submitBtn}`}
          disabled={isSubmitting || !isDirty}
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`${styles.productFormButtons} ${styles.clearBtn}`}
        >
          Restablecer formulario
        </button>
      </div>
    </form>
  );
}
