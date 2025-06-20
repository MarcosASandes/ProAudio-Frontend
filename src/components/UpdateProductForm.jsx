import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productUpdateSchema } from "../validators/productUpdateValidator";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateProduct } from "../hooks/products/useUpdateProduct";
import { useNavigate } from "react-router-dom";
import { selectProducts } from "../features/products/ProductSelector"; // ⚠️ ajusta a tu slice real
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import useGetProductById from "../hooks/products/useGetProductById";
import { selectSelectedProduct } from "../features/products/ProductSelector";
import useGetProductStatus from "../hooks/products/useGetProductStatus";
import { selectProductStatus } from "../features/products/ProductSelector";

export default function UpdateProductForm({ productId }) {
  const navigate = useNavigate();
  const updateProduct = useUpdateProduct();
  useGetProductById(productId);
  const product = useSelector(selectSelectedProduct);
  //const products = useSelector(selectProducts);
  //const product = products.find(p => p.id === Number(productId));

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
    console.log("DataAAAAAAAAAAAAAAAA: ");
    console.log(data);
    updateProduct(productId, data, () => {
      toast.success("Producto actualizado con éxito 🎉");
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    });
  };

  if (!product) {
    return <p>Producto no encontrado para ID {productId}.</p>;
  }

  return (
    <>
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="product-form-dark p-4 rounded"
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
              allProductStatus.status_list
                .filter((tipo) => tipo !== "ELIMINATED")
                .map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {getNameFormat(tipo)}
                  </option>
                ))
            )}
          </select>
        </div>

        <div className="d-grid d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-info px-4">
            Guardar cambios
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}
