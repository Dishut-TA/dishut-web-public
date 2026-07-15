import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import TransactionTableDonasi from './components/TransactionTableDonasi';
import EmptyState from '../../../../components/EmptyState';
import type { TransactionDonasiData } from '@/utils/interface';

export const mockDonasiList: TransactionDonasiData[] = [
  {
    id: 'TRX-101',
    tanggal: '2026-05-10',
    lahanProgram: 'Penghijauan Hulu Citarum',
    jenisBibit: 'Mahoni',
    jumlah: 50,
    amount: 750000,
    userName: 'Raisha Nabila',
    userPhone: '0895320343049',
    userEmail: 'raisha@gmail.com',
    paymentMethod: 'Bank Central Asia (BCA)',
    status: 'Terealisasi',
    lat: '-7.2345',
    long: '107.6541',
    fotoRealisasi: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'TRX-105',
    tanggal: '2026-05-18',
    lahanProgram: 'Penghijauan Hulu Citarum',
    jenisBibit: 'Mahoni',
    jumlah: 35,
    amount: 525000,
    userName: 'Raisha Nabila',
    userPhone: '0895320343049',
    userEmail: 'raisha@gmail.com',
    paymentMethod: 'Bank Mandiri',
    status: 'Terkumpul',
  }
];

const TransactionHistoryDonasi = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockDonasiList.filter((item) =>
    item.lahanProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-primary">Riwayat Donasi</h1>
          <div className="relative w-full md:w-72">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
            <input 
              type="text" placeholder="Search" value={searchQuery}
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