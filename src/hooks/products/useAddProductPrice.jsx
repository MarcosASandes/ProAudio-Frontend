/*import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createProductPrice } from "../../services/productApiService";
import { toast } from "react-toastify";
import { addProductPriceInStore } from "../../features/products/ProductSlice";

export function useAddProductPrice() {
  const dispatch = useDispatch();

  const handleAddProductPrice = useCallback(
    async (priceData, onSuccess) => {
      try {
        // 👉 Llamar API
        const createdPrice = await createProductPrice(priceData);

        // 👉 Reestructurar para la store
        const priceForStore = {
          rent_price_id: createdPrice.rent_price_id,
          value: createdPrice.value,
          description: createdPrice.description,
          status: createdPrice.status,
        };

        // 👉 Actualizar store
        dispatch(addProductPrice(priceForStore));

        toast.success("Precio agregado ✅");

        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("Error al agregar precio:", error);
        toast.error("Error al agregar el precio ❌");
      }
    },
    [dispatch]
  );

  return handleAddProductPrice;
}*/


/*------------------ */

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createProductPrice } from "../../services/productApiService";
import { toast } from "react-toastify";
import { addProductPriceInStore } from "../../features/products/ProductSlice";

export function useAddProductPrice() {
  const dispatch = useDispatch();

  const handleAddProductPrice = useCallback(
    async (productId, price) => {
      try {
        // 👉 Mapeo: camelCase a snake_case
        const payload = {
          value: price.value,
          description: price.description,
          product_id: productId,
        };

        const createdPrice = await createProductPrice(payload);

        // Mapeo de respuesta a store
        const priceToStore = {
          rent_price_id: createdPrice.rent_price_id,
          value: createdPrice.value,
          description: createdPrice.description,
          status: createdPrice.status,
        };

        dispatch(addProductPriceInStore(priceToStore));
      } catch (error) {
        console.error("Error al agregar precio:", error);
        toast.error("Error al agregar precio.");
      }
    },
    [dispatch]
  );

  return handleAddProductPrice;
}