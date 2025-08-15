import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ItemsCreatedView from "../../components/items/ItemsCreatedView";

const ItemsCreatedPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ItemsCreatedView />
    </div>
  );
};

export default ItemsCreatedPage;