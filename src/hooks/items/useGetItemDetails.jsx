import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItemDetails } from "../../services/itemApiService";
import { toast } from "react-toastify";
import { setSelectedItemDetails } from "../../features/items/ItemSlice";

const useGetItemDetails = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchItemDetails = async () => {
      try {
        const data = await getItemDetails(id);
        dispatch(setSelectedItemDetails(data));
      } catch (error) {
        console.error("Error al obtener el artículo:", error);
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        toast("Error al obtener el artículo: " + msj);
      }
    };

    fetchItemDetails();
  }, [dispatch, id]);
};

export default useGetItemDetails;