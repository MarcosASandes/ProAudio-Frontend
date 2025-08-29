import React, { useState, useEffect } from "react";
import styles from "../../styles/analytics/analyticsView.module.css";
import MostRentedProductsAnalytic from "./MostRentedProductsAnalytic";

const AnalyticsView = () => {
  return (
    <div className={styles.grid}>
      <MostRentedProductsAnalytic />
      {/* aca van las otras */}
    </div>
  );
};

export default AnalyticsView;
