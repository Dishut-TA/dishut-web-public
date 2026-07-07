import React from 'react';
import type { TransactionData } from '@/utils/interface';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; 

interface TransactionTableDonasiProps {
  data: TransactionData[];
}

const TransactionTableDonasi: React.FC<TransactionTableDonasiProps> = ({ data }) => {
  const navigate = useNavigate(); 

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="w-full overflow-x-auto animate-[fadeIn_0.4s_ease-out]">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="border-b-2 border-primary/10 text-primary font-bold text-sm tracking-wider">
            <th className="py-5 px-6">PROGRAM/BIBIT</th>
            <th className="py-5 px-6">TANGGAL</th>
            <th className="py-5 px-6">PEMBAYARAN</th>
            <th className="py-5 px-6">JUMLAH DONASI</th>
            <th className="py-5 px-6 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const cleanId = item.id.replace('#', '');
            
            return (
              <tr key={index} className="border-b border-gray-100/70 transition-colors duration-200 text-sm font-semibold text-primary/90 hover:bg-gray-50/50">
                <td className="py-5 px-6">
                  <div className="font-bold text-primary">{item.activityName}</div>
                  <div className="text-xs text-gray-400 font-medium mt-1">Order ID : {cleanId}</div>
                </td>
                <td className="py-5 px-6 text-gray-600 font-medium">{item.date}</td>
                <td className="py-5 px-6 text-gray-600 font-medium">{item.paymentMethod}</td>
                <td className="py-5 px-6 font-bold text-[#2E7D32]">{formatRupiah(item.amount)}</td>
                <td className="py-5 px-6 text-center">
                  <button 
                    onClick={() => navigate(`/donasi/riwayat-transaksi/${cleanId}`)} 
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

export default TransactionTableDonasi;