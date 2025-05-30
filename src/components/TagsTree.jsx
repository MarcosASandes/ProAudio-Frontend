
import React, { useState, useRef } from "react";
import TagNode from "./TagNode";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';

const TagsTree = ({ tags }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const modalRef = useRef();

  const getSubNodes = (padreId) =>
    tags.filter((etq) => etq.father_id === padreId);

  const getRoot = () =>
    tags.filter((etq) => etq.father_id === null);

  const manageSelection = (etiqueta, nivel) => {
    const newPath = [...selectedPath.slice(0, nivel), etiqueta];
    setSelectedPath(newPath);
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

  const selectedTag = selectedPath[selectedPath.length - 1];

  const showModal = () => {
    const modal = new bootstrap.Modal(modalRef.current, {
      backdrop: 'static',
      keyboard: false,
    });
    modal.show();
  };

  return (
    <div className="container py-4">
      <div className="tags-tree mb-3">
        {levels.map((grupo, i) => (
          <div key={i} className="tag-row d-flex flex-wrap gap-2 mb-2">
            {grupo.map((etq) => {
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

      <button
        className="btn btn-primary"
        disabled={!selectedTag}
        onClick={showModal}
      >
        Ver detalles
      </button>

      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="modalEtiquetaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalEtiquetaLabel">
                {selectedTag?.name || 'Etiqueta'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <p><strong>ID:</strong> {selectedTag?.tag_id}</p>
              <p><strong>Nombre:</strong> {selectedTag?.name}</p>
              <p><strong>Descripción:</strong> {selectedTag?.description || 'Sin descripción'}</p>
              <p><strong>Estado:</strong> {selectedTag?.status}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Modificar</button>
              <button type="button" className="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsTree;
