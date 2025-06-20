import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTagsTypes } from "../../services/tagApiService";
import { setTagsTypeInStore } from "../../features/tags/tagSlice";
import { toast } from "react-toastify";

const useGetTagsTypes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTagsTypes = async () => {
      try {
        const data = await getTagsTypes();
        dispatch(setTagsTypeInStore(data));
      } catch (error) {
        toast(`Hubo un error cargando los tipos de etiquetas: ${error.message}`);
      }
    };

    fetchTagsTypes();
  }, []);
};

export default useGetTagsTypes;