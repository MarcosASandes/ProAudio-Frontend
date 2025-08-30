/*import React, { useState, useEffect } from "react";
import styles from "../../styles/analytics/analyticsView.module.css";
import MostRentedProductsAnalytic from "./MostRentedProductsAnalytic";
import ProductBalanceAnalytic from "./ProductBalanceAnalytic";

const AnalyticsView = () => {
  return (
    <div className={styles.grid}>
      <MostRentedProductsAnalytic />
      <ProductBalanceAnalytic />
      
    </div>
  );
};

export default AnalyticsView;*/


/*------------------------------- */


import React, { useState } from "react";
import styles from "../../styles/analytics/analyticsView.module.css";
import MostRentedProductsAnalytic from "./MostRentedProductsAnalytic";
import ProductBalanceAnalytic from "./ProductBalanceAnalytic";
import ProductSelectorModal from "../products/ProductSelectorModal";

const AnalyticsView = () => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(false);
  };

  return (
    <div className={styles.grid}>
      <MostRentedProductsAnalytic />
      <ProductBalanceAnalytic
        selectedProduct={selectedProduct}
        onOpenModal={() => setShowProductModal(true)}
      />

      {showProductModal && (
        <ProductSelectorModal
          show={showProductModal}
          onClose={() => setShowProductModal(false)}
          onSelect={handleSelectProduct}
        />
      )}
    </div>
  );
};

export default AnalyticsView;
