/*import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTags } from "../../services/tagApiService";
import { fetchTagsStart, fetchTagsSuccess, fetchTagsFailure } from "../../features/tags/tagSlice";

const useGetAllTags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTags = async () => {
      dispatch(fetchTagsStart());
      try {
        const data = await getAllTags();
        dispatch(fetchTagsSuccess(data.tags));
      } catch (error) {
        dispatch(fetchTagsFailure(error.message || "Error al cargar las etiquetas"));
      }
    };

    fetchTags();
  }, [dispatch]);
};

export default useGetAllTags;*/




/*- - - - - - -  */


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../services/tagApiService";
import { fetchTagsStart, fetchTagsSuccess, fetchTagsFailure } from "../../features/tags/TagSlice";
import { selectTags } from "../../features/tags/TagSelector";

const useGetAllTags = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);

  useEffect(() => {
    if (tags.length > 0) return; // Ya los tengo, no vuelvo a pedir

    const fetchTags = async () => {
      dispatch(fetchTagsStart());
      try {
        const data = await getAllTags();
        dispatch(fetchTagsSuccess(data.tags));
      } catch (error) {
        dispatch(fetchTagsFailure(error.message || "Error al cargar las etiquetas"));
      }
    };

    fetchTags();
  }, [dispatch, tags]);
};

export default useGetAllTags;

