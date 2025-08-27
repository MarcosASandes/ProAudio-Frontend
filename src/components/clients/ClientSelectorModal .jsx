import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetAllClients from "../../hooks/clients/useGetAllClients";
import Pagination from "../global/Pagination";
import styles from "../../styles/clients/clientSelectorModal.module.css";
import {
  selectClients,
  selectClientsPageable,
  selectClientsLoading,
  selectClientsError,
} from "../../features/clients/ClientSelector";
import { Target } from "lucide-react";

const ClientSelectorModal = ({ onClose, onSelect }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("ENABLED");
  const [selectedClient, setSelectedClient] = useState(null);

  const size = 10;

  // Hook para obtener clientes
  useGetAllClients(page, size, sortBy, direction, filterStatus, searchTerm);

  const clients = useSelector(selectClients);
  const pageable = useSelector(selectClientsPageable);
  const loading = useSelector(selectClientsLoading);
  const error = useSelector(selectClientsError);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, filterStatus, sortBy, direction]);

  const handleConfirmSelection = () => {
    if (selectedClient) {
      onSelect(selectedClient);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
       
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Seleccionar cliente</h2>
        </div>

        <div className={styles.modalBody}>
     
          <div className={styles.filters}>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.inputSearch}
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option className={styles.selectOption} value="id">
                ID
              </option>
              <option className={styles.selectOption} value="name">
                Nombre
              </option>
              <option className={styles.selectOption} value="phone">
                Teléfono
              </option>
            </select>

            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className={styles.select}
            >
              <option className={styles.selectOption} value="desc">
                Descendente
              </option>
              <option className={styles.selectOption} value="asc">
                Ascendente
              </option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.select}
            >
              <option className={styles.selectOption} value="">
                Todos
              </option>
              <option className={styles.selectOption} value="ENABLED">
                Habilitado
              </option>
              <option className={styles.selectOption} value="DISABLED">
                Deshabilitado
              </option>
            </select>
          </div>

          {loading && (
            <p className={styles.loadingText}>Cargando clientes...</p>
          )}
          {error && <p className={styles.errorText}>{error}</p>}

          {!loading && !error && (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
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
                      <tr
                        key={client.client_id}
                        className={
                          selectedClient?.client_id === client.client_id
                            ? styles.selectedRow
                            : ""
                        }
                      >
                        <td>{client.client_id}</td>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone_number}</td>
                        <td>
                          <button
                            className={`${styles.selectRowButton} ${
                              selectedClient?.client_id === client.client_id
                                ? styles.selectedButtonStyle
                                : ""
                            }`}
                            onClick={() => setSelectedClient(client)}
                          >
                            <Target size={16} /> Seleccionar
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
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.confirmButton}
            onClick={handleConfirmSelection}
            disabled={!selectedClient}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSelectorModal;