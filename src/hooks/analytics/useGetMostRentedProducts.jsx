import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMostRentedProducts } from "../../services/analyticsApiService";
import { setMostRentedProductsAnalytic } from "../../features/analytics/AnalyticSlice";
import { showToastError } from "../../utils/toastUtils";

const useGetMostRentedProducts = (start, end, limit) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnalyticMostRentedProducts = async () => {
      try {
        const data = await getMostRentedProducts(start, end, limit);
        dispatch(setMostRentedProductsAnalytic(data));
      } catch (error) {
        const msj =
          error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchAnalyticMostRentedProducts();
  }, [dispatch, start, end, limit]);
};

export default useGetMostRentedProducts;
