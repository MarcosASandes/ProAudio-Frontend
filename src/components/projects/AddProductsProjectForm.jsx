import { useEffect, useState } from "react";
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
        {/* Renderiza campos para nuevos productos */}
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

      {/* Lista productos ya en el proyecto */}
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

      {/*{showProductModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccionar producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProductModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <ProductSelectorModal onSelect={handleProductSelected} />
              </div>
            </div>
          </div>
        </div>
      )}*/}

      {showProductModal && (
        <ProductSelectorModal
          onClose={() => setShowProductModal(false)}
          onSelect={handleProductSelected}
        />
      )}
    </>
  );
};

export default AddProductsProjectForm;
