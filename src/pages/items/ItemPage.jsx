import React from "react";
import ItemView from "../../components/items/ItemView";
//import "../../styles/itemPage.css";
import stylesSectionContainer from "../../styles/generic/sectionContainer.module.css";
import stylesContainerSpace from "../../styles/generic/containerSpace.module.css";

const ItemPage = () => {
  return (
    <div className={`${stylesSectionContainer.sectionContainerDark} ${stylesContainerSpace.mainSection}`}>
      <ItemView />
    </div>
  );
};

export default ItemPage;
