import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createParameter } from "../../services/parametersApiService";
import { fetchParametersFailure, fetchParametersStart, addParameter } from "../../features/parameters/ParameterSlice";

const useCreateParameter = () => {
  const dispatch = useDispatch();

  const parameterCreation = useCallback(
    async (payload) => {
      dispatch(fetchParametersStart());
      try {
        const response = await createParameter(payload);
        dispatch(addParameter(response));
        toast.success("Parámetro creado correctamente");
        return response;
      } catch (error) {
        dispatch(fetchParametersFailure(error.message));
        toast.error("Error al crear el parámetro");
      }
    },
    [dispatch]
  );

  return { parameterCreation };
};

export default useCreateParameter;
