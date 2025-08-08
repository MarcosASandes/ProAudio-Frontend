import React from "react";
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

export default ClientTable;
