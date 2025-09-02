import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createParameter } from "../../services/parametersApiService";
import { fetchParametersFailure, fetchParametersStart, addParameter } from "../../features/parameters/ParameterSlice";
import { showToast, showToastError } from "../../utils/toastUtils";

const useCreateParameter = () => {
  const dispatch = useDispatch();

  const parameterCreation = useCallback(
    async (payload) => {
      dispatch(fetchParametersStart());
      try {
        const response = await createParameter(payload);
        dispatch(addParameter(response));
        showToast("Parámetro creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchParametersFailure(error.message));
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { parameterCreation };
};

export default useCreateParameter;
