import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ItemDetails from "../../components/items/ItemDetails";

const ItemDetailsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ItemDetails />
    </div>
  );
};

export default ItemDetailsPage;
