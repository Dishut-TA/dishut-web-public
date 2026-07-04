import type { TransactionData } from '@/utils/interface';
import React from 'react';
import { FiDownload } from "react-icons/fi";

interface TransactionTableProps {
  data: TransactionData[];
  type: 'donasi' | 'investasi';
  onViewDetail: (item: TransactionData) => void;
  onExportData?: (item: TransactionData) => void; 
}

const TransactionTable: React.FC<TransactionTableProps> = ({ data, type, onViewDetail, onExportData }) => {
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
      case 'Sudah Dibayar': return 'text-[#2E7D32]';
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
            
            {/* Hanya ditampilkan di Investasi */}
            {type === 'investasi' && <th className="py-4 px-6">ID TRANSAKSI</th>}
            
            <th className="py-4 px-6">TANGGAL</th>
            
            {/* Conditional Kolom Pembayaran / Status */}
            {type === 'donasi' ? (
              <th className="py-4 px-6">PEMBAYARAN</th>
            ) : (
              <th className="py-4 px-6">STATUS</th>
            )}
            
            <th className="py-4 px-6">
              {type === 'donasi' ? 'JUMLAH DONASI' : 'JUMLAH INVESTASI'}
            </th>
            <th className="py-4 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 transition-colors duration-200 text-sm font-semibold text-primary">
              
              {/* Nama Kegiatan */}
              <td className="py-4 px-6">{item.activityName}</td>
              
              {/* ID Transaksi (Investasi Saja) */}
              {type === 'investasi' && <td className="py-4 px-6">{item.id}</td>}
              <td className="py-4 px-6">{item.date}</td>

              {/* Pembayaran / Status */}
              {type === 'donasi' ? (
                <td className="py-4 px-6 text-primary">{item.paymentMethod}</td>
              ) : (
                <td className={`py-4 px-6 ${getStatusColor(item.status)}`}>{item.status}</td>
              )}
              <td className={`py-4 px-6 ${type === 'donasi' ? 'text-[#2E7D32] font-bold' : ''}`}>
                {formatRupiah(item.amount)}
              </td>
              <td className="py-4 px-6 text-right">
                {type === 'donasi' ? (
                  <button 
                    onClick={() => onExportData && onExportData(item)}
                    className="text-[#847B62] flex items-center justify-end gap-2 ml-auto cursor-pointer hover:opacity-70 font-semibold transition-all duration-200"
                  >
                    Export Data <FiDownload className="text-lg" />
                  </button>
                ) : (
                  <button 
                    onClick={() => onViewDetail(item)}
                    className="text-tertiary cursor-pointer hover:text-tertiary/80 font-bold hover:underline transition-all duration-200"
                  >
                    Lihat Detail
                  </button>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;