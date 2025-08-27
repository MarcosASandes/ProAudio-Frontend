import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import BudgetPDFView from '../../components/projects/BudgetPDFView';

const BudgetPDFPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <BudgetPDFView />
    </div>
  );
};

export default BudgetPDFPage;