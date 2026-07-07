import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import TransactionTableDonasi from './components/TransactionTableDonasi';
import EmptyState from '../../../components/EmptyState';
import type { TransactionData } from '@/utils/interface';

export const mockDonasi: TransactionData[] = [
  {
    id: '#712631812',
    activityName: 'Penanaman Reboisasi Blok Gunung Cikuray',
    date: '06/03/2024',
    status: 'Sudah Dibayar',
    amount: 200000,
    userName: 'Raisha Nabila',
    userPhone: '0895320343049',
    userEmail: 'raisha@gmail.com',
    paymentMethod: 'Bank Central Asia (BCA)'
  }
];

const TransactionHistoryDonasi = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockDonasi.filter((item) =>
    item.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Riwayat Donasi
          </h1>
          <div className="relative w-full md:w-72">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-primary bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="w-full">
          {filteredData.length > 0 ? (
            <TransactionTableDonasi data={filteredData} />
          ) : (
            <EmptyState type="donasi" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryDonasi;