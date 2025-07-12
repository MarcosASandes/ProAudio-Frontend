import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllItemsByProduct } from "../../services/itemApiService";
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
} from "../../features/items/ItemSlice";

const useGetItemsByProduct = (productId, page, size, status, sortBy, direction) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(fetchItemsStart());
      try {
        const data = await getAllItemsByProduct(productId, page, size, status, sortBy, direction);
        dispatch(fetchItemsSuccess(data));
      } catch (error) {
        dispatch(fetchItemsFailure(error.message || "Error al cargar items"));
      }
    };

    if (productId) {
      fetchItems();
    }
  }, [dispatch, productId, page, size, status, sortBy, direction]);
};

export default useGetItemsByProduct;