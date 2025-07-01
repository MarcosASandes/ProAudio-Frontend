import React from "react";
import ItemsCreatedView from "../../components/items/ItemsCreatedView";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";

const ItemsCreatedPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <ItemsCreatedView />
    </div>
  );
};

export default ItemsCreatedPage;