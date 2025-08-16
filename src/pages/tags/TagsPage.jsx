/*import React from "react";
import TagsTree from "./../../components/tags/TagsTree";
//import "../../styles/tags.css";
import useGetAllTags from "../../hooks/tags/useGetAllTags";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectTags,
  flattenTags,
  selectTagsLoading,
  selectTagsError,
} from "../../features/tags/TagSelector";
import styles from "../../styles/tags/tagsPage.module.css";

const TagsPage = () => {

  const navigate = useNavigate();

  const handleGoToCreate = () => {
    navigate("/tag/create");
  };

  useGetAllTags();

  const loading = useSelector(selectTagsLoading);
  const error = useSelector(selectTagsError);

  return (

    <div className={styles.tagsPage}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
        <h1 className={`${styles.animatedUnderline} m-0`}>Etiquetas</h1>
        <button className={`btn ${styles.btnGreenStyle}`} onClick={handleGoToCreate}>
          + Crear etiqueta
        </button>
      </div>

      {loading && <p className="text-light">Cargando etiquetas...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && !error && (
        <div className={styles.tagsTreeWrapper}>
          <div className={styles.tagsTreeSpace}>
            <TagsTree />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsPage;*/


/*------------------------------------------------------- */

import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import TagsView from "../../components/tags/TagsView";

const TagsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <TagsView />
    </div>
  );
};

export default TagsPage;