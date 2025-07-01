import CreateProductForm from "../../components/products/CreateProductForm";
import styles from "../../styles/products/sectionContainer.module.css";

export default function CreateProductFormPage() {
  return (
    <div className={styles.sectionContainer}>
      <div className="container mt-4">
        <CreateProductForm />
      </div>
    </div>
  );
}
