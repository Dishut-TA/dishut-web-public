import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import TransactionTableInvestasi from './components/TransactionTableInvestasi';
import EmptyState from '../../../../components/EmptyState';
import type { TransactionData } from '@/utils/interface';

export const mockInvestasi: TransactionData[] = [
  { 
    id: '#72456', activityName: 'Ekowisata Rimba Pinus', date: '02/02/2026', status: 'Sudah Dibayar', amount: 10000000,
    userName: 'Raisha Nabila', userPhone: '0895320343049', userEmail: 'raisha@gmail.com', paymentMethod: 'Bank Central Asia (BCA)'
  },
  { 
    id: '#72457', activityName: 'Reboisasi Gunung Puntang', date: '15/02/2026', status: 'Menunggu Konfirmasi', amount: 5000000,
    userName: 'Raisha Nabila', userPhone: '0895320343049', userEmail: 'raisha@gmail.com', paymentMethod: 'Bank Mandiri'
  },
];

const TransactionHistoryInvestasi = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockInvestasi.filter((item) =>
    item.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-primary">Riwayat Transaksi Investasi</h1>
          <div className="relative w-full md:w-72">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
            <input 
              type="text" placeholder="Search" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-primary bg-transparent focus:outline-none focus:border-primary text-sm font-medium"
            />
          </div>
        </div>
        <div className="w-full">{filteredData.length > 0 ? <TransactionTableInvestasi data={filteredData} /> : <EmptyState type="investasi" />}</div>
      </div>
    </div>
  );
};

export default TransactionHistoryInvestasi;