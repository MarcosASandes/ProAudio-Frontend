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
      }
    };

    fetchProductById();
  }, [dispatch, id]);
};

export default useGetProductById;