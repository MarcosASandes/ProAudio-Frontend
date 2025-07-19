import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getStartingProjectStatus } from "../../services/projectApiService";
import { setStartingProjectStatusInStore } from "../../features/projects/ProjectSlice";

const useGetStartingProjectStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStartingProjectStatus = async () => {
      try {
        const data = await getStartingProjectStatus();
        dispatch(setStartingProjectStatusInStore(data.statuses));
      } catch (error) {
        toast(`Hubo un error cargando los estados de un proyecto inicial: ${error.message}`);
      }
    };

    fetchStartingProjectStatus();
  }, []);
};

export default useGetStartingProjectStatus;