import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getProductsInProject } from "../../services/projectApiService";
import { setProductsInProjectInStore } from "../../features/products/ProductSlice";

const useGetProductsInProject = () => {
  const dispatch = useDispatch();

  const fetchProductProjects = useCallback(async (id) => {
    try {
      const data = await getProductsInProject(id);
      dispatch(setProductsInProjectInStore(data));
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
    }
  }, [dispatch]);

  return { fetchProductProjects };
};

export default useGetProductsInProject;