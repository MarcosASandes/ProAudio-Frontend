/*import React from "react";
import styles from "../../styles/clients/clientTable.module.css";
import { Pencil, Trash } from "lucide-react";

const ClientRow = ({ client }) => {
  return (
    <tr className={styles.row}>
      <td title={client.name}>{client.name}</td>
      <td title={client.address}>{client.address}</td>
      <td title={client.email}>{client.email}</td>
      <td title={client.phone}>{client.phone}</td>
      <td className={styles.actions}>
        <button className={styles.editBtn}>
          <Pencil size={16} />
        </button>
        <button className={styles.deleteBtn}>
          <Trash size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;*/


/*-------------------------------------------- */


import React from "react";
import styles from "../../styles/clients/clientTable.module.css";
import { SquareArrowRight } from "lucide-react";

const ClientRow = ({ client }) => {
  return (
    <tr className={styles.row}>
      <td title={client.client_id}>{client.client_id}</td>
      <td title={client.name}>{client.name}</td>
      <td title={client.address}>{client.address}</td>
      <td title={client.email}>{client.email}</td>
      <td title={client.phone_number}>{client.phone_number}</td>
      <td className={styles.actions}>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Ver detalle de ${client.name}`}
          title={`Ver detalle de ${client.name}`}
          onClick={() => {
            // Aquí iría lógica para editar, o se pasa prop onEdit
          }}
        >
          <SquareArrowRight size={22} />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
