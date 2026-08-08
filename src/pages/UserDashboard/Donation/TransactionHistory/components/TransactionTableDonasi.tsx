import type { TransactionDonasiData } from '@/utils/interface';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; 

interface TransactionTableDonasiProps {
  data: TransactionDonasiData[];
}

const TransactionTableDonasi: React.FC<TransactionTableDonasiProps> = ({ data }) => {
  const navigate = useNavigate(); 

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'terealisasi': 
      case 'success':
      case 'berhasil': 
        return 'text-primary bg-primary/10';
      case 'terkumpul': 
        return 'text-secondary bg-secondary/10';
      case 'disalurkan': 
        return 'text-tertiary bg-tertiary/10';
      case 'pending': 
      case 'menunggu verifikasi': 
        return 'text-amber-600 bg-amber-50';
      case 'gagal': 
      case 'failed': 
      case 'ditolak': 
        return 'text-red-600 bg-red-50';
      default: 
        return 'text-primary bg-gray-100'; 
    }
  }

  return (
    <div className="w-full overflow-x-auto animate-[fadeIn_0.4s_ease-out]">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="border-b-2 border-primary/10 text-primary font-bold text-sm tracking-wider">
            <th className="py-5 px-6">ID TRANSAKSI</th>
            <th className="py-5 px-6">TANGGAL</th>
            <th className="py-5 px-6">LAHAN / PROGRAM</th>
            <th className="py-5 px-6">JENIS BIBIT</th>
            <th className="py-5 px-6 text-center">JUMLAH</th>
            <th className="py-5 px-6 text-center">STATUS</th>
            <th className="py-5 px-6 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-100/70 transition-colors duration-200 text-sm font-semibold text-primary/90 hover:bg-gray-50/50">
              <td className="py-5 px-6 text-gray-500">TRX-{item.id.padStart(3, '0')}</td>
              <td className="py-5 px-6 text-gray-500">{item.tanggal}</td>
              <td className="py-5 px-6 font-bold">{item.lahanProgram}</td>
              <td className="py-5 px-6 text-gray-500">{item.jenisBibit}</td>
              <td className="py-5 px-6 text-center text-primary font-bold">{item.jumlah}</td>
              <td className="py-5 px-6 text-center">
                 <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                    {item.status}
                 </span>
              </td>
              <td className="py-5 px-6 text-center">
                <button 
                  onClick={() => navigate(`/donasi/riwayat-transaksi/${item.id}`)} 
                  className="text-primary hover:text-tertiary font-bold transition-all duration-200 inline-flex items-center gap-1 cursor-pointer px-4 py-2"
                >
                  Detail <FiChevronRight size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTableDonasi;