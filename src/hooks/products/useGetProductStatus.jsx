import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getProductStatus } from "../../services/productApiService";
import { setProductStatusInStore } from "../../features/products/ProductSlice";

const useGetProductStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductStatus = async () => {
      try {
        const data = await getProductStatus();
        dispatch(setProductStatusInStore(data));
      } catch (error) {
        toast(`Hubo un error cargando los estados de producto: ${error.message}`);
      }
    };

    fetchProductStatus();
  }, []);
};

export default useGetProductStatus;