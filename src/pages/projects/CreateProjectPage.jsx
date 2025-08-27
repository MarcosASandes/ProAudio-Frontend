import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import CreateProjectForm from "../../components/projects/CreateProjectForm";

const CreateProjectPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <CreateProjectForm />
    </div>
  );
};

export default CreateProjectPage;