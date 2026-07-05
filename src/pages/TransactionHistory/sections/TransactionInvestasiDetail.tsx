import React from 'react';
import { 
  FiArrowLeft, FiClock, FiXCircle, FiCheckCircle,
  FiUser, FiHash, FiCreditCard, FiActivity, FiCalendar, FiDollarSign
} from 'react-icons/fi';
import type { TransactionData } from '@/utils/interface';

interface Props {
  data: TransactionData;
  onBack: () => void;
}

const TransactionInvestasiDetail: React.FC<Props> = ({ data, onBack }) => {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const getStatusUI = (status: string) => {
    switch (status) {
      case 'Menunggu Konfirmasi':
        return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: <FiClock size={28} /> };
      case 'Diverifikasi':
      case 'Sudah Dibayar':
        return { color: 'text-[#2E7D32]', bg: 'bg-[#DCECE0]', border: 'border-[#98C98A]', icon: <FiCheckCircle size={28} /> };
      case 'Dibatalkan':
        return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: <FiXCircle size={28} /> };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200', icon: <FiClock size={28} /> };
    }
  };

  const statusUI = getStatusUI(data.status);

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
        <button 
          onClick={onBack} 
          className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 hover:text-primary rounded-xl transition-all duration-300 shadow-sm active:scale-95 text-gray-500"
        >
          <FiArrowLeft size={22} />
        </button>
        <h2 className="text-2xl font-extrabold text-primary">Detail Investasi</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-tertiary rounded-full"></span> Informasi Investor
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Nama Lengkap</p>
                <p className="font-bold text-primary text-base">{data.userName || '-'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <FiHash size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">ID Transaksi</p>
                <p className="font-bold text-primary text-base">{data.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <FiCreditCard size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Metode Pembayaran</p>
                <p className="font-bold text-primary text-base">{data.paymentMethod || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-tertiary rounded-full"></span> Detail Investasi
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <FiActivity size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-0.5">Nama Kegiatan</p>
                <p className="font-bold text-primary text-base line-clamp-1">{data.activityName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <FiCalendar size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Tanggal Pengajuan</p>
                <p className="font-bold text-primary text-base">{data.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                <FiDollarSign size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">Jumlah Investasi</p>
                <p className="font-bold text-green-700 text-xl tracking-tight">{formatRupiah(data.amount)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 p-6 md:p-8 rounded-3xl border shadow-sm flex items-center gap-6 relative overflow-hidden ${statusUI.bg} ${statusUI.border}`}>
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className={`w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 ${statusUI.color}`}>
          {statusUI.icon}
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Status Transaksi</p>
          <p className={`text-2xl font-extrabold ${statusUI.color}`}>
            {data.status}
          </p>
          
          {data.status === 'Menunggu Konfirmasi' && (
            <p className="text-sm text-gray-600 mt-2 font-medium">Tim kami sedang memverifikasi pembayaran Anda. Mohon tunggu sesaat.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInvestasiDetail;