import { toast } from "react-toastify";
import { regenerateQrCode } from "../../services/itemApiService";
import { setItemRegenerateQr } from "../../features/items/ItemSlice";
import { showToastError, showToast } from "../../utils/toastUtils";
import { useDispatch } from "react-redux";

const useRegenerateQr = () => {
  const dispatch = useDispatch();

  const regenerate = async (id) => {
    if (!id) return;

    try {
      const data = await regenerateQrCode(id);
      dispatch(setItemRegenerateQr(data));
      showToast("Se ha descargado el QR correctamente.");
      return data;
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      console.error("Error al regenerar QR:", msj);
      showToastError(msj);
      return null;
    }
  };

  return regenerate;
};

export default useRegenerateQr;
