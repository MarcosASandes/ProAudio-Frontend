import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createProductPrice } from "../../services/productApiService";
import { toast } from "react-toastify";
import { addProductPriceInStore } from "../../features/products/ProductSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

export function useAddProductPrice() {
  const dispatch = useDispatch();

  const handleAddProductPrice = useCallback(
    async (productId, price) => {
      try {
        const payload = {
          value: price.value,
          description: price.description,
          product_id: productId,
        };

        const createdPrice = await createProductPrice(payload);

        const priceToStore = {
          rent_price_id: createdPrice.rent_price_id,
          value: createdPrice.value,
          description: createdPrice.description,
          status: createdPrice.status,
        };

        dispatch(addProductPriceInStore(priceToStore));
        showToast("Precio creado correctamente.");
      } catch (error) {
        console.error("Error al agregar precio:", error);
        toast.error("Error al agregar precio.");
      }
    },
    [dispatch]
  );

  return handleAddProductPrice;
}