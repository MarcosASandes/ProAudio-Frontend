import React from "react";
import ItemRow from "./ItemRow";

const ItemTable = ({ items, searchTerm }) => {
  const filteredItems = items.filter((item) =>
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Fecha Compra</th>
            <th>Próximo Proyecto</th>
            <th>Fecha Proyecto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <ItemRow key={item.item_id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
