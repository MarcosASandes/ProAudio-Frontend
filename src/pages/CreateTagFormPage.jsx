/*import TagForm from '../components/CreateTagForm';

export default function CreateTagFormPage() {
  return (
    <div className="container mt-4">
      <h2>Crear nueva etiqueta</h2>
      <TagForm />
    </div>
  );
}*/

/*-  - - - - -*/


/*import { useState, useRef } from "react";
import TagForm from "../components/CreateTagForm";
import TagsTreeModal from "../components/TagsTreeModal";
import useGetAllTags from "../hooks/tags/useGetAllTags";
import * as bootstrap from "bootstrap";

export default function CreateTagFormPage() {
  const [selectedFather, setSelectedFather] = useState(null);
  const modalRef = useRef();
  const tags = useGetAllTags();

  const showModal = () => {
    const modal = new bootstrap.Modal(modalRef.current, {
      backdrop: "static",
    });
    modal.show();
  };

  const closeModal = () => {
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
  };

  return (
    <div className="container mt-4">
      <h2>Crear nueva etiqueta</h2>

      
      <TagForm father_id={selectedFather?.tag_id ?? null} />

      
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="selectorPadreLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="selectorPadreLabel">
                Seleccionar etiqueta padre
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <TagsTreeModal
                tags={tags}
                selectionOnly
                onTagSelected={(tag) => setSelectedFather(tag)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}*/


/*- - - - - -*/

import CreateTagForm from "../components/CreateTagForm";

export default function CreateTagFormPage() {
  return (
    <div className="container mt-4">
      <CreateTagForm />
    </div>
  );
}


