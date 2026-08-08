import { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';
import TransactionTableDonasi from './components/TransactionTableDonasi';
import EmptyState from '../../../../components/EmptyState';
import type { TransactionDonasiData } from '@/utils/interface';
import { getTransactionsAPI } from '@/services/transaction.service';
import { useAuth } from '@/context/AuthContext'; 

const TransactionHistoryDonasi = () => {
  const { user } = useAuth(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState<TransactionDonasiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await getTransactionsAPI();
      
      let rawData = Array.isArray(response.payload) ? response.payload : [];

      if (user && user.id) {
        rawData = rawData.filter((item: any) => item.donor?.user_id === user.id);
      }

      const mappedData: TransactionDonasiData[] = rawData.map((item: any) => {
        // 1. Ambil nama program dari donasi urutan pertama (karena 1 transaksi = 1 program)
        const programName = item.donations?.[0]?.donation_program?.name || '-';

        // 2. Gabungkan semua jenis bibit yang dibeli menggunakan koma
        const seedNames = item.donations?.map((d: any) => d.seed?.nama).join(', ') || '-';

        // 3. Totalkan semua jumlah bibit dalam 1 transaksi
        const totalQuantity = item.donations?.reduce((sum: number, d: any) => sum + d.seed_quantity, 0) || 0;

        return {
          id: item.id.toString(),
          tanggal: item.transaction_date ? item.transaction_date.split(' ')[0] : '-',
          lahanProgram: programName,
          jenisBibit: seedNames,
          jumlah: totalQuantity,
          amount: Number(item.amount) || 0,
          userName: item.donor?.donor_name || 'Hamba Allah',
          paymentMethod: item.payment_method || '-',
          status: item.status || 'Pending',
        };
      });

      setTransactions(mappedData);
    } catch (error: any) {
      toast.error(error.message || "Gagal memuat data riwayat transaksi");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = transactions.filter((item) =>
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
              type="text" 
              placeholder="Cari lahan atau ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-primary bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></span>
              <p className="text-sm font-bold text-gray-500 mt-4">Memuat riwayat transaksi...</p>
            </div>
          ) : filteredData.length > 0 ? (
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