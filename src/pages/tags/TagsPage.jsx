import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import TagsView from "../../components/tags/TagsView";

const TagsPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <TagsView />
    </div>
  );
};

export default TagsPage;