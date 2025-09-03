import React from "react";
import styles from "../../styles/items/itemsCreatedTable.module.css";
import { SquareArrowDown, MapPin } from "lucide-react";
import {
  getItemsStatusLabel,
  getItemsStatusBadgeClass,
  getItemsLocationLabel,
  getItemsLocationBadgeClass,
} from "../../utils/getLabels";

const ItemsCreatedRow = ({ item, onDownload }) => {
  return (
    <tr className={styles.row}>
      <td title={item.item_id}>{item.item_id}</td>
      <td title={item.serial_number}>{item.serial_number}</td>
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
      <td title={item.description}>{item.description || "-"}</td>
      <td title={item.price_bought}>{item.price_bought === 0 ? "0" : item.price_bought || "-"} USD</td>
      <td title={item.bought_at}>{item.bought_at || "-"}</td>
      <td className={styles.actions}>
        <button
          type="button"
          className={styles.editBtn}
          aria-label={`Descargar QR del ítem ${item.item_id}`}
          title={`Descargar QR del ítem ${item.item_id}`}
          onClick={() => onDownload(item)}
        >
          <SquareArrowDown size={22} />
        </button>
      </td>
    </tr>
  );
};

export default ItemsCreatedRow;
