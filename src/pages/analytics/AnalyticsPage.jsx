import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import AnalyticsView from "../../components/analytics/AnalyticsView";

const AnalyticsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <AnalyticsView />
    </div>
  );
};

export default AnalyticsPage;