import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToastError } from "../../utils/toastUtils";
import { getProjectsTimelineData } from "../../services/analyticsApiService";
import { setProjectsTimelineAnalytic } from "../../features/analytics/AnalyticSlice";

const useGetProjectsTimelineData = (start, end) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnalyticProjectsTimeline = async () => {
      try {
        const data = await getProjectsTimelineData(start, end);
        dispatch(setProjectsTimelineAnalytic(data));
      } catch (error) {
        const msj =
          error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    };

    fetchAnalyticProjectsTimeline();
  }, [dispatch, start, end]);
};

export default useGetProjectsTimelineData;
