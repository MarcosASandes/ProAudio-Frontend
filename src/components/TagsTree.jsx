/*import React, { useState, useRef } from "react";
import TagNode from "./TagNode";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';

const TagsTree = ({ tags }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const modalRef = useRef();

  console.log(tags);
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

export default TagsTree;*/

/*- -  - - -- - -  -- - - */


import React, { useState, useRef } from "react";
import TagNode from "./TagNode";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import useDeleteTag from "../hooks/tags/useDeleteTag";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTags } from "../features/tags/TagSelector";
import useGetAllTags from "../hooks/tags/useGetAllTags";

const TagsTree = ({ onSelectTag = null }) => {
  useGetAllTags();
  const tags = useSelector(selectTags); // 🔁 ahora toma los tags del store
  const [selectedPath, setSelectedPath] = useState([]);
  const modalRef = useRef();
  const confirmDeleteRef = useRef();
  const navigate = useNavigate();

  const deleteTag = useDeleteTag();

  const getSubNodes = (padreId) =>
    tags.filter((etq) => etq.father_id === padreId);

  const getRoot = () => tags.filter((etq) => etq.father_id === null);

  const manageSelection = (etiqueta, nivel) => {
    const newPath = [...selectedPath.slice(0, nivel), etiqueta];
    setSelectedPath(newPath);
    if (onSelectTag) onSelectTag(etiqueta);
  };


  const handleModifyClick = () => {
    if (!selectedTag) return;
    const modalEl = document.getElementById("tagDetailModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    navigate(`/tag/edit/${selectedTag.tag_id}`);
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
    if (!modalRef.current) return;
    const modal = new bootstrap.Modal(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });
    modal.show();
  };

  const showConfirmDelete = () => {
    if (!confirmDeleteRef.current) return;
    const confirmModal = new bootstrap.Modal(confirmDeleteRef.current);
    confirmModal.show();
  };

  const handleDelete = async () => {
    if (!confirmDeleteRef.current || !modalRef.current) return;

    const confirmModalInstance = bootstrap.Modal.getInstance(
      confirmDeleteRef.current
    );
    const detailsModalInstance = bootstrap.Modal.getInstance(modalRef.current);

    const success = await deleteTag(selectedTag.tag_id);

    if (success) {
      confirmModalInstance?.hide();
      detailsModalInstance?.hide();
      setSelectedPath([]);
    }
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

      {!onSelectTag && (
        <>
          <button
            className="btn btn-primary"
            disabled={!selectedTag}
            onClick={showModal}
          >
            Ver detalles
          </button>

          {/* Modal de detalles */}
          <div
            className="modal fade"
            ref={modalRef}
            tabIndex="-1"
            aria-labelledby="modalEtiquetaLabel"
            aria-hidden="true"
            id="tagDetailModal"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title overflow-controlled" id="modalEtiquetaLabel">
                    {selectedTag?.name || "Etiqueta"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>ID:</strong> {selectedTag?.tag_id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {selectedTag?.name}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {selectedTag?.description || "Sin descripción"}
                  </p>
                  <p>
                    <strong>Estado:</strong> {selectedTag?.status}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleModifyClick}
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={showConfirmDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal de confirmación de eliminación */}
          <div
            className="modal fade"
            ref={confirmDeleteRef}
            tabIndex="-1"
            aria-labelledby="confirmDeleteLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmDeleteLabel">
                    Advertencia
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  Si tienes artículos categorizados con esta etiqueta no podrás
                  eliminarla.
                  <br />
                  ¿Quieres eliminar la etiqueta?
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TagsTree;






/*- - - - - - -  - - */


/*
VERSION CON TAGS DE PROP

import React, { useState, useRef } from "react";
import TagNode from "./TagNode";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import useDeleteTag from "../hooks/tags/useDeleteTag";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TagsTree = ({ tags, onSelectTag = null }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const modalRef = useRef();
  const confirmDeleteRef = useRef();
  const navigate = useNavigate();

  const deleteTag = useDeleteTag();

  const getSubNodes = (padreId) =>
    tags.filter((etq) => etq.father_id === padreId);

  const getRoot = () => tags.filter((etq) => etq.father_id === null);

  const manageSelection = (etiqueta, nivel) => {
    const newPath = [...selectedPath.slice(0, nivel), etiqueta];
    setSelectedPath(newPath);
    if (onSelectTag) onSelectTag(etiqueta); // Notifica al formulario
  };

  const handleModifyClick = () => {
    if (!selectedTag) return; // por si no hay nada seleccionado

    const modalEl = document.getElementById("tagDetailModal"); // el ID real del modal
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    navigate(`/tag/edit/${selectedTag.tag_id}`);
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
    if (!modalRef.current) return;
    const modal = new bootstrap.Modal(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });
    modal.show();
  };

  const showConfirmDelete = () => {
    if (!confirmDeleteRef.current) return;
    const confirmModal = new bootstrap.Modal(confirmDeleteRef.current);
    confirmModal.show();
  };

  const handleDelete = async () => {
    if (!confirmDeleteRef.current || !modalRef.current) return;

    const confirmModalInstance = bootstrap.Modal.getInstance(
      confirmDeleteRef.current
    );
    const detailsModalInstance = bootstrap.Modal.getInstance(modalRef.current);

    const success = await deleteTag(selectedTag.tag_id);

    if (success) {
      confirmModalInstance?.hide();
      detailsModalInstance?.hide();
      setSelectedPath([]);
    }
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

      
      {!onSelectTag && (
        <>
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
            id="tagDetailModal"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalEtiquetaLabel">
                    {selectedTag?.name || "Etiqueta"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>ID:</strong> {selectedTag?.tag_id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {selectedTag?.name}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {selectedTag?.description || "Sin descripción"}
                  </p>
                  <p>
                    <strong>Estado:</strong> {selectedTag?.status}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleModifyClick}
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={showConfirmDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div
            className="modal fade"
            ref={confirmDeleteRef}
            tabIndex="-1"
            aria-labelledby="confirmDeleteLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmDeleteLabel">
                    Advertencia
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  Si tienes artículos categorizados con esta etiqueta no podrás
                  eliminarla.
                  <br />
                  ¿Quieres eliminar la etiqueta?
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TagsTree;*/

/*- - - - - - - - - */

/*
ORIGINAL

import React, { useState, useRef } from "react";
import TagNode from "./TagNode";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import useDeleteTag from "../hooks/tags/useDeleteTag";
import { toast } from "react-toastify";

const TagsTree = ({ tags }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const modalRef = useRef();
  const confirmDeleteRef = useRef();

  const deleteTag = useDeleteTag();

  const getSubNodes = (padreId) =>
    tags.filter((etq) => etq.father_id === padreId);

  const getRoot = () => tags.filter((etq) => etq.father_id === null);

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
      backdrop: "static",
      keyboard: false,
    });
    modal.show();
  };

  const showConfirmDelete = () => {
    const confirmModal = new bootstrap.Modal(confirmDeleteRef.current);
    confirmModal.show();
  };

  const handleDelete = async () => {
    const confirmModalInstance = bootstrap.Modal.getInstance(
      confirmDeleteRef.current
    );
    const detailsModalInstance = bootstrap.Modal.getInstance(modalRef.current);

    const success = await deleteTag(selectedTag.tag_id);

    if (success) {
      confirmModalInstance.hide();
      detailsModalInstance.hide();
      setSelectedPath([]);
    }
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
                {selectedTag?.name || "Etiqueta"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>ID:</strong> {selectedTag?.tag_id}
              </p>
              <p>
                <strong>Nombre:</strong> {selectedTag?.name}
              </p>
              <p>
                <strong>Descripción:</strong>{" "}
                {selectedTag?.description || "Sin descripción"}
              </p>
              <p>
                <strong>Estado:</strong> {selectedTag?.status}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Modificar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={showConfirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div
        className="modal fade"
        ref={confirmDeleteRef}
        tabIndex="-1"
        aria-labelledby="confirmDeleteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteLabel">
                Advertencia
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              Si tienes artículos categorizados con esta etiqueta no podrás
              eliminarla.
              <br />
              ¿Quieres eliminar la etiqueta?
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsTree;*/

/*--------------------- */

/*import React, { useState, useRef, useEffect } from "react";
import TagNode from "./TagNode";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import useDeleteTag from "../hooks/tags/useDeleteTag";
import { toast } from "react-toastify";

const TagsTree = ({ tags, selectionOnly = false, onTagSelected }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const modalRef = useRef();
  const confirmDeleteRef = useRef();

  const deleteTag = useDeleteTag();

  const getSubNodes = (padreId) =>
    tags.filter((etq) => etq.father_id === padreId);

  const getRoot = () => tags.filter((etq) => etq.father_id === null);

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

  // Notificar selección
  useEffect(() => {
    if (selectionOnly && onTagSelected) {
      onTagSelected(selectedTag ?? null);
    }
  }, [selectedTag, selectionOnly, onTagSelected]);

  const showModal = () => {
    const modal = new bootstrap.Modal(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });
    modal.show();
  };

  const showConfirmDelete = () => {
    const confirmModal = new bootstrap.Modal(confirmDeleteRef.current);
    confirmModal.show();
  };

  const handleDelete = async () => {
    const confirmModalInstance = bootstrap.Modal.getInstance(
      confirmDeleteRef.current
    );
    const detailsModalInstance = bootstrap.Modal.getInstance(modalRef.current);

    const success = await deleteTag(selectedTag.tag_id);

    if (success) {
      confirmModalInstance.hide();
      detailsModalInstance.hide();
      setSelectedPath([]);
    }
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

  
      {!selectionOnly && (
        <>
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
                    {selectedTag?.name || "Etiqueta"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>ID:</strong> {selectedTag?.tag_id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {selectedTag?.name}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {selectedTag?.description || "Sin descripción"}
                  </p>
                  <p>
                    <strong>Estado:</strong> {selectedTag?.status}
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    Modificar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={showConfirmDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div
            className="modal fade"
            ref={confirmDeleteRef}
            tabIndex="-1"
            aria-labelledby="confirmDeleteLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmDeleteLabel">
                    Advertencia
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  Si tienes artículos categorizados con esta etiqueta no podrás
                  eliminarla.
                  <br />
                  ¿Quieres eliminar la etiqueta?
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TagsTree;*/
