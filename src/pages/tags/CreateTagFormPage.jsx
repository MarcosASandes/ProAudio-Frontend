/*import CreateTagForm from "../../components/tags/CreateTagForm";

export default function CreateTagFormPage() {
  return (
    <div className="container mt-4">
      <CreateTagForm />
    </div>
  );
}*/


/*-------------------------------------- */



import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateTagForm from "../../components/tags/CreateTagForm";

const CreateTagFormPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateTagForm />
    </div>
  );
};

export default CreateTagFormPage