/*import React from "react";
import { useParams } from "react-router-dom";
import UpdateTagForm from "../../components/tags/UpdateTagForm";

const UpdateTagPage = () => {
  const { tagId } = useParams();

  return (
    <div className="container my-4">
      <UpdateTagForm tagId={tagId} />
    </div>
  );
};

export default UpdateTagPage;*/



/*-------------------------------------------------- */


import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import UpdateTagForm from "../../components/tags/UpdateTagForm";

const UpdateTagPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <UpdateTagForm />
    </div>
  );
};

export default UpdateTagPage
