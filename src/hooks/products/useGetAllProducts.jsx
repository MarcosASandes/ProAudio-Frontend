import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../services/productApiService";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../features/products/ProductSlice";

const useGetAllProducts = (page, size, tags, sortBy, direction) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await getAllProducts(page, size, tags, sortBy, direction);
        dispatch(fetchProductsSuccess(data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message || "Error al cargar productos"));
      }
    };

    fetchProducts();
  }, [dispatch, page, size, tags, sortBy, direction]);
};

export default useGetAllProducts;