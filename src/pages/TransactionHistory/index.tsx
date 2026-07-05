import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import TransactionTable from './components/TransactionTable';
import EmptyState from './components/EmptyState';
// import DetailModal from './components/DetailModal';
// import { ToastSuccess } from '@/utils/toast'; // Opsional jika ingin pakai toast saat export
import type { TransactionData } from '@/utils/interface';
import TransactionDonasiDetail from './sections/TransactionDonasiDetail';
import TransactionInvestasiDetail from './sections/TransactionInvestasiDetail';

const mockInvestasi: TransactionData[] = [
  { 
    id: '#72456', 
    activityName: 'Ekowisata Rimba Pinus', 
    date: '02/02/2026', 
    status: 'Sudah Dibayar', 
    amount: 10000000,
    userName: 'Raisha Nabila',
    userPhone: '0895320343049',
    userEmail: 'raisha@gmail.com',
    paymentMethod: 'Bank Central Asia (BCA)'
  },
  { 
    id: '#72457', 
    activityName: 'Reboisasi Gunung Puntang', 
    date: '15/02/2026', 
    status: 'Menunggu Konfirmasi', 
    amount: 5000000,
    userName: 'Raisha Nabila',
    userPhone: '0895320343049',
    userEmail: 'raisha@gmail.com',
    paymentMethod: 'Bank Mandiri'
  },
];

// Menambahkan Mock Data Donasi sesuai gambar
const mockDonasi: TransactionData[] = [
  {
    id: '#D0001', // Tetap ada id di data untuk keperluan key react, tapi tidak ditampilkan di tabel
    activityName: 'Penanaman Reboisasi Blok Gunung Cikuray',
    date: '02/02/2026',
    status: 'Sudah Dibayar',
    amount: 200000,
    userName: 'Raisha Nabila',
    userPhone: '0895320343049',
    userEmail: 'raisha@gmail.com',
    paymentMethod: 'Bank Central Asia (BCA)'
  },
  {
    id: '#D0002',
    activityName: 'Penanaman Reboisasi Blok Gunung Cikuray',
    date: '02/02/2026',
    status: 'Sudah Dibayar',
    amount: 200000,
    userName: 'Raisha Nabila',
    userPhone: '0895320343049',
    userEmail: 'raisha@gmail.com',
    paymentMethod: 'Bank Central Asia (BCA)'
  }
];

const TransactionHistory = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'donasi' | 'investasi'>(
    location.state?.defaultTab || 'investasi'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
    }
  }, [location.state]);

  const currentData = activeTab === 'investasi' ? mockInvestasi : mockDonasi;

  const filteredData = currentData.filter((item) =>
    item.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetail = (item: TransactionData) => {
    setSelectedTransaction(item);
  };

  const handleBackToTable = () => {
    setSelectedTransaction(null);
  };

  // const handleExportData = (item: TransactionData) => {
  //   console.log("Exporting data for:", item.activityName);
  //   ToastSuccess("Mendownload data transaksi...");
  // };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {selectedTransaction ? (
          activeTab === 'donasi' ? (
            <TransactionDonasiDetail data={selectedTransaction} onBack={handleBackToTable} />
          ) : (
            <TransactionInvestasiDetail data={selectedTransaction} onBack={handleBackToTable} />
          )
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                Riwayat Transaksi
              </h1>
              
              <div className="relative w-full md:w-72">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border-2 border-primary/20 bg-transparent focus:outline-none focus:border-tertiary transition-all duration-300 text-sm font-medium hover:border-primary/40"
                />
              </div>
            </div>

            <div className="bg-gray-200/60 p-1.5 rounded-xl inline-flex w-full md:w-auto mb-8">
              <button
                onClick={() => { setActiveTab('donasi'); setSelectedTransaction(null); }}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === 'donasi' ? 'bg-white text-primary shadow-md' : 'text-gray-500 hover:text-primary'
                }`}
              >
                Riwayat Transaksi Donasi
              </button>
              <button
                onClick={() => { setActiveTab('investasi'); setSelectedTransaction(null); }}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === 'investasi' ? 'bg-white text-primary shadow-md' : 'text-gray-500 hover:text-primary'
                }`}
              >
                Riwayat Transaksi Investasi
              </button>
            </div>

            <div className="transition-all duration-300">
              {filteredData.length > 0 ? (
                <TransactionTable 
                  data={filteredData} 
                  type={activeTab} 
                  onViewDetail={handleViewDetail} 
                />
              ) : (
                <EmptyState type={activeTab} />
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default TransactionHistory;