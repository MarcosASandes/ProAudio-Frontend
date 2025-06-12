// hooks/tags/useGetTagById.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTagById } from "../../services/tagApiService";
import { setSelectedTag } from "../../features/tags/TagSlice";

const useGetTagById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchTag = async () => {
      try {
        const data = await getTagById(id);
        dispatch(setSelectedTag(data));
      } catch (error) {
        console.error("Error al obtener la etiqueta:", error);
        // En este caso no se despacha ningún error al store.
      }
    };

    fetchTag();
  }, [dispatch, id]);
};

export default useGetTagById;
