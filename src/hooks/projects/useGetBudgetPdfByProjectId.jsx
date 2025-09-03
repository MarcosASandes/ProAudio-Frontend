import { showToastError } from '../../utils/toastUtils';
import { getBudgetPdfByProjectId } from '../../services/projectApiService';

const useGetBudgetPdfByProjectId = () => {
  const fetchPdf = async (id) => {
    try {
      if (!id) showToastError('ID inválido');
      return await getBudgetPdfByProjectId(id);
    } catch (error) {
      const msg = error.response?.data?.message || 'No se pudo cargar el PDF';
      console.error('Error al obtener el PDF:', msg);
      showToastError(msg);
      return null;
    }
  };

  return fetchPdf;
};

export default useGetBudgetPdfByProjectId;
