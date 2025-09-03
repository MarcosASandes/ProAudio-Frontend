import React from "react";
import styles from "../../styles/items/itemsCreatedTable.module.css";
import ItemsCreatedRow from "./ItemsCreatedRow";

const ItemsCreatedTable = ({ items = [], onDownload }) => {
  if (!items.length) {
    return <div className={styles.noData}>No hay ítems para mostrar.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="Listado de ítems creados">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nro de serie</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Fecha Compra</th>
              <th>Descargar QR</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ItemsCreatedRow
                key={item.item_id}
                item={item}
                onDownload={onDownload}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsCreatedTable;
