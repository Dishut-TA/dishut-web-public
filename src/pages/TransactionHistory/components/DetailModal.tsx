import type { TransactionData } from '@/utils/interface';
import React from 'react';
import { HiOutlineX } from 'react-icons/hi';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TransactionData | null;
  type: 'donasi' | 'investasi';
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, data, type }) => {
  if (!isOpen || !data) return null;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-in-out]" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl w-full max-w-xl p-6 md:p-8 shadow-2xl animate-[popUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Detail Transaksi</h2>
          <button 
            onClick={onClose}
            className="p-1 cursor-pointer rounded-full text-gray-800 hover:bg-gray-100 transition-all duration-300 hover:rotate-90 hover:text-red-500 focus:outline-none"
          >
            <HiOutlineX size={28} />
          </button>
        </div>

        <div className="bg-[#DDF2E4] rounded-xl p-6 text-primary">
          <h3 className="font-bold text-lg mb-4">Order {data.id}</h3>

          <div className="mb-6">
            <h4 className="font-bold text-lg mb-3">Informasi Data Diri</h4>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">Nama</span>
                <span className="font-bold">{data.userName || '-'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">No Telepon</span>
                <span className="font-bold">{data.userPhone || '-'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">Email</span>
                <span className="font-bold">{data.userEmail || '-'}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">
              Informasi {type === 'donasi' ? 'Donasi' : 'Investasi'}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">Tanggal</span>
                <span className="font-bold">{data.date}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">
                  Nama {type === 'donasi' ? 'Donasi' : 'Investasi'}
                </span>
                <span className="font-bold">{data.activityName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">Total</span>
                <span className="font-bold">{formatRupiah(data.amount)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">Metode Pembayaran</span>
                <span className="font-bold">{data.paymentMethod || '-'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-white/40 transition-colors">
                <span className="text-primary/80 mb-1 sm:mb-0">Status</span>
                <span className="font-bold">{data.status}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popUp {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DetailModal;