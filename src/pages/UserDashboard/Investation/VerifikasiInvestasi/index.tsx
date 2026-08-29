import React, { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './components/PaymentModal'; // Pastikan path import sesuai
import { useAuth } from '@/context/AuthContext';
import { getRiwayatTransaksiAPI } from '@/services/invest.service';
import { ToastError } from '@/utils/toast';

interface VerifikasiData {
  id: string;
  item: string;
  date: string;
  status: 'Menunggu Pembayaran' | 'Terverifikasi';
  amount: number;
}

const VerifikasiInvestasi: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<VerifikasiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk mengontrol Modal Pembayaran
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<VerifikasiData | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = (user as any)?.token || localStorage.getItem('token') || '';
        const userId = (user as any)?.id || '';
        if (!userId) return;

        const data = await getRiwayatTransaksiAPI(token, userId);
        
        const mappedData: VerifikasiData[] = data.map((trx: any) => ({
          id: String(trx.id || trx.id_transaksi || Math.random().toString(36).substr(2, 6)),
          item: trx.nama_program_investasi || trx.program?.nama_program_investasi || trx.program?.nama_program || 'Program Investasi',
          date: new Date(trx.tanggal_bayar || trx.created_at || Date.now()).toLocaleDateString('id-ID'),
          status: trx.status_pembayaran === 'PENDING' ? 'Menunggu Pembayaran' : 'Terverifikasi',
          amount: parseFloat(trx.total_nominal_pembayaran || trx.nominal_pendanaan || 0),
        }));

        setTransactions(mappedData);
      } catch (error) {
        console.error(error);
        ToastError('Gagal memuat data verifikasi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const filteredData = transactions.filter((data) =>
    data.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('Rp', 'Rp.');
  };

  const handleOpenPayment = (data: VerifikasiData) => {
    setSelectedTransaction(data);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Verifikasi Investasi
          </h1>
          
          <div className="relative w-full md:w-80">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" size={20} />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-primary text-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm font-medium placeholder:text-primary/50"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-primary text-primary font-semibold text-xs tracking-wide">
                <th className="py-4 px-2 md:px-4 uppercase">Item</th>
                <th className="py-4 px-2 md:px-4 uppercase">Tanggal</th>
                <th className="py-4 px-2 md:px-4 uppercase text-center">Status</th>
                <th className="py-4 px-2 md:px-4 uppercase">Jumlah Investasi</th>
                <th className="py-4 px-2 md:px-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 font-medium text-sm">
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-primary/30 transition-colors duration-200 text-sm font-bold hover:bg-gray-50/50"
                  >
                    <td className="py-6 px-2 md:px-4 text-primary">
                      {data.item}
                    </td>
                    
                    <td className="py-6 px-2 md:px-4 text-primary">
                      {data.date}
                    </td>
                    
                    <td className="py-6 px-2 md:px-4 text-center">
                      <span className={data.status === 'Menunggu Pembayaran' ? 'text-[#D97706]' : 'text-primary'}>
                        {data.status}
                      </span>
                    </td>
                    
                    <td className="py-6 px-2 md:px-4 text-primary">
                      {formatRupiah(data.amount)}
                    </td>
                    
                    <td className="py-6 px-2 md:px-4 text-right md:text-center">
                      {data.status === 'Menunggu Pembayaran' ? (
                        <button 
                          onClick={() => handleOpenPayment(data)} // Ubah event onClick di sini
                          className="text-[#9C6644] hover:text-[#7f4f34] text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          Bayar Sekarang <FiChevronRight size={14} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate(`/investasi/history/${data.id}`)}
                          className="text-[#9C6644] hover:text-[#7f4f34] text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          Detail <FiChevronRight size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 font-medium text-sm">
                    Data tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Mounting Komponen Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        transactionData={selectedTransaction} 
      />

    </div>
  );
};

export default VerifikasiInvestasi;