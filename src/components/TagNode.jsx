import React from "react";
import "../styles/tags.css";

const TagNode = ({ tag, onClick, isRoot, isSelected, haveNodes }) => {
  let claseColor = "";

  if (isSelected) {
    claseColor = haveNodes ? "tag-yellow" : "tag-green";
  } else {
    claseColor = isRoot ? "tag-red" : "tag-blue";
  }

  return (
    <div className={`tag-node ${claseColor}`} onClick={onClick}>
      {tag.name}
    </div>
  );
};

export default TagNode;
