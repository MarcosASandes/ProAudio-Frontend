
/*

ANALIZAR UTILIDAD Y ELIMINAR SI NO SE USA.

*/

import React, { useState } from "react";
import TagNode from "./TagNode";

const TagsTreeModal = ({ tags, onSelect }) => {
  const [selectedPath, setSelectedPath] = useState([]);

  const getSubNodes = (padreId) =>
  (tags || []).filter((etq) => etq.father_id === padreId);

  console.log(tags);

  const getRoot = () => (tags || []).filter(tag => !tag.father_id);


  const manageSelection = (etiqueta, nivel) => {
    const newPath = [...selectedPath.slice(0, nivel), etiqueta];
    setSelectedPath(newPath);
    onSelect(etiqueta);
  };

  const levels = [];
  if (selectedPath.length === 0) {
    levels.push(getRoot());
  } else {
    for (let i = 0; i < selectedPath.length; i++) {
      const actual = selectedPath[i];
      levels.push(getSubNodes(actual.father_id ?? null));
    }
    const ultima = selectedPath[selectedPath.length - 1];
    const hijasUltima = getSubNodes(ultima.tag_id);
    if (hijasUltima.length > 0) levels.push(hijasUltima);
  }

  return (
    <div className="container py-3">
      <div className="tags-tree">
        {levels?.map((grupo, i) => (
          <div key={i} className="tag-row d-flex flex-wrap gap-2 mb-2">
            {grupo?.map((etq) => {
              const estaSeleccionada = selectedPath[i]?.tag_id === etq.tag_id;
              const hijas = getSubNodes(etq.tag_id);
              return (
                <TagNode
                  key={etq.tag_id}
                  tag={etq}
                  isRoot={etq.father_id === null}
                  isSelected={estaSeleccionada}
                  haveNodes={hijas.length > 0}
                  onClick={() => manageSelection(etq, i)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsTreeModal;
