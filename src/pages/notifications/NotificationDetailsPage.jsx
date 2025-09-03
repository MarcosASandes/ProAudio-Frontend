import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import NotificationDetails from "../../components/notifications/NotificationDetails";

const NotificationDetailsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <NotificationDetails />
    </div>
  );
};

export default NotificationDetailsPage;
