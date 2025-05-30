import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTags } from "../../services/tagApiService";
import { fetchTagsStart, fetchTagsSuccess, fetchTagsFailure } from "../../features/tags/TagSlice";

const useGetAllTags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTags = async () => {
      dispatch(fetchTagsStart());
      try {
        const data = await getAllTags();
        dispatch(fetchTagsSuccess(data));
      } catch (error) {
        dispatch(fetchTagsFailure(error.message || "Error al cargar las etiquetas"));
      }
    };

    fetchTags();
  }, [dispatch]);
};

export default useGetAllTags;
