/*import React from 'react';

export default function AnalyticsPage() {
  return (
    <main>
      <h1 className="animated-underline">Analíticas</h1>
      <p>
        En esta página se mostrarán las analíticas.
      </p>
    </main>
  );
}*/


/*--------------------------------------- */



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