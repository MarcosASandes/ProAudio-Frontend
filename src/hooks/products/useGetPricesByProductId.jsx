import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductPrices } from "../../services/productApiService";
import { setProductSelectedPricesInStore } from "../../features/products/ProductSlice";

const useGetPricesByProductId = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchProductPricesById = async () => {
      try {
        const data = await getProductPrices(id);
        dispatch(setProductSelectedPricesInStore(data));
      } catch (error) {
        console.error("Error al obtener los precios del producto:", error);
      }
    };

    fetchProductPricesById();
  }, [dispatch, id]);
};

export default useGetPricesByProductId;