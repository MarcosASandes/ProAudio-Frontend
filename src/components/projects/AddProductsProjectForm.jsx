/*import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import ProductSelectorModal from "../products/ProductSelectorModal";
import ProductFieldItem from "./ProductFieldItem";
import { selectProductsInProject } from "../../features/products/ProductSelector";
import { useAddProductInProject } from "../../hooks/projects/useAddProductInProject";
import useDeleteProductInProject from "../../hooks/projects/useDeleteProductInProject";
import useGetProductsInProject from "../../hooks/projects/useGetProductsInProject";
import { createProductInProjectValidator } from "../../validators/products/createProductInProjectValidator";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import stylesBackButtom from "../../styles/generic/backButton.module.css";

const AddProductsProjectForm = ({ id }) => {
  const { fetchProductProjects } = useGetProductsInProject();
  const { deleteProductProject } = useDeleteProductInProject();
  const addProductProject = useAddProductInProject();
  const navigate = useNavigate();

  const productsInProject = useSelector(selectProductsInProject);

  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  const { register, control, handleSubmit, getValues, watch, reset } = useForm({
    defaultValues: { products: [] },
    resolver: yupResolver(createProductInProjectValidator),
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({ control, name: "products" });

  useEffect(() => {
    if (id) fetchProductProjects(id);
  }, [id]);

  const onSubmit = async (values) => {
    for (let product of values.products) {
      await addProductProject(id, {
        productId: product.product_id,
        rentPriceId: product.price_id,
        amount: product.amount,
      });
    }
    reset({ products: [] }); // limpia el formulario
  };

  const handleProductSelected = (product) => {
    if (currentProductIndex !== null) {
      const values = getValues();
      values.products[currentProductIndex].product_id = product.id;
      values.products[currentProductIndex].product_label = product.name;
      reset(values);
    }
    setShowProductModal(false);
    setCurrentProductIndex(null);
  };

  return (
    <>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButtom.btnBackArrow}
          onClick={() => navigate("/project/" + id)}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-3">
          {productFields.map((field, index) => (
            <ProductFieldItem
              key={field.id}
              index={index}
              field={field}
              register={register}
              getValues={getValues}
              watch={watch}
              setCurrentProductIndex={setCurrentProductIndex}
              setShowProductModal={setShowProductModal}
              removeProduct={removeProduct}
            />
          ))}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              appendProduct({
                product_id: "",
                price_id: "",
                amount: "",
                product_label: "",
              })
            }
          >
            Agregar producto
          </button>
        </div>

        <button type="submit" className="btn btn-success">
          Guardar productos
        </button>
      </form>

   
      <div className="mt-4">
        <h5 className="text-light">Productos en el proyecto</h5>
        {productsInProject?.map((productProject) => (
          <div
            key={productProject.product_project_id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-secondary bg-opacity-10"
          >
            <div>
              <strong>{productProject.model}</strong> –{" "}
              {productProject.comments} (${productProject.rentPrice}) ×{" "}
              {productProject.amount}
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                await deleteProductProject(productProject.product_project_id);
                fetchProductProjects(id);
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      

      {showProductModal && (
        <ProductSelectorModal
          onClose={() => setShowProductModal(false)}
          onSelect={handleProductSelected}
        />
      )}
    </>
  );
};

export default AddProductsProjectForm;*/

/*------------------------------------------------- */

