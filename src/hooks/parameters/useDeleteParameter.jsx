import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteParameter } from "../../services/parametersApiService";
import { removeParameter } from "../../features/parameters/ParameterSlice";

const useDeleteParameter = () => {
  const dispatch = useDispatch();

  const handleDeleteParameter = async (id) => {
    try {
      await deleteParameter(id);
      dispatch(removeParameter(id));
      toast.success("Parámetro eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el parámetro: " + error.message);
    }
  };

  return handleDeleteParameter;
};

export default useDeleteParameter;
