import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../services/tagApiService";
import {
  fetchTagsStart,
  fetchTagsSuccess,
  fetchTagsFailure,
} from "../../features/tags/tagSlice";
import { selectIsTagsLoaded } from "../../features/tags/TagSelector";

const useGetAllTags = (force = false) => {
  const dispatch = useDispatch();
  const loaded = useSelector(selectIsTagsLoaded);

  useEffect(() => {
    if (!force && loaded) return;

    const fetchTags = async () => {
      dispatch(fetchTagsStart());
      try {
        const data = await getAllTags();
        dispatch(fetchTagsSuccess(data.tags));
      } catch (error) {
        dispatch(
          fetchTagsFailure(error.message || "Error al cargar las etiquetas")
        );
      }
    };

    fetchTags();
  }, [dispatch, force, loaded]);
};

export default useGetAllTags;
