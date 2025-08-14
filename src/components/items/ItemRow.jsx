/*import React from "react";
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
      <td>Nombre proyecto</td>
      <td>Fecha proyecto</td>
      <td>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleDetailsClick}>
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;*/

/*---------------------------------------- */

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
      <td title={item.next_project_name || "Sin asignar"}>
        {item.next_project_name || "Sin asignar"}
      </td>
      <td title={item.next_project || "Sin fecha"}>
        {item.next_project || "Sin fecha"}
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
