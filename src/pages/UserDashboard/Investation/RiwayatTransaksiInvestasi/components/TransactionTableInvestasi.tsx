import React from 'react';
import type { TransactionData } from '@/utils/interface';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

interface TransactionTableInvestasiProps {
  data: TransactionData[];
}

const TransactionTableInvestasi: React.FC<TransactionTableInvestasiProps> = ({ data }) => {
  const navigate = useNavigate();

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="w-full overflow-x-auto animate-[fadeIn_0.4s_ease-out]">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="border-b-2 border-primary/10 text-primary font-bold text-sm tracking-wider">
            <th className="py-5 px-6">NAMA KEGIATAN</th>
            <th className="py-5 px-6">ID TRANSAKSI</th>
            <th className="py-5 px-6">TANGGAL</th>
            <th className="py-5 px-6">JUMLAH INVESTASI</th>
            <th className="py-5 px-6 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const cleanId = item.id.replace('#', '');
            return (
              <tr key={index} className="border-b border-gray-100/70 transition-colors duration-200 text-sm font-semibold text-primary/90 hover:bg-gray-50/50">
                <td className="py-5 px-6 font-bold text-primary">{item.activityName}</td>
                <td className="py-5 px-6 text-gray-500 font-mono font-medium">{item.id}</td>
                <td className="py-5 px-6 text-gray-600 font-medium">{item.date}</td>
                <td className="py-5 px-6 font-bold text-gray-800">{formatRupiah(item.amount)}</td>
                <td className="py-5 px-6 text-center">
                  <button 
                    onClick={() => navigate(`/investasi/riwayat-transaksi/${cleanId}`)} 
                    className="text-primary hover:text-tertiary font-bold transition-all duration-200 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Detail <FiChevronRight size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTableInvestasi;