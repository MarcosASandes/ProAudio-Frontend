/*import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../features/products/ProductSlice';
import { getProductById } from '../../services/productApiService';

export const useGetProductById = () => {
  const dispatch = useDispatch();

  const fetchProductById = async (id) => {
    try {
      const response = await getProductById(id);
      dispatch(setSelectedProduct(response.data));
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  };

  return { fetchProductById };
};*/

/*-------------------- */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from '../../features/products/ProductSlice';
import { getProductById } from '../../services/productApiService';

const useGetProductById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchProductById = async () => {
      try {
        const data = await getProductById(id);
        dispatch(setSelectedProduct(data));
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        // En este caso no se despacha ningún error al store.
      }
    };

    fetchProductById();
  }, [dispatch, id]);
};

export default useGetProductById;