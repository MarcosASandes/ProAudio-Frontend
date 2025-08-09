/*import React from "react";
import styles from "../../styles/clients/clientTable.module.css";
import ClientRow from "./ClientRow";

const ClientTable = ({ clients }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;*/



/*------------------------------------------------- */


import React from "react";
import styles from "../../styles/clients/clientTable.module.css";
import ClientRow from "./ClientRow";

const ClientTable = ({ clients = [] }) => {
  if (!clients.length) {
    return <div className={styles.noData}>No hay clientes para mostrar.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="Listado de clientes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientRow key={client.client_id} client={client} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;
