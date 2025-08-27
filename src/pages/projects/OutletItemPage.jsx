import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import OutletItemView from '../../components/projects/OutletItemView';

const OutletItemPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <OutletItemView />
    </div>
  );
};

export default OutletItemPage;