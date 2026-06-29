import type { TransactionData } from '@/utils/interface';
import React from 'react';

interface TransactionTableProps {
  data: TransactionData[];
  type: 'donasi' | 'investasi';
  onViewDetail: (item: TransactionData) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ data, type, onViewDetail }) => {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Menunggu Konfirmasi': return 'text-orange-500';
      case 'Diverifikasi': return 'text-green-700';
      case 'Sudah Dibayar': return 'text-green-700';
      case 'Dibatalkan': return 'text-red-500';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-customWhite rounded-xl border border-gray-100 animate-[fadeIn_0.5s_ease-in-out]">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="border-b-2 border-primary/20 text-primary font-bold text-sm">
            <th className="py-4 px-6">NAMA KEGIATAN</th>
            <th className="py-4 px-6">ID TRANSAKSI</th>
            <th className="py-4 px-6">TANGGAL</th>
            <th className="py-4 px-6">STATUS</th>
            <th className="py-4 px-6">
              {type === 'donasi' ? 'JUMLAH DONASI' : 'JUMLAH INVESTASI'}
            </th>
            <th className="py-4 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 transition-colors duration-200 text-sm font-semibold text-gray-700">
              <td className="py-4 px-6">{item.activityName}</td>
              <td className="py-4 px-6">{item.id}</td>
              <td className="py-4 px-6">{item.date}</td>
              <td className={`py-4 px-6 ${getStatusColor(item.status)}`}>{item.status}</td>
              <td className="py-4 px-6">{formatRupiah(item.amount)}</td>
              <td className="py-4 px-6 text-right">
                <button 
                  onClick={() => onViewDetail(item)}
                  className="text-tertiary cursor-pointer group-hover:text-tertiary/20 font-bold hover:underline transition-all duration-200 active:scale-95"
                >
                  Lihat Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;