/*import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import ProductSelectorModal from "../products/ProductSelectorModal";
import ProductFieldItem from "./ProductFieldItem";
import { selectProductsInProject } from "../../features/products/ProductSelector";
import { useAddProductInProject } from "../../hooks/projects/useAddProductInProject";
import useDeleteProductInProject from "../../hooks/projects/useDeleteProductInProject";
import useGetProductsInProject from "../../hooks/projects/useGetProductsInProject";
import { createProductInProjectValidator } from "../../validators/products/createProductInProjectValidator";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BackButton from "../global/BackButton";

const AddProductsProjectForm = () => {
  const { id } = useParams();
  const { fetchProductProjects } = useGetProductsInProject();
  const { deleteProductProject } = useDeleteProductInProject();
  const addProductProject = useAddProductInProject();
  const navigate = useNavigate();

  const productsInProject = useSelector(selectProductsInProject);

  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  const { register, control, handleSubmit, getValues, watch, reset } = useForm({
    defaultValues: { products: [] },
    resolver: yupResolver(createProductInProjectValidator),
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({ control, name: "products" });

  useEffect(() => {
    if (id) fetchProductProjects(id);
  }, [id]);

  const onSubmit = async (values) => {
    for (let product of values.products) {
      await addProductProject(id, {
        productId: product.product_id,
        rentPriceId: product.price_id,
        amount: product.amount,
      });
    }
    reset({ products: [] }); // limpia el formulario
  };

  const handleProductSelected = (product) => {
    if (currentProductIndex !== null) {
      const values = getValues();
      values.products[currentProductIndex].product_id = product.id;
      values.products[currentProductIndex].product_label = product.name;
      reset(values);
    }
    setShowProductModal(false);
    setCurrentProductIndex(null);
  };

  return (
    <>
      <BackButton target={"/project/" + id} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          {productFields.map((field, index) => (
            <ProductFieldItem
              key={field.id}
              index={index}
              field={field}
              register={register}
              getValues={getValues}
              watch={watch}
              setCurrentProductIndex={setCurrentProductIndex}
              setShowProductModal={setShowProductModal}
              removeProduct={removeProduct}
            />
          ))}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              appendProduct({
                product_id: "",
                price_id: "",
                amount: "",
                product_label: "",
              })
            }
          >
            Agregar producto
          </button>
        </div>

        <button type="submit" className="btn btn-success">
          Guardar productos
        </button>
      </form>

      
      <div className="mt-4">
        <h5 className="text-light">Productos en el proyecto</h5>
        {productsInProject?.map((productProject) => (
          <div
            key={productProject.product_project_id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-secondary bg-opacity-10"
          >
            <div>
              <strong>{productProject.model}</strong> –{" "}
              {productProject.comments} (${productProject.rentPrice}) ×{" "}
              {productProject.amount}
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                await deleteProductProject(productProject.product_project_id);
                fetchProductProjects(id);
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {showProductModal && (
        <ProductSelectorModal
          onClose={() => setShowProductModal(false)}
          onSelect={handleProductSelected}
        />
      )}
    </>
  );
};

export default AddProductsProjectForm;*/

/*---------------------------------------------- */

/*import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import ProductSelectorModal from "../products/ProductSelectorModal";
import ProductFieldItem from "./ProductFieldItem";
import { selectProductsInProject } from "../../features/products/ProductSelector";
import { useAddProductInProject } from "../../hooks/projects/useAddProductInProject";
import useDeleteProductInProject from "../../hooks/projects/useDeleteProductInProject";
import useGetProductsInProject from "../../hooks/projects/useGetProductsInProject";
import { createProductInProjectValidator } from "../../validators/products/createProductInProjectValidator";
import { useParams } from "react-router-dom";
import BackButton from "../global/BackButton";
import { Trash2 } from "lucide-react";
import styles from "../../styles/projects/addProductsProjectForm.module.css";

const AddProductsProjectForm = () => {
  const { id } = useParams();
  const { fetchProductProjects } = useGetProductsInProject();
  const { deleteProductProject } = useDeleteProductInProject();
  const addProductProject = useAddProductInProject();

  const productsInProject = useSelector(selectProductsInProject);

  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { products: [] },
    resolver: yupResolver(createProductInProjectValidator),
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({ control, name: "products" });

  useEffect(() => {
    if (id) fetchProductProjects(id);
  }, [id]);

  const onSubmit = async (values) => {
    for (let product of values.products) {
      await addProductProject(id, {
        productId: product.product_id,
        rentPriceId: product.price_id,
        amount: product.amount,
      });
    }
    reset({ products: [] });
  };

  const handleProductSelected = (product) => {
    if (currentProductIndex !== null) {
      const values = getValues();
      values.products[currentProductIndex].product_id = product.id;
      values.products[currentProductIndex].product_label = product.name;
      reset(values);
    }
    setShowProductModal(false);
    setCurrentProductIndex(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <BackButton target={`/project/${id}`} />
        <h2 className={styles.title}>Productos del proyecto</h2>
        <h3 className={styles.subtitle}>Agregar un producto</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fieldGroup}>
            {productFields.map((field, index) => (
              <ProductFieldItem
                key={field.id}
                index={index}
                field={field}
                register={register}
                getValues={getValues}
                watch={watch}
                setCurrentProductIndex={setCurrentProductIndex}
                setShowProductModal={setShowProductModal}
                removeProduct={removeProduct}
              />
            ))}

            <button
              type="button"
              className={`${styles.addBtn} ${styles.formButton}`}
              onClick={() =>
                appendProduct({
                  product_id: "",
                  price_id: "",
                  amount: "",
                  product_label: "",
                })
              }
            >
              Agregar producto
            </button>
          </div>

          {errors.products && (
            <div className={styles.error}>
              <span>{errors.products.message}</span>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={`${styles.submitBtn} ${styles.formButton}`}
            >
              Guardar productos
            </button>
            <button
              type="button"
              className={`${styles.resetBtn} ${styles.formButton}`}
              onClick={() => reset({ products: [] })}
            >
              Resetear
            </button>
          </div>
        </form>
      </div>

      <div className={styles.productsListSection}>
        <h4 className={styles.productsTitle}>Productos en el proyecto</h4>
        {productsInProject?.length > 0 ? (
          <ul className={styles.productList}>
            {productsInProject.map((productProject) => (
              <li
                key={productProject.product_project_id}
                className={styles.productItem}
              >
                <span>
                  <strong>{productProject.model}</strong> –{" "}
                  {productProject.comments} (${productProject.rentPrice}) ×{" "}
                  {productProject.amount}
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={async () => {
                    await deleteProductProject(productProject.product_project_id);
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
    </div>
  );
};

export default AddProductsProjectForm;*/

