import { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import { getRiwayatTransaksiAPI } from '@/services/invest.service';
import { ToastError } from '@/utils/toast';
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
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = (user as any)?.token || localStorage.getItem('token') || '';
        const userId = (user as any)?.id || '';
        if (!userId) return;

        const data = await getRiwayatTransaksiAPI(token, userId);
        console.log(data)
        
        const mappedData: TransactionData[] = data.map((trx: any) => ({
          id: `${trx.id || trx.id_transaksi || Math.random().toString(36).substr(2, 6)}`,
          activityName: trx.nama_program_investasi || trx.program?.nama_program_investasi || trx.program?.nama_program || 'Program Investasi',
          date: new Date(trx.tanggal_bayar || trx.created_at || Date.now()).toLocaleDateString('id-ID'),
          status: trx.status_pembayaran === 'PENDING' ? 'Menunggu Konfirmasi' : (trx.status_pembayaran === 'SUCCESS' || trx.status_pembayaran === 'PAID' ? 'Sudah Dibayar' : trx.status_pembayaran),
          amount: parseFloat(trx.total_nominal_pembayaran || trx.nominal_pendanaan || 0),
          userName: trx.nama_investor || trx.nama || '',
          userPhone: trx.no_telp || '',
          userEmail: trx.email || '',
          paymentMethod: trx.metode_pembayaran || '-'
        }));

        setTransactions(mappedData);
      } catch (error) {
        console.error(error);
        ToastError('Gagal memuat riwayat transaksi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const filteredData = transactions.filter((item) =>
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
        <div className="w-full">
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : filteredData.length > 0 ? (
            <TransactionTableInvestasi data={filteredData} />
          ) : (
            <EmptyState type="investasi" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryInvestasi;