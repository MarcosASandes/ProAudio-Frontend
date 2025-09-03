import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/tags/tagsView.module.css";
import TagsTree from "./TagsTree";

const TagsView = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Etiquetas</h2>
        <button
          className={styles.createButton}
          onClick={() => navigate("/tag/create")}
        >
          Crear etiqueta
        </button>
      </div>

      <div className={styles.treeWrapper}>
        <TagsTree />
      </div>
    </div>
  );
};

export default TagsView;
