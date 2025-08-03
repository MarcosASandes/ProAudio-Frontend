import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getItemsStatusLabel, getItemsLocationLabel } from "../../utils/getLabels";

const ItemRow = ({ item }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/item/${item.item_id}/details`);
  };

  return (
    <tr>
      <td>{item.item_id}</td>
      <td>{getItemsLocationLabel(item.location)}</td>
      <td>{getItemsStatusLabel(item.status)}</td>
      <td>{item.bought_at}</td>
      <td>{/*item.next_project_name*/} Nombre proyecto</td>
      <td>{/*item.next_project*/} Fecha proyecto</td>
      <td>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleDetailsClick}>
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;
