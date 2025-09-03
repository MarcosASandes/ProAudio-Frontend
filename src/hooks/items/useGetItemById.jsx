import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItemById } from "../../services/itemApiService";
import {
  setSelectedItem,
  clearSelectedItem,
} from "../../features/items/ItemSlice";

const useGetItemById = (itemId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await getItemById(itemId);
        dispatch(setSelectedItem(itemData));
      } catch (error) {
        console.error("Error fetching item:", error);
        dispatch(clearSelectedItem());
      }
    };

    if (itemId) {
      fetchItem();
    }

    return () => dispatch(clearSelectedItem());
  }, [itemId, dispatch]);
};

export default useGetItemById;
