import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import AddExpensesProjectForm from '../../components/projects/AddExpensesProjectForm';

const AddExpensesProjectPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <AddExpensesProjectForm />
    </div>
  );
};

export default AddExpensesProjectPage;