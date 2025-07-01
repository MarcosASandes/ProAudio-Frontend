import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedProductDetails  } from '../../features/products/ProductSlice';
import { getProductById } from '../../services/productApiService';
import { getProductDetails } from "../../services/productApiService";

const useGetProductDetails = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(id);
        dispatch(setSelectedProductDetails(data));
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProductDetails();
  }, [dispatch, id]);
};

export default useGetProductDetails;
