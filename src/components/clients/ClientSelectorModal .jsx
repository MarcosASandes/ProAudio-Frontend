import React, { useState } from "react";
import { useSelector } from "react-redux";
import useGetAllClients from "../../hooks/clients/useGetAllClients";
import Pagination from "../global/Pagination";
import {
  selectClients,
  selectClientsPageable,
  selectClientsLoading,
  selectClientsError,
} from "../../features/clients/ClientSelector";

const ClientSelectorModal  = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const size = 10;

  useGetAllClients(page, size, "id", "desc", "ENABLED", "");

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

          <Pagination pageable={pageable} onPageChange={setPage} />
        </>
      )}
    </>
  );
};

export default ClientSelectorModal ;
