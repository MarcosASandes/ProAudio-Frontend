import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTagById } from "../../services/tagApiService";
import { setSelectedTag } from "../../features/tags/tagSlice";

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
      }
    };

    fetchTag();
  }, [dispatch, id]);
};

export default useGetTagById;
