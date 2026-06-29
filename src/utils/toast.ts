import { toast } from 'sonner';

export const ToastSuccess = (message: string) => {
  toast.success(message, { duration: 3000 });
};

export const ToastError = (message: string) => {
  toast.error(message, { duration: 3000 });
};