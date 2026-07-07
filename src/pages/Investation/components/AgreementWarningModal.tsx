import React, { useEffect } from 'react';
import { ToastSuccess } from '@/utils/toast';

interface AgreementWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  onTriggerDownload: () => void;
}

const AgreementWarningModal: React.FC<AgreementWarningModalProps> = ({ 
  isOpen, 
  onClose, 
  onProceed,
  onTriggerDownload
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadClick = () => {
    onTriggerDownload();
    ToastSuccess("Template Surat Perjanjian berhasil diunduh!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center text-center animate-[fadeIn_0.2s_ease-out]">
        
        <h2 className="text-2xl font-bold text-[#D32F2F] mb-6">
          Penting Unduh Surat Perjanjian!
        </h2>

        <div className="w-32 h-32 bg-linear-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 mb-8 relative">
          <span className="text-white text-7xl font-bold font-serif leading-none -mt-2">!</span>
          <div className="absolute -bottom-4 w-20 h-3 bg-black/10 rounded-[100%] blur-sm"></div>
        </div>

        <p className="text-[#333333] text-[15px] leading-relaxed mb-8 px-2">
          Sebelum Anda melanjutkan ke halaman pembayaran, harap unduh surat perjanjian terlebih dahulu dimenu <span className="font-bold">"Dokumen"</span>. Surat ini harus diunduh kembali setelah Anda menandatanganinya untuk melengkapi proses verifikasi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <button 
            onClick={handleDownloadClick}
            className="w-full bg-[#E5EAE6] hover:bg-gray-200 text-primary font-semibold py-3.5 rounded-full transition-all active:scale-[0.98]"
          >
            Unduh Surat Perjanjian
          </button>
          <button 
            onClick={onProceed}
            className="w-full bg-primary hover:bg-[#144a18] text-white font-semibold py-3.5 rounded-full transition-all active:scale-[0.98] shadow-md"
          >
            Lanjut ke Investasi
          </button>
        </div>

      </div>
    </div>
  );
};

export default AgreementWarningModal;