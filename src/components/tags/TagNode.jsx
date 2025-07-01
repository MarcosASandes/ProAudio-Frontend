import React from "react";
import styles from "../../styles/tags/tagNode.module.css";

const TagNode = ({ tag, onClick, isRoot, isSelected, haveNodes }) => {
  let claseColor = "";

  if (isSelected) {
    claseColor = haveNodes ? styles.tagYellow : styles.tagGreen;
  } else {
    claseColor = isRoot ? styles.tagRed : styles.tagBlue;
  }

  return (
    <div className={`${styles.tagNode} ${claseColor}`} onClick={onClick}>
      {tag.name}
    </div>
  );
};

export default TagNode;
