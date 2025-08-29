import React, { useState, useEffect } from "react";
import styles from "../../styles/analytics/analyticsView.module.css";
import MostRentedProductsAnalytic from "./MostRentedProductsAnalytic";
import ProjectsTimelineAnalytic from "./ProjectsTimelineAnalytic";

const AnalyticsView = () => {
  return (
    <div className={styles.grid}>
      {/*<MostRentedProductsAnalytic />
      <MostRentedProductsAnalytic />*/}
      <ProjectsTimelineAnalytic />
      {/* aca van las otras */}
    </div>
  );
};

export default AnalyticsView;
