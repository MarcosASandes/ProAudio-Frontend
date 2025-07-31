/*import { useEffect } from "react";
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

export default useGetPricesByProductId;*/

/*------------- */

/*import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductPrices } from "../../services/productApiService";
import { setProductSelectedPricesInStore } from "../../features/products/ProductSlice";

const useGetPricesByProductId = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchProductPricesById = async () => {
      try {
        const prices = await getProductPrices(id);
        dispatch(setProductSelectedPricesInStore({ productId: id, prices }));
      } catch (error) {
        console.error("Error al obtener los precios del producto:", error);
      }
    };

    fetchProductPricesById();
  }, [dispatch, id]);
};

export default useGetPricesByProductId;*/

/*---------------------- */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getProductPrices } from "../../services/productApiService";
import { setProductSelectedPricesInStore } from "../../features/products/ProductSlice";
import { selectProductPrices } from "../../features/products/ProductSelector";
import { getProductPrices } from "../../services/rentPriceApiService";

const useGetPricesByProductId = (productId) => {
  const dispatch = useDispatch();

  const existingPrices = useSelector((state) =>
    selectProductPrices(state, productId)
  );

  useEffect(() => {
    if (!productId || existingPrices) return;

    const fetchProductPricesById = async () => {
      try {
        const prices = await getProductPrices(productId);
        dispatch(setProductSelectedPricesInStore({ productId, prices }));
      } catch (error) {
        console.error("Error al obtener los precios del producto:", error);
      }
    };

    fetchProductPricesById();
  }, [dispatch, productId, existingPrices]);
};

export default useGetPricesByProductId;
