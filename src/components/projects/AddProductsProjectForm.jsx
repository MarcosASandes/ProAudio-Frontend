import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import ProductSelectorModal from "../products/ProductSelectorModal";
import { selectProductsInProject } from "../../features/products/ProductSelector";
import { useAddProductInProject } from "../../hooks/projects/useAddProductInProject";
import useDeleteProductInProject from "../../hooks/projects/useDeleteProductInProject";
import useGetProductsInProject from "../../hooks/projects/useGetProductsInProject";
import { createProductInProjectValidator } from "../../validators/products/createProductInProjectValidator";
import { useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { Trash2, X } from "lucide-react";
import styles from "../../styles/projects/addProductsProjectForm.module.css";
import { useSelector as reduxSelector } from "react-redux";
import useGetPricesByProductId from "../../hooks/products/useGetPricesByProductId";
import { selectProductPrices } from "../../features/products/ProductSelector";
import useGetProjectById from "../../hooks/projects/useGetProjectById";
import { selectSelectedProject } from "../../features/projects/ProjectSelector";

const AddProductsProjectForm = () => {
  const { id } = useParams();
  const { fetchProductProjects } = useGetProductsInProject();
  const { deleteProductProject } = useDeleteProductInProject();
  const addProductProject = useAddProductInProject();
  const { fetchProjectById } = useGetProjectById();
  const projectInStore = useSelector(selectSelectedProject);

  const productsInProject = useSelector(selectProductsInProject);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showProductsMobileModal, setShowProductsMobileModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_id: "",
      product_label: "",
      price_id: "",
      amount: "",
    },
    resolver: yupResolver(createProductInProjectValidator),
  });

  const productId = watch("product_id");
  const productLabel = watch("product_label");

  // Cargar precios cuando haya un producto seleccionado
  useGetPricesByProductId(productId);
  const prices = reduxSelector((state) =>
    selectProductPrices(state, productId)
  );

  useEffect(() => {
    if (id) fetchProductProjects(id);
  }, [id]);

  useEffect(() => {
    if (id) fetchProjectById(id);
  }, [id]);

  const onSubmit = async (values) => {
    await addProductProject(id, {
      productId: values.product_id,
      rentPriceId: values.price_id,
      amount: values.amount,
    });
    reset({
      product_id: "",
      product_label: "",
      price_id: "",
      amount: "",
    });
  };

  const handleProductSelected = (product) => {
    setValue("product_id", product.id);
    setValue("product_label", product.model);
    setShowProductModal(false);
  };

  const removeSelectedProduct = () => {
    setValue("product_id", "");
    setValue("product_label", "");
    setValue("price_id", "");
    setValue("amount", "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <BackButton target={`/project/${id}`} />
        <h2 className={styles.title}>
          Editar productos en {projectInStore?.name}
        </h2>
        <h3 className={styles.subtitle}>Agregar un producto</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Selección de producto */}
          <div className={styles.productFieldItem}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Producto</label>
              {!productId ? (
                <button
                  type="button"
                  className={styles.selectButton}
                  onClick={() => setShowProductModal(true)}
                >
                  Seleccionar producto
                </button>
              ) : (
                <div className={styles.selectedProduct}>
                  {productLabel}
                  <button
                    type="button"
                    className={styles.removeSelected}
                    onClick={removeSelectedProduct}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <input type="hidden" {...register("product_id")} />
            </div>

            {/* Precio y cantidad en la misma fila */}
            <div className={styles.row}>
              <div className={styles.colHalf}>
                <label htmlFor="slcProductPrice" className={styles.fieldLabel}>
                  Precio
                </label>
                <select
                  id="slcProductPrice"
                  className={styles.selectInput}
                  disabled={!productId}
                  {...register("price_id")}
                >
                  {productId ? (
                    <option value="">Seleccionar precio</option>
                  ) : (
                    <option value="">Debe seleccionar un producto</option>
                  )}
                  {prices?.prices?.map((price) => (
                    <option
                      key={price.rent_price_id}
                      value={price.rent_price_id}
                    >
                      {price.description} - {price.value} USD
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.colHalf}>
                <label htmlFor="numProductAmount" className={styles.fieldLabel}>
                  Cantidad
                </label>
                <input
                  id="numProductAmount"
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  className={styles.numberInput}
                  {...register("amount")}
                />
              </div>
            </div>
          </div>

          {/* Errores */}
          {errors.product_id && (
            <div className={styles.error}>{errors.product_id.message}</div>
          )}
          {errors.price_id && (
            <div className={styles.error}>{errors.price_id.message}</div>
          )}
          {errors.amount && (
            <div className={styles.error}>{errors.amount.message}</div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={`${styles.submitBtn} ${styles.formButton}`}
            >
              Guardar
            </button>
            <button
              type="button"
              className={`${styles.resetBtn} ${styles.formButton}`}
              onClick={removeSelectedProduct}
            >
              Resetear
            </button>
          </div>
        </form>
      </div>

      {/* Botón para móviles */}
      <button
        type="button"
        className={styles.productsListButton}
        onClick={() => setShowProductsMobileModal(true)}
      >
        Ver productos agregados ({productsInProject?.length || 0})
      </button>

      <div className={styles.productsListSection}>
        <h4 className={styles.productsTitle}>Productos guardados</h4>
        {productsInProject?.length > 0 ? (
          <ul className={styles.productList}>
            {productsInProject.map((productProject) => (
              <li
                key={productProject.product_project_id}
                className={styles.productItem}
              >
                <span>
                  <strong>{productProject.model}</strong> –{" "}
                  {productProject.comments} ({productProject.rent_price} USD) x{" "}
                  {productProject.amount}
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={async () => {
                    await deleteProductProject(
                      productProject.product_project_id
                    );
                    fetchProductProjects(id);
                  }}
                >
                  <Trash2 size={20} strokeWidth={2} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyList}>No hay productos agregados.</p>
        )}
      </div>

      {showProductModal && (
        <ProductSelectorModal
          onClose={() => setShowProductModal(false)}
          onSelect={handleProductSelected}
        />
      )}

      {showProductsMobileModal && (
        <div className={styles.mobileProductsModal}>
          <div className={styles.mobileProductsModalContent}>
            <button
              className={styles.closeModalBtn}
              onClick={() => setShowProductsMobileModal(false)}
            >
              <X size={16} />
            </button>

            <h4>Productos agregados</h4>
            {productsInProject?.length > 0 ? (
              <ul className={styles.productList}>
                {productsInProject.map((productProject) => (
                  <li
                    key={productProject.product_project_id}
                    className={styles.productItem}
                  >
                    <span>
                      <strong>{productProject.model}</strong> –{" "}
                      {productProject.comments} ({productProject.rent_price}{" "}
                      USD) × {productProject.amount}
                    </span>
                    <button
                      className={styles.deleteButton}
                      onClick={async () => {
                        await deleteProductProject(
                          productProject.product_project_id
                        );
                        fetchProductProjects(id);
                      }}
                    >
                      <Trash2 size={20} strokeWidth={2} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyList}>No hay productos agregados.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductsProjectForm;
