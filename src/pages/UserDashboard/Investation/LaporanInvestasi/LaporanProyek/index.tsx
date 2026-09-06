import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineFunnel, HiOutlineEye } from 'react-icons/hi2';
import { getLaporanProyekAPI } from '@/services/invest.service';
import { useAuth } from '@/context/AuthContext';
import { ToastError } from '@/utils/toast';

interface LaporanProyekData {
  id: string;
  tanggal: string;
  namaInvestasi: string;
  status: string;
}

const LaporanProyek: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<LaporanProyekData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        setLoading(true);
        const token = (user as any)?.token || localStorage.getItem('token') || '';
        const userId = (user as any)?.id || '';
        if (!userId || !token) return;

        const responseData = await getLaporanProyekAPI(token, userId);
        
        // Log untuk mengantisipasi data atribut yang salah
        console.log("Data Laporan Proyek (investor):", responseData);
        
        const mappedData = responseData.map((item: any) => ({
          id: item.id || item.id_laporan || '',
          tanggal: item.tanggal_laporan || item.created_at ? new Date(item.tanggal_laporan || item.created_at).toLocaleDateString('id-ID') : '-',
          namaInvestasi: item.program?.nama_program || item.nama_program || item.judul_laporan || 'Laporan Investasi',
          status: item.status_laporan || item.status || 'Sedang Berjalan',
        }));

        setData(mappedData);
      } catch (error: any) {
        console.error(error);
        ToastError(error.message || 'Gagal memuat laporan proyek');
      } finally {
        setLoading(false);
      }
    };
    fetchLaporan();
  }, [user]);

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('jalan') || s.includes('proses') || s.includes('pending')) return 'text-orange-500';
    if (s.includes('selesai') || s.includes('diterima') || s.includes('verify')) return 'text-emerald-600';
    return 'text-[#185325]';
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-[#185325]">
          Laporan Proyek Investasi
        </h1>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-[#185325] text-[#185325] text-sm font-semibold rounded-lg hover:bg-[#185325]/5 transition-colors">
          <HiOutlineFunnel className="w-5 h-5" /> Filter
        </button>
      </div>

      {/* Tabel dengan Style Laporan Keuangan (Sesuai Snippet) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#185325] text-[#185325] font-semibold text-xs tracking-wide">
              <th className="py-4 px-2 md:px-4 uppercase text-center w-16">No</th>
              <th className="py-4 px-2 md:px-4 uppercase">Tanggal</th>
              <th className="py-4 px-2 md:px-4 uppercase">Nama Investasi</th>
              <th className="py-4 px-2 md:px-4 uppercase">Status</th>
              <th className="py-4 px-2 md:px-4 uppercase text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[#185325] font-semibold">Memuat laporan...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[#185325] font-semibold">Belum ada laporan proyek.</td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr 
                  key={item.id} 
                  className="border-b border-[#185325]/30 transition-colors duration-200 text-sm font-bold hover:bg-gray-50/50"
                >
                  <td className="py-6 px-2 md:px-4 text-[#185325] text-center">
                    {idx + 1}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-[#185325]">
                    {item.tanggal}
                  </td>
                  <td className="py-6 px-2 md:px-4 text-[#185325]">
                    {item.namaInvestasi}
                  </td>
                  <td className={`py-6 px-2 md:px-4 ${getStatusColor(item.status)}`}>
                    {item.status}
                  </td>
                  <td className="py-6 px-2 md:px-4 flex justify-center items-center">
                    <button 
                      title="Lihat Detail"
                      onClick={() => navigate(`/laporan-investasi/proyek/${item.id}`)}
                      className="p-1.5 text-[#185325] hover:bg-[#185325]/10 rounded-full transition-colors"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default LaporanProyek;