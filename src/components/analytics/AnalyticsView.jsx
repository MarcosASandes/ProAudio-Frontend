import React, { useState, useEffect } from "react";
import styles from "../../styles/clients/clientView.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetMostRentedProducts from "../../hooks/analytics/useGetMostRentedProducts";
import { selectMostRentedDataAnalytic } from "../../features/analytics/AnalyticSelector";

const AnalyticsView = () => {
  const [mostRentedProductsStartDate, setMostRentedProductsStartDate] = useState("");


  return (
    <div className={styles.container}></div>
  );
};

export default AnalyticsView;
