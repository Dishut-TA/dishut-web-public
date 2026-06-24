import React, { useEffect } from 'react';

interface AgreementWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const AgreementWarningModal: React.FC<AgreementWarningModalProps> = ({ 
  isOpen, 
  onClose, 
  onProceed 
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-125 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        
        <h2 className="text-2xl font-bold text-[#D32F2F] mb-6">
          Penting Unduh Surat Perjanjian!
        </h2>

        <div className="w-32 h-32 bg-linear-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 mb-8 relative">
          <span className="text-white text-7xl font-bold font-serif leading-none -mt-2">!</span>
          <div className="absolute -bottom-6 w-20 h-4 bg-black/10 rounded-[100%] blur-sm"></div>
        </div>

        <p className="text-[#333333] text-[15px] leading-relaxed mb-8 px-2">
          Sebelum Anda melanjutkan ke halaman pembayaran, harap unduh surat perjanjian terlebih dahulu. Surat ini harus diunggah kembali setelah Anda menandatanganinya untuk melengkapi proses verifikasi.
        </p>

        <button 
          onClick={onProceed}
          className="w-full bg-primary hover:bg-[#144a18] text-white font-semibold py-3.5 rounded-full transition-colors shadow-md hover:shadow-lg"
        >
          Lanjut ke Pembayaran
        </button>

      </div>
    </div>
  );
};

export default AgreementWarningModal;