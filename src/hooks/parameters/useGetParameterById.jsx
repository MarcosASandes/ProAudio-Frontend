import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getParameterById } from "../../services/parametersApiService";
import { setSelectedParameter } from "../../features/parameters/ParameterSlice";

const useGetParameterById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchParameterById = async () => {
      try {
        const response = await getParameterById(id);
        dispatch(setSelectedParameter(response));
        toast("Parámetro encontrado con éxito.");
      } catch (error) {
        toast("Error al obtener el parámetro:" + error.message);
      }
    };

    fetchParameterById();
  }, [dispatch, id]);
};

export default useGetParameterById;