/*---------------------------------------------------------- */

/*import { useEffect, useState } from "react";
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
import { Trash2 } from "lucide-react";
import styles from "../../styles/projects/addProductsProjectForm.module.css";
import { useSelector as reduxSelector } from "react-redux";
import useGetPricesByProductId from "../../hooks/products/useGetPricesByProductId";
import { selectProductPrices } from "../../features/products/ProductSelector";

const AddProductsProjectForm = () => {
  const { id } = useParams();
  const { fetchProductProjects } = useGetProductsInProject();
  const { deleteProductProject } = useDeleteProductInProject();
  const addProductProject = useAddProductInProject();

  const productsInProject = useSelector(selectProductsInProject);

  const [showProductModal, setShowProductModal] = useState(false);

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
  const prices = reduxSelector((state) => selectProductPrices(state, productId));

  useEffect(() => {
    if (id) fetchProductProjects(id);
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
    setValue("product_label", product.name);
    setShowProductModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <BackButton target={`/project/${id}`} />
        <h2 className={styles.title}>Productos del proyecto</h2>
        <h3 className={styles.subtitle}>Agregar un producto</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          
          <div className={styles.productFieldItem}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Producto</label>
              <button
                type="button"
                className={styles.selectButton}
                onClick={() => setShowProductModal(true)}
              >
                {productLabel || "Seleccionar producto"}
              </button>
              <input type="hidden" {...register("product_id")} />
            </div>

            
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Precio</label>
              <select
                className={styles.selectInput}
                disabled={!productId}
                {...register("price_id")}
              >
                <option value="">Seleccionar precio</option>
                {prices?.prices?.map((price) => (
                  <option key={price.rent_price_id} value={price.rent_price_id}>
                    {price.description} - ${price.value}
                  </option>
                ))}
              </select>
            </div>

           
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Cantidad</label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                className={styles.numberInput}
                {...register("amount")}
              />
            </div>
          </div>

       
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
              Guardar producto
            </button>
            <button
              type="button"
              className={`${styles.resetBtn} ${styles.formButton}`}
              onClick={() =>
                reset({
                  product_id: "",
                  product_label: "",
                  price_id: "",
                  amount: "",
                })
              }
            >
              Resetear
            </button>
          </div>
        </form>
      </div>

      <div className={styles.productsListSection}>
        <h4 className={styles.productsTitle}>Productos en el proyecto</h4>
        {productsInProject?.length > 0 ? (
          <ul className={styles.productList}>
            {productsInProject.map((productProject) => (
              <li
                key={productProject.product_project_id}
                className={styles.productItem}
              >
                <span>
                  <strong>{productProject.model}</strong> –{" "}
                  {productProject.comments} (${productProject.rentPrice}) ×{" "}
                  {productProject.amount}
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={async () => {
                    await deleteProductProject(productProject.product_project_id);
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
    </div>
  );
};

export default AddProductsProjectForm;*/

/*--------------------------------------------- */

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
                  {productId ? <option value="">Seleccionar precio</option> : <option value="">Debe seleccionar un producto</option>}
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
                  {productProject.comments} ({productProject.rent_price} USD) ×{" "}
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
    </div>
  );
};

export default AddProductsProjectForm;
