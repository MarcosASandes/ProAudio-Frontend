import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateParameter } from "../../services/parametersApiService";
import { updateParameterInStore } from "../../features/parameters/ParameterSlice";

const useUpdateParameter = () => {
  const dispatch = useDispatch();
  const updateParameterHook = useCallback(
    async (id, payload, onSuccess) => {
      try {
        const response = await updateParameter(id, payload);
        dispatch(updateParameterInStore(response));
        toast.success("Parámetro actualizado correctamente");
        if (onSuccess) onSuccess();
        return true;
      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar el parámetro: " + error.message);
        return false;
      }
    },
    [dispatch]
  );

  return { updateParameterHook };
};

export default useUpdateParameter;
