import { toast } from "sonner";

export const ToastSuccess = (message: string) => {
  toast.success(message, {
    id: `success-${message}`,
    duration: 3000,
  });
};

export const ToastError = (message: string) => {
  toast.error(message, {
    id: `error-${message}`,
    duration: 3000,
  });
};