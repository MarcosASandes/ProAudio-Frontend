import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ItemView from "../../components/items/ItemView";

const ItemPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ItemView />
    </div>
  );
};

export default ItemPage;

