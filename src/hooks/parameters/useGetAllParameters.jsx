import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllParameters } from "../../services/parametersApiService";
import {
  fetchParametersStart,
  fetchParametersSuccess,
  fetchParametersFailure,
} from "../../features/parameters/ParameterSlice";

const useGetAllParameters = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchAllParameter = async () => {
      dispatch(fetchParametersStart());
      try {
        const response = await getAllParameters();
        dispatch(fetchParametersSuccess(response));
        toast("Parámetros encontrados con éxito.");
      } catch (error) {
        dispatch(fetchParametersFailure(error.message));
        toast("Error al obtener los parámetros:" + error.message);
      }
    };

    fetchAllParameter();
  }, [dispatch, id]);
};

export default useGetAllParameters;
