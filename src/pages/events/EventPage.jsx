import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import EventView from "../../components/events/EventView";

const EventPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <EventView />
    </div>
  );
};

export default EventPage;