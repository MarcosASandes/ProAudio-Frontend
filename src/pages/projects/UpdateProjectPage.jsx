import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import UpdateProjectForm from "../../components/projects/UpdateProjectForm";

const UpdateProjectPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <UpdateProjectForm />
    </div>
  );
};

export default UpdateProjectPage;