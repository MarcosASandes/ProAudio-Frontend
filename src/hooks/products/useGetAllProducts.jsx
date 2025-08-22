import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../services/productApiService";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../features/products/ProductSlice";

const useGetAllProducts = (page, size, tags, sortBy, direction, searchTerm) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await getAllProducts(page, size, tags, sortBy, direction, searchTerm);
        dispatch(fetchProductsSuccess(data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message || "Error al cargar productos"));
      }
    };

    fetchProducts();
  }, [dispatch, page, size, tags, sortBy, direction, searchTerm]);
};

export default useGetAllProducts;