import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProjectDetails } from "../../services/projectApiService";
import { setSelectedProjectDetails } from "../../features/projects/ProjectSlice";

const useGetProjectDetails = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchProjectDetails = async () => {
      try {
        const data = await getProjectDetails(id);
        dispatch(setSelectedProjectDetails(data));
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
      }
    };

    fetchProjectDetails();
  }, [dispatch, id]);
};

export default useGetProjectDetails;
