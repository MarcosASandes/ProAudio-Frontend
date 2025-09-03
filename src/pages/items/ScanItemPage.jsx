import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ScanItemView from "../../components/items/ScanItemView";

const ScanItemPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ScanItemView />
    </div>
  );
};

export default ScanItemPage;