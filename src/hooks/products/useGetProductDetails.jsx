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
        // En este caso no se despacha ningún error al store.
      }
    };

    fetchProductDetails();
  }, [dispatch, id]);
};

export default useGetProductDetails;


/*---------------------- */

/*import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProductDetails } from "../../features/products/ProductSlice";
import { getProductDetails } from "../../services/productApiService";
import { selectSelectedProductDetails } from "../../features/products/ProductSelector";

const useGetProductDetails = (id) => {
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProductDetails);

  useEffect(() => {
    if (!id) return;

    // 👉 Solo pide si NO hay producto o si el ID es distinto (opcional)
    if (!product || String(product.id) !== String(id)) {
      const fetchProductDetails = async () => {
        try {
          const data = await getProductDetails(id);
          dispatch(setSelectedProductDetails(data));
        } catch (error) {
          console.error("Error al obtener el producto:", error);
        }
      };

      fetchProductDetails();
    }
  }, [dispatch, id, product]);
};

export default useGetProductDetails;*/
