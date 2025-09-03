import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ReturnItemView from '../../components/projects/ReturnItemView';

const ReturnItemPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ReturnItemView />
    </div>
  );
};

export default ReturnItemPage;
