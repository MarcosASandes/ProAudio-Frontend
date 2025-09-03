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
