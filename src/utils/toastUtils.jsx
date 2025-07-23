import { toast } from 'react-toastify';
import CustomToast from '../components/global/CustomToast';

export const showToast = (message) => {
  toast(
    <CustomToast message={message} type="normal" />,
    {
      className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      progressClassName: 'custom-toast-progress',
    }
  );
};

export const showToastError = (message) => {
  toast.error(
    <CustomToast message={message} type="error" />,
    {
      className: 'custom-toast error-toast',
      bodyClassName: 'custom-toast-body',
      progressClassName: 'custom-toast-progress',
    }
  );
};

