import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getProjectTypes } from "../../services/projectApiService";
import { setProjectTypesInStore } from "../../features/projects/ProjectSlice";

const useGetProjectTypes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const data = await getProjectTypes();
        dispatch(setProjectTypesInStore(data));
      } catch (error) {
        toast(`Hubo un error cargando los tipos de proyectos: ${error.message}`);
      }
    };

    fetchProjectTypes();
  }, []);
};

export default useGetProjectTypes;