import Swal from 'sweetalert2';

// 1. Alert untuk Konfirmasi
export const AlertConfirm = async (
  title: string, 
  text: string, 
  confirmText = 'Ya', 
  cancelText = 'Batal'
) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1B5E20', 
    cancelButtonColor: '#7E6D3C',  
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true, 
    customClass: {
      popup: '!rounded-3xl', 
      confirmButton: '!rounded-full px-4 py-2',
      cancelButton: '!rounded-full px-4 py-2',
    }
  });

  return result.isConfirmed; 
};

// 2. Alert Sukses
export const AlertSuccess = (title: string, text?: string) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#10B981',
    customClass: { 
      popup: '!rounded-3xl',
      confirmButton: '!rounded-full px-4 py-2',
      cancelButton: '!rounded-full px-4 py-2',
    }
  });
};

// 3. Alert Error
export const AlertError = (title: string, text?: string) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#EF4444',
    customClass: { 
      popup: '!rounded-3xl',
      confirmButton: '!rounded-full px-4 py-2',
      cancelButton: '!rounded-full px-4 py-2',    }
  });
};

export const AlertWarning = (title: string, text?: string) => {
  Swal.fire({
    title,
    text,
    icon: 'warning',
    confirmButtonColor: '#F59E0B',
    customClass: { 
      popup: '!rounded-3xl',
      confirmButton: '!rounded-full px-4 py-2',
      cancelButton: '!rounded-full px-4 py-2',
    }
  });
};