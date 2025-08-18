/*import React from "react";
import ItemDetails from "../../components/items/ItemDetails";
//import "../../styles/itemDetails.css";

const ItemDetailsPage = () => {
  return (
    <div className="container my-4">
      <ItemDetails />
    </div>
  );
};

export default ItemDetailsPage;*/

/*------------------------------------ */


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
