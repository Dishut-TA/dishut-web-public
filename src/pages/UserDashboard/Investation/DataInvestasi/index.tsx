import React, { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import InvestmentCard from './components/InvestmentCard';
import { useAuth } from '@/context/AuthContext';
import { getPublicProgramsAPI, getRiwayatTransaksiAPI } from '@/services/invest.service';
import { ToastError } from '@/utils/toast';

const DataInvestasi: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [investments, setInvestments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = (user as any)?.token || localStorage.getItem('token') || '';
        const userId = (user as any)?.id || '';
        if (!userId) return;
        
        // Fetch public programs and user's transactions
        const [publicPrograms, transactions] = await Promise.all([
          getPublicProgramsAPI(),
          getRiwayatTransaksiAPI(token, userId)
        ]);
        
        // Get unique program IDs from user's transactions
        const userProgramIds = new Set(
          transactions.map((trx: any) => trx.program_id || trx.id_program_investasi || trx.program?.id || trx.program?.id_program_investasi)
        );
        
        // Filter public programs
        const filteredPrograms = publicPrograms.filter((prog: any) => userProgramIds.has(prog.id) || transactions.some((t: any) => t.nama_program_investasi === prog.nama_program));
        
        // Map to display format
        const mappedInvestments = filteredPrograms.map((prog: any) => ({
          id: prog.id,
          item: prog.nama_program,
          date: `< ${prog.periode_kontrak_bulan} Bulan Tersisa`, // Mocked calculation
          status: prog.status === 'ACTIVE' ? 'Active' : prog.status,
          progress: prog.persentase_terkumpul || 0,
          image: prog.gambar || 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80',
          originalProgram: prog
        }));
        
        setInvestments(mappedInvestments);
      } catch (error: any) {
        console.error(error);
        ToastError('Gagal memuat data investasi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, [user]);

  const filteredData = investments.filter((item) =>
    item.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Data Investasi
        </h1>
        
        <div className="relative w-full md:w-80">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" size={20} />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-full border border-primary text-primary focus:outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-gray-400">Loading...</div>
        ) : filteredData.length > 0 ? (
          filteredData.map((data) => (
            <InvestmentCard key={data.id} data={data} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400">
            Data tidak ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInvestasi;