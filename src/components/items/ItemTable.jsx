import React from "react";
import styles from "../../styles/items/itemTable.module.css";
import ItemRow from "./ItemRow";

const ItemTable = ({ items = [], searchTerm }) => {
  const filteredItems = items.filter((item) =>
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredItems.length) {
    return <div className={styles.noData}>No hay ítems para mostrar.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label="Listado de ítems">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Fecha Compra</th>
              <th>Próximo Proyecto</th>
              <th>Fecha Proyecto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <ItemRow key={item.item_id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
