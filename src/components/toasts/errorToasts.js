import { toast } from 'react-toastify';

const errorToast = (error) =>
  toast.error(`${error}`, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });

export { errorToast };
