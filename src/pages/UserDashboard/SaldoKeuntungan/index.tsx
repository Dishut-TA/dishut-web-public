import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiEye, 
  HiEyeSlash, 
  HiOutlinePlus, 
  HiOutlineArrowRightOnRectangle, 
  HiOutlineArrowRight 
} from 'react-icons/hi2';
import TransactionItem from './components/TransactionItem';
import { getWalletAPI } from '@/services/invest.service';
import { useAuth } from '@/context/AuthContext';
import { ToastError } from '@/utils/toast';

const mockTransactions = [
  { id: 1, type: 'Transfer Bank', date: '10/09/2024 - 10.00', amount: -1000000, bank: 'Bank BCA' },
  { id: 2, type: 'Isi Saldo', date: '01/01/2024 - 19.00', amount: 8000000, bank: 'Bank BCA' },
  { id: 3, type: 'Isi Saldo', date: '01/01/2024 - 19.00', amount: 1000000, bank: 'Bank BCA' },
  { id: 4, type: 'Transfer Bank', date: '10/09/2024 - 10.00', amount: -15000000, bank: 'Bank BCA' },
];

const SaldoKeuntungan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isVisible, setIsVisible] = useState(true);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>(mockTransactions);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setIsLoading(true);
        const token = (user as any)?.token || localStorage.getItem('token') || '';
        const userId = (user as any)?.id || '';
        
        if (!userId || !token) return;

        const data = await getWalletAPI(token, userId);
        
        // Map response to match our state structure, accommodating common key names
        const balance = data.saldo || data.total_saldo || data.balance || 0;
        setTotalBalance(parseFloat(balance));
        
        const historyData = data.riwayat || data.transactions || data.history;
        if (historyData && Array.isArray(historyData) && historyData.length > 0) {
          const mappedHistory = historyData.map((tx: any, index: number) => ({
            id: tx.id || index,
            type: tx.type || tx.jenis_transaksi || 'Transaksi',
            date: tx.created_at ? new Date(tx.created_at).toLocaleString('id-ID') : '-',
            amount: parseFloat(tx.amount || tx.nominal || 0),
            bank: tx.bank || tx.metode_pembayaran || '-'
          }));
          setTransactions(mappedHistory);
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        ToastError('Gagal memuat data saldo.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [user]);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(amount).replace('Rp', 'Rp.');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center mb-10">
        <h2 className="text-primary font-bold text-lg md:text-xl mb-2">Saldo Keuntungan</h2>
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-[#9C6644] tracking-tight transition-all">
            {isVisible ? "Rp. *******" : formatRupiah(totalBalance)}
          </h1>
          <button 
            onClick={() => setIsVisible(!isVisible)} 
            className="text-[#9C6644] hover:text-primary transition-colors cursor-pointer p-1"
          >
            {isVisible ? <HiEye size={24} /> : <HiEyeSlash size={24} />}
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-12 mb-12">
        <button 
          className="group flex flex-col items-center gap-2 text-primary hover:text-tertiary transition-colors cursor-pointer" 
          onClick={() => navigate('/saldo/isi-saldo')}
        >
          <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary/5 transition-all">
            <HiOutlinePlus size={22} />
          </div>
          <span className="text-xs font-semibold">Isi Saldo</span>
        </button>
        
        <button 
          className="group flex flex-col items-center gap-2 text-primary hover:text-tertiary transition-colors cursor-pointer" 
          onClick={() => navigate('/saldo/tarik-saldo')}
        >
          <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary/5 transition-all">
            <HiOutlineArrowRightOnRectangle size={22} className="-rotate-90" />
          </div>
          <span className="text-xs font-semibold">Tarik Saldo</span>
        </button>
      </div>

      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-primary font-bold text-lg">Riwayat Transaksi</h3>
          <button
            onClick={() => navigate('/saldo/riwayat-transaksi')}
            className="text-primary hover:text-tertiary cursor-pointer rounded-full border border-primary hover:border-tertiary py-1.5 px-4 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            Lihat Semua <HiOutlineArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-0">
          {isLoading ? (
            <div className="text-center text-gray-500 py-10 font-medium">Memuat transaksi...</div>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))
          ) : (
            <div className="text-center text-gray-400 py-10">Belum ada riwayat transaksi.</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default SaldoKeuntungan;