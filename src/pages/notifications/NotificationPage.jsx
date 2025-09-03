import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import NotificationView from "../../components/notifications/NotificationView";

const NotificationPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <NotificationView />
    </div>
  );
};

export default NotificationPage;