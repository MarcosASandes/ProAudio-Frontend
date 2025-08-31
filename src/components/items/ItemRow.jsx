import React from "react";
import styles from "../../styles/items/itemTable.module.css";
import { SquareArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getItemsStatusLabel,
  getItemsLocationLabel,
  getItemsStatusBadgeClass,
  getItemsLocationBadgeClass,
} from "../../utils/getLabels";
import { formatDateToDDMMYY } from "../../utils/formatDate";

const ItemRow = ({ item }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/item/${item.item_id}/details`);
  };

  return (
    <tr className={styles.row}>
      <td title={item.item_id}>{item.item_id}</td>
      <td title={getItemsLocationLabel(item.location)}>
        <span
          className={`${styles.badge} ${
            styles[getItemsLocationBadgeClass(item.location)]
          }`}
        >
          <MapPin size={14} className="me-1" />
          {getItemsLocationLabel(item.location)}
        </span>
      </td>
      <td title={getItemsStatusLabel(item.status)}>
        <span
          className={`${styles.badge} ${
            styles[getItemsStatusBadgeClass(item.status)]
          }`}
        >
          {getItemsStatusLabel(item.status)}
        </span>
      </td>
      <td title={item.bought_at}>{item.bought_at}</td>
      {/*<td title={item.next_project_name || "Sin asignar"}>
        {item.next_project_name || "Sin asignar"}
      </td>*/}
      <td title={item.next_project_name || "Sin asignar"}>
        {item.next_project_id ? (
          <a href={`/project/${item.next_project_id}`}>
            {item.next_project_name}
          </a>
        ) : (
          "Sin asignar"
        )}
      </td>
      <td title={item.next_project || "Sin fecha"}>
        {formatDateToDDMMYY(item.next_project) || "Sin fecha"}
      </td>
      <td className={styles.actions}>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Ver detalle del ítem ${item.item_id}`}
          title={`Ver detalle del ítem ${item.item_id}`}
          onClick={handleDetailsClick}
        >
          <SquareArrowRight size={22} />
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;
