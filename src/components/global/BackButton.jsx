import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 
import styles from "../../styles/generic/backButton.module.css";

const BackButton = ({ target }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(target);
  };

  return (
    <div className="mb-1">
      <button
        type="button"
        className={styles.btnBackArrow}
        onClick={handleGoBack}
      >
        <ArrowLeft size={24} />
        <span className="ms-2">Volver</span>
      </button>
    </div>
  );
};

export default BackButton;
