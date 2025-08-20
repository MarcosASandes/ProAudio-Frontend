/*import React from 'react';
import BudgetPDFView from '../../components/projects/BudgetPDFView';
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";

const BudgetPDFPage = () => {

return (
    <div>
      <BudgetPDFView />;
    </div>
  );
};

export default BudgetPDFPage;*/


/*------------------------------------------ */



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