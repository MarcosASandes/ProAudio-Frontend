import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTagsTypes } from "../../services/tagApiService";
import { setTagsTypeInStore } from "../../features/tags/tagSlice";
import { showToastError } from "../../utils/toastUtils";

const useGetTagsTypes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTagsTypes = async () => {
      try {
        const data = await getTagsTypes();
        dispatch(setTagsTypeInStore(data));
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchTagsTypes();
  }, []);
};

export default useGetTagsTypes;