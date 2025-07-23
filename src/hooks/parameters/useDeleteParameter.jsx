import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteParameter } from "../../services/parametersApiService";
import { removeParameter } from "../../features/parameters/ParameterSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useDeleteParameter = () => {
  const dispatch = useDispatch();

  const handleDeleteParameter = async (id) => {
    try {
      await deleteParameter(id);
      dispatch(removeParameter(id));
      showToast("Parámetro eliminado correctamente.");
    } catch (error) {
      const msj = error.response?.data?.message || "Ocurrió un error inesperado";
      showToastError(msj);
    }
  };

  return handleDeleteParameter;
};

export default useDeleteParameter;
