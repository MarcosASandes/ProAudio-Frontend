// ClientSelectorModal.jsx
/*import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ClientPagination from "../clients/ClientPagination";
import useGetAllClients from "../../hooks/clients/useGetAllClients";
import { selectClients, selectClientsPageable } from "../../features/clients/ClientSelector";

const ClientSelectorModal = ({ show, onClose, onSelect }) => {
  const [page, setPage] = useState(1); // tu paginación comienza en 1 en frontend
  const size = 5; // cantidad de filas por página

  // Carga de clientes en store
  useGetAllClients(page, size, "name", "asc");

  const clients = useSelector(selectClients);
  const pageable = useSelector(selectClientsPageable);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSelectClient = (client) => {
    onSelect(client);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client) => (
              <tr
                key={client.client_id}
                onClick={() => handleSelectClient(client)}
                style={{ cursor: "pointer" }}
              >
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone_number}</td>
                <td>{client.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ClientPagination pageable={pageable} onPageChange={handlePageChange} />
      </Modal.Body>
    </Modal>
  );
};

export default ClientSelectorModal;*/

/*------------------------------------------------- */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import useGetAllClients from "../../hooks/clients/useGetAllClients";
import ClientPagination from "./ClientPagination";
import {
  selectClients,
  selectClientsPageable,
  selectClientsLoading,
  selectClientsError,
} from "../../features/clients/ClientSelector";

const ClientSelectorModal  = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const size = 10;

  useGetAllClients(page, size, "id", "desc", "", "");

  const clients = useSelector(selectClients);
  const pageable = useSelector(selectClientsPageable);
  const loading = useSelector(selectClientsLoading);
  const error = useSelector(selectClientsError);

  return (
    <>
      {loading && <p>Cargando clientes...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => (
                  <tr key={client.client_id}>
                    <td>{client.client_id}</td>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone_number}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onSelect(client)}
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ClientPagination pageable={pageable} onPageChange={setPage} />
        </>
      )}
    </>
  );
};

export default ClientSelectorModal ;
