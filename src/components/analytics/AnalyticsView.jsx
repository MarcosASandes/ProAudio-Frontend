import React, { useState } from "react";
import styles from "../../styles/analytics/analyticsView.module.css";
import MostRentedProductsAnalytic from "./MostRentedProductsAnalytic";
import ProductBalanceAnalytic from "./ProductBalanceAnalytic";
import ProductSelectorModal from "../products/ProductSelectorModal";
import MonthlyProjectsBalanceAnalytic from "./MonthlyProjectsBalanceAnalytic";

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
      <MonthlyProjectsBalanceAnalytic />

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
