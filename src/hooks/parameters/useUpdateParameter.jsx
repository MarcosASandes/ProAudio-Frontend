import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateParameter } from "../../services/parametersApiService";
import { updateParameterInStore } from "../../features/parameters/ParameterSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useUpdateParameter = () => {
  const dispatch = useDispatch();
  const updateParameterHook = useCallback(
    async (id, payload, onSuccess) => {
      try {
        const response = await updateParameter(id, payload);
        dispatch(updateParameterInStore(response));
        showToast("Parámetro actualizado correctamente");
        if (onSuccess) onSuccess();
        return true;
      } catch (error) {
        console.error(error);
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
        return false;
      }
    },
    [dispatch]
  );

  return { updateParameterHook };
};

export default useUpdateParameter;
