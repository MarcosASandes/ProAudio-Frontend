// hooks/products/useGetAllProducts.js
/*import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../features/products/ProductSlice";
import { getAllProducts } from "../../services/productApiService";

const useGetAllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await getAllProducts();
        dispatch(fetchProductsSuccess(data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message || "Error al cargar los productos"));
      }
    };

    fetchProducts();
  }, [dispatch]);
};

export default useGetAllProducts;*/



/*CAMBIADO PARA ACEPTAR PAGINA Y SIZE */

/*import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../services/productApiService";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../features/products/ProductSlice";

const useGetAllProducts = (page = 1, size = 10) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await getAllProducts(page, size);
        dispatch(fetchProductsSuccess(data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message || "Error al cargar productos"));
      }
    };

    fetchProducts();
  }, [dispatch, page, size]);
};

export default useGetAllProducts;*/


/*--------------------------------- */

/*import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../services/productApiService";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../features/products/ProductSlice";

const useGetAllProducts = ({ page = 1, size = 10, tags = [], sortBy = "", direction = "asc" }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await getAllProducts({ page, size, tags, sortBy, direction });
        dispatch(fetchProductsSuccess(data));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message || "Error al cargar productos"));
      }
    };

    fetchProducts();
  }, [dispatch, page, size, tags, sortBy, direction]);
};

export default useGetAllProducts;*/


/*------------------- */

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